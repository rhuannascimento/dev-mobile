import "react-native-gesture-handler"; // Import necessário para o React Navigation
import React from "react";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainComponent from "./components/MainComponent";
import FireBaseComponent from "./components/FirebaseComponent";
import CounterMainComponent from "./components/CounterMainComponent";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Buscador de cidades resumido">
          <Drawer.Screen name="Buscador de cidades resumido">
            {() => <MainComponent showDetails={false} />}
          </Drawer.Screen>
          <Drawer.Screen name="Buscador de cidades detalhado">
            {() => <MainComponent showDetails={true} />}
          </Drawer.Screen>
          <Drawer.Screen name="Firebase">
            {() => <FireBaseComponent />}
          </Drawer.Screen>
          <Drawer.Screen name="Contador">
            {() => <CounterMainComponent />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
  image: {
    width: 220,
    height: 120,
  },
});
