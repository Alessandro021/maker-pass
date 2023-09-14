import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";

import { Home } from "../pages/home";
import { Senhas } from "../pages/senhas";

const Tab = createBottomTabNavigator();

export const Routes = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: "#FE5000",
				tabBarInactiveTintColor: "#000000",
				headerShown: false,
				// tabBarItemStyle: {
				// 	// margin: 5,
				// 	borderTopWidth: 2
				// },
				tabBarStyle: {
					margin: 5,
					borderTopWidth: 0,
					elevation: 0,
				}
			}}
		>
			<Tab.Screen 
				name="Home" 
				component={Home}
				options={{
					// tabBarBadge: 2, //Serve para mostrar uma bolinha com um texto encima do icon
					tabBarIcon: ({size,color, focused}) => {return <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />;}
				}}

			/>
			<Tab.Screen 
				name="Senhas" 
				component={Senhas}
				options={{
					tabBarIcon: ({size,color, focused}) => {return <Ionicons name={focused ? "lock-closed" : "lock-closed-outline"} color={color} size={size} />;}
				}}
			/>
		</Tab.Navigator>
	);
};