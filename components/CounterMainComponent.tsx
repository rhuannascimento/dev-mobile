import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import { CounterProvider } from './CounterContextProvider';
import CounterComponent from './CounterComponent';
import AdvancedCounterComponent from './AdvancedCounterComponent';

const CounterMainComponent = () => {
  return (
    <CounterProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Contadores Compartilhados</Text>
        <Divider style={styles.divider} />
        <Text style={styles.subtitle}>Desenvolvimento Mobile</Text>
        
        <View style={styles.main}>
          <CounterComponent />
          <AdvancedCounterComponent />
        </View>
      </View>
    </CounterProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingVertical: 100,
    paddingHorizontal: 10,
    gap: 10,
    backgroundColor: "#fcac03",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8f1414",
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#8f1414",
  },
  divider: {
    width: "80%",
    backgroundColor: "#000000",
    height: 3,
  },
  main: {
    flex: 1,
    width: '100%',
    gap: 20,
  },
});

export default CounterMainComponent;
