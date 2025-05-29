import "react-native-gesture-handler"; // Import necessário para o React Navigation
import React from "react";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainComponent from "./components/MainComponent";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Resumido">
          <Drawer.Screen name="Resumido">
            {() => <MainComponent showDetails={false} />}
          </Drawer.Screen>
          <Drawer.Screen name="Detalhado">
            {() => <MainComponent showDetails={true} />}
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
