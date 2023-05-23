import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, ImageBackground } from 'react-native';

const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNum = Math.floor(Math.random() * (max - min)) + min;
  if (randomNum === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return randomNum;
  }
};

const GameOverview = ({ userNumber, onGameOver, onRestartGame }) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomNumber(1, 100, userNumber)
  );
  const [rounds, setRounds] = useState(0);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userNumber) {
      setIsCorrectGuess(true);
      onGameOver(rounds);
    }
  }, [currentGuess, userNumber, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds((prevRounds) => prevRounds + 1);
  };

  // const correctGuessHandler = () => {
    
  //   Alert.alert(
  //     'Correcttttt!',
  //     `The guessed number is: ${currentGuess}`,
  //     [
  //       { text: 'OK', onPress: () => onRestartGame() }
  //     ]
  //   );
  // };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Opponent's Guess</Text>
          <View style={styles.inputContainer}>
          <Text style={styles.number}>{currentGuess}</Text>
          {!isCorrectGuess && (
            <View style={styles.buttonContainer}>
              <Button
                title="LOWER"
                onPress={nextGuessHandler.bind(this, 'lower')}
              />
              <Button
                title="GREATER"
                onPress={nextGuessHandler.bind(this, 'greater')}
              />
            </View>
          )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width:'100vw'
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 10,
  },
  number: {
    fontSize: 22,
    color: '#ffffff',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
});

export default GameOverview;
