import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import * as Speech from "expo-speech";
import { LightSensor, Accelerometer } from "expo-sensors";
import { Button, Card, Divider } from "react-native-paper";

const SensorComponent = () => {
  const [{ illuminance }, setData] = useState({ illuminance: 0 });
  const illuminanceRef = useRef(0);
  const [sensorAvailable, setSensorAvailable] = useState<boolean | null>(null);
  const sensorAvailableRef = useRef<boolean>(false);
  const [timer, setTimer] = useState(20);
  const waitingForMovement = useRef(false);
  const accelSubscription = useRef<any>(null);

  useEffect(() => {
    illuminanceRef.current = illuminance;
  }, [illuminance]);

  useEffect(() => {
    LightSensor.isAvailableAsync().then((available) => {
      setSensorAvailable(available);
      sensorAvailableRef.current = available;
    });
  }, []);

  useEffect(() => {
    let subscription: any;
    if (sensorAvailable) {
      subscription = LightSensor.addListener((data) => {
        setData(data);
      });
    }
    return () => {
      subscription && subscription.remove();
    };
  }, [sensorAvailable]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          iniciarEsperaPorMovimento();
          return 20;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const iniciarEsperaPorMovimento = () => {
    if (waitingForMovement.current) return;

    waitingForMovement.current = true;

    Accelerometer.setUpdateInterval(500);
    accelSubscription.current = Accelerometer.addListener(({ x, y, z }) => {
      const movimento = Math.sqrt(x * x + y * y + z * z);
      if (movimento > 1.2) {
        pararAcelerometro();
        validarAmbiente();
      }
    });
  };

  const pararAcelerometro = () => {
    accelSubscription.current?.remove();
    accelSubscription.current = null;
    waitingForMovement.current = false;
  };

  const validarAmbiente = () => {
    const sensorOk = sensorAvailableRef.current;
    if (!sensorOk) {
      Speech.speak("Sensor de luz não disponível.");
      return;
    }

    if (illuminanceRef.current < 10) {
      Speech.speak("Está escuro aqui");
    } else {
      const now = new Date();
      Speech.speak(
        `Agora são ${now.getHours()} horas e ${now.getMinutes()} minutos`
      );
    }
  };

  if (sensorAvailable === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Verificando sensor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monitor de Movimento e Luz</Text>
      <Divider style={styles.divider} />
      <Text style={styles.subtitle}>Desenvolvimento Mobile</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.subtitle}>
            Luminosidade: {illuminance.toFixed(2)} lux
          </Text>
          <Text style={styles.subtitle}>
            Status: {illuminance < 10 ? "Ambiente escuro" : "Ambiente claro"}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.subtitle}>
            {waitingForMovement.current
              ? "🔄 Movimente o celular para verificar"
              : `⏰ Próxima verificação em: ${timer} segundos`}
          </Text>
        </Card.Content>
      </Card>

      <Button  mode="contained" style={styles.button} onPress={validarAmbiente} >Verificar Agora</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 10,
    backgroundColor: "#fcac03",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8f1414",
    textAlign: "center",
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
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    elevation: 4,
  },
  button: {
    backgroundColor: "#8f1414",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default SensorComponent;
