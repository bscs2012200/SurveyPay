import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import DashboardScreen from './DashboardScreen';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
// Import other screens here if needed

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                {/* Add other screens here if needed */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
