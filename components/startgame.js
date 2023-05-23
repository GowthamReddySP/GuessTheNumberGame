import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';

const StartGame = ({ onStartGame }) => {
  const [enteredNumber, setEnteredNumber] = useState('');

  const numberInputHandler = (inputText) => {
    setEnteredNumber(inputText.replace(/[^0-9]/g, ''));
  };

  const startGameHandler = () => {
    onStartGame(parseInt(enteredNumber));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Guess the Number</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Select a Number</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={numberInputHandler}
              value={enteredNumber}
              placeholder="Enter a number"
              placeholderTextColor="#ffffff"
            />
            <View style={styles.buttonContainer}>
              <Button title="Start Game" onPress={startGameHandler} />
            </View>
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
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#ffffff',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default StartGame;
