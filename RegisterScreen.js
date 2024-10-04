import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';  // Correct import

// Validation schema
const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  dateOfBirth: yup.date().required('Date of Birth is required'),
  gender: yup.string().required('Gender is required'),  // Gender is required
});

const RegisterScreen = () => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { gender: "Male" },  // Initialize gender field with default value
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRegister = async (data) => {
    const { firstName, lastName, email, password, phoneNumber, dateOfBirth, gender } = data;
    const ipAddress = '192.168.100.24';  // Replace with your IP
    const url = `http://${ipAddress}:8080/api/v1/users`;
    
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, phoneNumber, dateOfBirth, gender }),
      });
      
      const responseData = await response.json();
      setIsLoading(false);

      if (response.ok) {
        Alert.alert('Registration Successful', `Welcome, ${responseData.firstName}!`);
      } else {
        Alert.alert('Registration Failed', responseData.message || 'An error occurred');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Register</Text>

          {/* First Name */}
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="First Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message}</Text>}

          {/* Last Name */}
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.lastName && <Text style={styles.errorText}>{errors.lastName.message}</Text>}

          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

          {/* Confirm Password */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

          {/* Phone Number */}
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>}

          {/* Date of Birth */}
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Date of Birth (YYYY-MM-DD)"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth.message}</Text>}

          {/* Gender Picker */}
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                style={{ height: 50, width: 150 }}
                onValueChange={onChange}  // Correct usage of onValueChange
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            )}
          />
          {errors.gender && <Text style={styles.errorText}>{errors.gender.message}</Text>}

          {/* Register Button */}
          {isLoading ? (
            <ActivityIndicator size="large" color="#1E90FF" />
          ) : (
            <Button title="Register" onPress={handleSubmit(handleRegister)} color="#1E90FF" />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: '#333',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    width: '90%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  errorText: {
    color: '#FF3D00',
    marginBottom: 10,
  },
});

export default RegisterScreen;
