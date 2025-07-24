import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated, Text } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Divider } from 'react-native-paper';

const BOX_SIZE = 300;
const BALL_SIZE = 50;

const MoveBallComponent = () => {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [subscription, setSubscription] = useState<any>(null);

  const maxX = BOX_SIZE / 2 - BALL_SIZE / 2;
  const maxY = BOX_SIZE / 2 - BALL_SIZE / 2;

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(({ x, y }) => {
        move(x, -y);
      })
    );
    Accelerometer.setUpdateInterval(50);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const move = (dx: number, dy: number) => {
    position.stopAnimation((currentPos) => {
      let newX = currentPos.x + dx * 120;
      let newY = currentPos.y + dy * 120;

      newX = Math.max(-maxX, Math.min(newX, maxX));
      newY = Math.max(-maxY, Math.min(newY, maxY));

      Animated.spring(position, {
        toValue: { x: newX, y: newY },
        useNativeDriver: true,
        friction: 5,
        tension: 40,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
     <Text style={styles.title}>Contadores Compartilhados</Text>
    <Divider style={styles.divider} />
        <Text style={styles.subtitle}>Desenvolvimento Mobile</Text>
      
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Animated.View
            style={[
              styles.ball,
              { transform: position.getTranslateTransform() },
            ]}
          />
        </View>
      </View>
      
      <Text style={styles.infoText}>
        Use o acelerômetro para controlar a bolinha na tela
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fcac03",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8f1414",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  boxContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#8f1414',
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    backgroundColor: '#8f1414',
    borderRadius: BALL_SIZE / 2,
    position: 'absolute',
    elevation: 8,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
    width: '90%',
    color: '#555',
    marginTop: 20,
  },
   divider: {
    width: "80%",
    backgroundColor: "#000000",
    height: 3,
  },
});

export default MoveBallComponent;