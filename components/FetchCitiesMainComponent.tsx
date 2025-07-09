import { Image, StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Divider } from "react-native-paper";
import FetchCitiesComponent from "./FetchCitiesComponent";
export default function FetchCitiesMainComponent({ showDetails }: { showDetails: boolean }) {

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Buscador de cidades</Text>
        <Divider style={styles.divider} />
        <Text style={styles.subtitle}>Desenvolvimento Mobile</Text>
        <View style={styles.main}>
          <FetchCitiesComponent showDetails={showDetails} />
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
    justifyContent: 'center'
  }
});
