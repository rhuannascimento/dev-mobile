import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { TextInput, Button, Card, Divider, List } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HistoryEntry {
  matricula: string;
  timestamp: string;
}

export default function ConfigPage() {
  const [matricula, setMatricula] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedMatricula = await AsyncStorage.getItem('matricula');
      const savedHistory = await AsyncStorage.getItem('history');
      
      if (savedMatricula) {
        setMatricula(savedMatricula);
      }
      
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const saveMatricula = async () => {
    if (!matricula.trim()) {
      Alert.alert("Erro", "Por favor, digite uma matrícula válida!");
      return;
    }

    try {
      setLoading(true);
      
      await AsyncStorage.setItem('matricula', matricula);
      
      const now = new Date();
      const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} - ${now.toLocaleDateString()}`;
      
      const newEntry: HistoryEntry = {
        matricula: matricula,
        timestamp: timestamp
      };
      
      const updatedHistory = [newEntry, ...history];
      await AsyncStorage.setItem('history', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
      setMatricula("");
      
      Alert.alert("Sucesso", "Matrícula salva com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar matrícula: " + error);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.setItem('history', JSON.stringify([]));
      setHistory([]);
      Alert.alert("Sucesso", "Histórico limpo com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Falha ao limpar histórico: " + error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <Divider style={styles.divider} />
      <Text style={styles.subtitle}>Desenvolvimento Mobile</Text>
      
      <View style={styles.main}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Matrícula do Usuário</Text>
            <TextInput
              style={styles.input}
              value={matricula}
              onChangeText={setMatricula}
              placeholder="Digite sua matrícula..."
              mode="outlined"
            />
            
            <Button
              mode="contained"
              onPress={saveMatricula}
              disabled={loading}
              style={styles.saveButton}
              icon="content-save"
            >
              Salvar Matrícula
            </Button>
          </Card.Content>
        </Card>

        {history.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.historyHeader}>
                <Text style={styles.cardTitle}>Histórico de Alterações</Text>
                <Button
                  mode="outlined"
                  onPress={clearHistory}
                  style={styles.clearButton}
                  icon="delete"
                  compact
                >
                  Limpar
                </Button>
              </View>
              
              <ScrollView style={styles.historyList}>
                {history.map((entry, index) => (
                  <List.Item
                    key={index}
                    title={`Matrícula: ${entry.matricula}`}
                    description={`Alterado em: ${entry.timestamp}`}
                    left={(props) => <List.Icon {...props} icon="account-edit" />}
                    style={styles.historyItem}
                  />
                ))}
              </ScrollView>
            </Card.Content>
          </Card>
        )}
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
  card: {
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8f1414",
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  saveButton: {
    backgroundColor: '#8f1414',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  clearButton: {
    borderColor: '#8f1414',
  },
  historyList: {
    maxHeight: 300,
  },
  historyItem: {
    backgroundColor: '#f5f5f5',
    marginVertical: 2,
    borderRadius: 8,
  },
});
