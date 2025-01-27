import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./Dashboard/LoginPage";
import RegisterPage from "./Dashboard/RegisterPage";
import DashboardPage from "./Dashboard/DashboardPage";

// Define the type for navigation params
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} options={{ headerTitle: "Login" }} />
        <Stack.Screen name="Register" component={RegisterPage} options={{ headerTitle: "Register" }} />
        <Stack.Screen name="Dashboard" component={DashboardPage} options={{ headerTitle: "Dashboard" }} />
      </Stack.Navigator>
      </>
  );
};

export default App;
