import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FireBaseComponent from "./components/FirebaseComponent";
import CounterMainComponent from "./components/CounterMainComponent";
import FetchCitiesMainComponent from "./components/FetchCitiesMainComponent";
import HomePage from "./components/HomePage";
import ConfigPage from "./components/ConfigPage";
import SensorComponent from "./components/SensorComponent";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Tela Principal">
          <Drawer.Screen name="Tela Principal">
            {() => <HomePage />}
          </Drawer.Screen>
          <Drawer.Screen name="Buscador de cidades resumido">
            {() => <FetchCitiesMainComponent showDetails={false} />}
          </Drawer.Screen>
          <Drawer.Screen name="Buscador de cidades detalhado">
            {() => <FetchCitiesMainComponent showDetails={true} />}
          </Drawer.Screen>
          <Drawer.Screen name="Firebase">
            {() => <FireBaseComponent />}
          </Drawer.Screen>
          <Drawer.Screen name="Contador">
            {() => <CounterMainComponent />}
          </Drawer.Screen>
          <Drawer.Screen name="Sensores">
            {() => <SensorComponent />}
          </Drawer.Screen>
          <Drawer.Screen name="Configurações">
            {() => <ConfigPage />}
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
