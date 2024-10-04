import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './AuthContext'; // Import your AuthContext
import YourNavigationStructure from './YourNavigationStructure';


const App = () => {
    return (
        <AuthProvider>
            <NavigationContainer>
                <YourNavigationStructure />
            </NavigationContainer>
        </AuthProvider>
    );
};

export default App;
