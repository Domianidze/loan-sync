import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DataContextProvider } from "@/state/DataContext";
import LoansScreen from "@/screens/Loans";
import LoaneesScreen from "@/screens/Loanees";
import ManageScreen from "@/screens/Manage";
import AddButton from "@/components/AddButton";

export type RootStackParamList = {
  home: { screen: keyof HomeTabParamList };
  manage: { id?: string };
};

export type HomeTabParamList = {
  loans: undefined;
  loanees: undefined;
  addButton: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<HomeTabParamList>();

function Home() {
  return (
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
        name="addButton"
        component={AddButton}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <AddButton onPress={() => navigation.navigate("manage")} />
          ),
        })}
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
  );
}

export default function App() {
  return (
    <>
      <StatusBar />
      <DataContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="manage"
              component={ManageScreen}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DataContextProvider>
    </>
  );
}
