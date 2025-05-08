import { Image, StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Divider } from "react-native-paper";
import HelloWorldComponent from "./components/HelloWorldComponent";
export default function App() {

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: "https://upload.wikimedia.org/wikipedia/commons/7/71/Logo_da_UFJF.png"}} />
        <Divider style={styles.divider} />
        <Text style={styles.subtitle}>Desenvolvimento Mobile</Text>
        <View style={styles.main}>
          <HelloWorldComponent date={(new Date()).toLocaleDateString()} />
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
  image: {
    width: 220,
    height: 120,
  },
  main: {
    flex: 1,
    justifyContent: 'center'
  }
});
