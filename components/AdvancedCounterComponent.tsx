import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useCounter } from './CounterContextProvider';

const AdvancedCounterComponent = () => {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Contador Avançado</Text>
          <Text style={styles.countText}>Total: {count}</Text>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => increment(10)}
              style={styles.button}
              icon="plus"
            >
              10
            </Button>
            <Button
              mode="contained"
              onPress={() => increment(25)}
              style={styles.button}
              icon="plus"
            >
              25
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => decrement(10)}
              style={styles.button}
              icon="minus"
            >
              10
            </Button>
            <Button
              mode="outlined"
              onPress={reset}
              style={styles.resetButton}
              icon="refresh"
            >
              Reset
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8f1414',
    textAlign: 'center',
    marginBottom: 15,
  },
  countText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#8f1414',
    flex: 1,
  },
  resetButton: {
    borderColor: '#8f1414',
    flex: 1,
  },
});

export default AdvancedCounterComponent;
