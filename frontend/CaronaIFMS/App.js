import {NavigationContainer} from "@react-navigation/native"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { MaterialIcons } from '@expo/vector-icons';

import CriarCaronas from "./src/screens/CriarCaronas"
import ListaCaronas from "./src/screens/ListaCaronas"
import MinhasCaronas from "./src/screens/MinhasCaronas"
import Perfil from "./src/screens/Perfil"

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Criar" component={CriarCaronas} 
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="add-circle" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen name="Caronas" component={ListaCaronas} 
          options={{
              tabBarIcon: ({ size, color }) => (
                <MaterialIcons name="directions-car" size={size} color={color} />
              ),
              headerShown: false,
            }}
        />
        <Tab.Screen name="Minhas" component={MinhasCaronas} 
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="list" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen name="Perfil" component={Perfil} 
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="person" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
