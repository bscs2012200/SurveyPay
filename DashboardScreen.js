import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from './AuthContext'; // Import the useAuth hook

const DashboardScreen = () => {
    const { user, logout } = useAuth(); // Get user and logout function


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            {user ? (
                <>
                    <Text style={styles.content}>Welcome, {user.firstName}!</Text>
                    <Button title="Logout" onPress={logout} />
                </>
            ) : (
                <Text style={styles.content}>No user logged in.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    content: {
        fontSize: 16,
        color: '#fff',
    },
});

export default DashboardScreen;
