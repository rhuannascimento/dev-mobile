import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useCounter } from './CounterContextProvider';

const CounterComponent = () => {
  const { count, increment, decrement } = useCounter();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Contador Simples</Text>
          <Text style={styles.countText}>Valor atual: {count}</Text>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => increment(1)}
              style={styles.button}
              icon="plus"
            >
              1
            </Button>
            <Button
              mode="contained"
              onPress={() => decrement(1)}
              style={styles.button}
              icon="minus"
            >
              1
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
  },
  button: {
    backgroundColor: '#8f1414',
    flex: 1,
  },
});

export default CounterComponent;
