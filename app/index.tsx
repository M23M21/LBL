import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../styles/globalStyles';

export default function Index() {
  const router = useRouter();

  const handleSignupPress = () => {
    try {
      router.push('/SignupScreen');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleLoginPress = () => {
    try {
      router.push('/LoginScreen');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Loading Bay Locator</Text>
      <Image 
        source={require('../assets/images/loading-bay.jpg')} 
        style={styles.image}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignupPress}>
        <Text style={styles.buttonText}>SIGNUP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLoginPress}>
        <Text style={styles.linkText}>ALREADY HAVE AN ACCOUNT?</Text>
      </TouchableOpacity>
    </View>
  );
}