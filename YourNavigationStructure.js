import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from './AuthContext'; // Import your AuthContext
import LoginScreen from './LoginScreen';
import DashboardScreen from './DashboardScreen';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
const Stack = createStackNavigator();

const YourNavigationStructure = () => {
    const { user } = useAuth(); // Get user from context

    return (
        <Stack.Navigator initialRouteName={user ? "Dashboard" : "Home"}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} /> 
            <Stack.Screen name="Register" component={RegisterScreen} /> 
        </Stack.Navigator>
    );
};

export default YourNavigationStructure;
