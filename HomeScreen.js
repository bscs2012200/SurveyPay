import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper'; // Add react-native-paper for better UI components
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('./assets/WebApplication.png')} // Replace with your image path
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>SurveyPay</Text>
      <Text style={styles.subtitle}>Create, Distribute, Earn Money</Text>

      {/* Register Button */}
      <Button 
        mode="contained" 
        style={styles.button} 
        contentStyle={styles.buttonContent} 
        onPress={() => navigation.navigate('Register')}
      >
        Register
      </Button>

      {/* Login Button */}
      <Button 
        mode="outlined" 
        style={styles.buttonOutline} 
        contentStyle={styles.buttonContent} 
        onPress={() => navigation.navigate('Login')}
      >
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: '80%',
    height: '40%',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    color: '#1E90FF',
    marginTop: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginVertical: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    width: '80%',
    borderRadius: 30,
  },
  buttonOutline: {
    marginTop: 10,
    width: '80%',
    borderRadius: 30,
    borderColor: '#1E90FF',
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default HomeScreen;
