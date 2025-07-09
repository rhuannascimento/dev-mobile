import { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import {
  TextInput,
  Button,
  Card,
  ActivityIndicator,
  Divider,
} from "react-native-paper";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { FIREBASE_APP } from "../firebaseConfig";

export default function FireBaseComponent() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const db = getFirestore(FIREBASE_APP);

  const addItem = async () => {
    if (!inputText.trim()) {
      Alert.alert("Erro", "Por favor, digite algo antes de adicionar!");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "item"), {
        nome: inputText,
      });
      Alert.alert("Sucesso", "Item adicionado com sucesso!");
      setInputText("");
    } catch (error) {
      Alert.alert("Erro", "Falha ao adicionar item: " + error);
    } finally {
      setLoading(false);
    }
  };

  const listItems = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "item"));
      const itemsList: string[] = [];
      querySnapshot.forEach((doc) => {
        itemsList.push(doc.data().nome);
      });
      setItems(itemsList);
    } catch (error) {
      Alert.alert("Erro", "Falha ao listar itens: " + error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Database</Text>
      <Divider style={styles.divider} />
      <Text style={styles.subtitle}>Desenvolvimento Mobile</Text>
      <View style={styles.main}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite o texto que deseja salvar..."
          mode="outlined"
        />

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={addItem}
            disabled={loading}
            style={styles.addButton}
            icon="plus"
          >
            Adicionar
          </Button>

          <Button
            mode="contained"
            onPress={listItems}
            disabled={loading}
            style={styles.listButton}
            icon="format-list-bulleted"
          >
            Listar Todos
          </Button>
        </View>
      </View>{" "}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} size="large" />
          <Text style={styles.loadingText}>Processando...</Text>
        </View>
      )}
      {items.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Itens Salvos ({items.length})</Text>
          <ScrollView style={styles.itemsList}>
            {items.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <Text style={styles.itemText}>
                  {index + 1}. {item}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
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
  main: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  input: {
    marginVertical: 10,
    width: "80%",
    backgroundColor: "#fcac03",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    width: "80%",
    marginTop: 10,
  },
  addButton: {
    flex: 1,
    backgroundColor: "#8f1414",
  },
  listButton: {
    flex: 1,
    backgroundColor: "#8f1414",
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#8f1414",
    fontWeight: "bold",
  },
  resultsContainer: {
    width: "80%",
    marginTop: 20,
  },
  resultsTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#8f1414",
    textAlign: "center",
    marginBottom: 10,
  },
  itemsList: {
    maxHeight: 200,
  },
  itemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  itemText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
});
