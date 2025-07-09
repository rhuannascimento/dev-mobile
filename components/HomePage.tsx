import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Divider, Card } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function HomePage() {
  const [matricula, setMatricula] = useState<string | null>(null);

  const loadMatricula = async () => {
    try {
      const savedMatricula = await AsyncStorage.getItem('matricula');
      setMatricula(savedMatricula);
    } catch (error) {
      console.error('Erro ao carregar matrícula:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadMatricula();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: "https://upload.wikimedia.org/wikipedia/commons/7/71/Logo_da_UFJF.png"}} />
      <Divider style={styles.divider} />
      <Text style={styles.subtitle}>Desenvolvimento Mobile</Text>
      
      <View style={styles.main}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.welcomeTitle}>Bem-vindo ao App!</Text>
            <View style={styles.matriculaContainer}>
              <Text style={styles.matriculaLabel}>Matrícula:</Text>
              <Text style={styles.matriculaValue}>
                {matricula || "--"}
              </Text>
            </View>
            
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🎓</Text>
              <Text style={styles.iconText}>Sistema Acadêmico UFJF</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingVertical: 100,
        paddingHorizontal: 10,
        gap: 10,
        backgroundColor: "#fcac03",
        alignItems: "center",
    },
    main: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        backgroundColor: '#ffffff',
        elevation: 4,
    },
    welcomeTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#8f1414",
        textAlign: 'center',
        marginBottom: 20,
    },
    matriculaContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        gap: 10,
    },
    matriculaLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000",
    },
    matriculaValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#8f1414",
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
        minWidth: 80,
        textAlign: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        gap: 10,
    },
    icon: {
        fontSize: 48,
        textAlign: 'center',
    },
    iconText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#8f1414",
        textAlign: 'center',
    },
    image: {
        width: 220,
        height: 120,
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
});
