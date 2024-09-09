import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
      const ipAddress = '192.168.18.55'; // Replace with your IP
      const url = `http://${ipAddress}:8080/api/v1/users`;
  
      try {
          const response = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  name: name,
                  email: email,
                  password: password,
              }),
          });
  
          const responseData = await response.json();
          console.log(response.status, responseData);
  
          if (response.ok) {
              Alert.alert('Registration Successful', `Welcome, ${responseData.name}!`);
          } else {
              Alert.alert('Registration Failed', responseData.message || 'An error occurred');
          }
      } catch (error) {
          console.error('Error:', error);
          Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    };
  
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Updated background color
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20, // Added padding to match original styles
    },
    title: {
        fontSize: 24,
        color: '#fff', // Updated text color
        marginBottom: 20, // Added margin to match original styles
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        width: '80%', // Added width to match button width
        backgroundColor: '#fff', // Added background color for input fields
    },
    button: {
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 10,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
