import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native';
import StartGame from './components/startgame';
import GameOverview from './components/gameoverveiw';

const MainComponent = () => {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
    setGameOver(false);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
    setGameOver(true);
  };

  const restartGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
    setGameOver(false);
  };

  let content = <StartGame onStartGame={startGameHandler} />;

  if (userNumber && !gameOver) {
    content = (
      <GameOverview userNumber={userNumber} onGameOver={gameOverHandler} onRestartGame={restartGameHandler} />
    );
  } else if (gameOver) {
    content = (
      <View style={styles.container}>
        <ImageBackground
        source={require('./assets/bg.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.result}>
        <Text style={styles.title}>Correct number!</Text>
        <View style={styles.inputContainer}>
        <Text>The guessed number was: {userNumber}</Text>
        </View>
        </View>
        </ImageBackground>
      </View>
    );
    setTimeout(restartGameHandler, 5000);
  }

  return <View style={styles.screen}>{content}</View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width:'100vw'
  },
  title: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  result:{
    marginTop:200,
    justifyContent:'center',
    alignItems:'center'
  },
  container: {
    flex:1,
  },
});

export default MainComponent;
