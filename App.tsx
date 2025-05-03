import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Divider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Ufjf</Text>
        <Divider style={styles.divider} />
        <Text style={styles.subtitle}>Desenvolvimento Mobile</Text>
        <View style={styles.main}>
          <Text style={styles.text}>Ola mundo!</Text>
        </View>
      </View>
    </PaperProvider>
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
    fontSize: 60,
    fontWeight: "bold",
    color: "#8f1414",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#8f1414",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
  },
  divider: {
    width: "80%",
    backgroundColor: "#000000",
    height: 3,
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
