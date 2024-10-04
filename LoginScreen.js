import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext'; // Import the useAuth hook

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { login } = useAuth(); // Get the login function

    const handleLogin = async () => {
        const ipAddress = '192.168.100.24'; // Replace with your IP
        const url = `http://${ipAddress}:8080/api/v1/login`;

        setLoading(true); // Start loading when login begins
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const responseData = await response.json();

            if (response.ok) {
                const userData = responseData.user; // Get user data from response
                login(userData); // Set user in context
                navigation.navigate('Dashboard'); // Navigate to DashboardScreen on successful login
            } else {
                Alert.alert('Login Failed', responseData.message || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
        setLoading(false); // End loading after login attempt
    };

    return (
        <View style={styles.container}>
         

            <Text style={styles.title}>Login</Text>

            {/* Email Input */}
            <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
                autoCapitalize="none"
            />

            {/* Password Input */}
            <TextInput
                label="Password"
                mode="outlined"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            {/* Login Button */}
            <Button
                mode="contained"
                onPress={handleLogin}
                loading={loading} // Show loading indicator while processing login
                disabled={loading} // Disable button when loading
                style={styles.button}
                contentStyle={styles.buttonContent}
            >
                Login
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        color: '#1E90FF',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        marginBottom: 20,
    },
    button: {
        width: '100%',
        borderRadius: 25,
        marginTop: 20,
    },
    buttonContent: {
        paddingVertical: 8,
    },
});

export default LoginScreen;
