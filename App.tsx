import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoansScreen from "@/screens/Loans";
import LoaneesScreen from "@/screens/Loanees";

export type RootTabParamList = {
  loans: undefined;
  loanees: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="loans"
            component={LoansScreen}
            options={{
              title: "Loans",
              tabBarIcon: ({ size, color }) => (
                <MaterialIcons name="attach-money" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="loanees"
            component={LoaneesScreen}
            options={{
              title: "Loanees",
              tabBarIcon: ({ size, color }) => (
                <MaterialIcons name="people" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
