import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { firestore } from '../../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

type LoadingBayInfo = {
  id: string;
  directions: string;
  location: string;
  name: string;
  openingTime: string;
  restrictions: string;
  town: string;
  what3words: string;
};

export default function HomeScreen() {
  const [shopName, setShopName] = useState('');
  const [town, setTown] = useState('');
  const router = useRouter();

  const handleSearch = async () => {
    try {
      const results: LoadingBayInfo[] = [];
      const q = query(
        collection(firestore, 'loadingBays'),
        where('name', '==', shopName),
        where('town', '==', town)
      );

      console.log('Executing query with:', { shopName, town });

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log('Document data:', doc.data());
        results.push({ id: doc.id, ...doc.data() } as LoadingBayInfo);
      });

      console.log('Results:', results);

      if (results.length > 0) {
        router.push({
          pathname: '/ResultScreen',
          params: { results: JSON.stringify(results) },
        });
      } else {
        Alert.alert('No Results', 'No matching loading bays found.');
      }
    } catch (error) {
      console.error('Error searching Firestore:', error);
      Alert.alert('Error', 'An error occurred while searching. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Loading Bay Locator</Text>
      <Image
        source={require('../../assets/images/loading-bay.jpg')}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter shop/warehouse name..."
        value={shopName}
        onChangeText={setShopName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter town name..."
        value={town}
        onChangeText={setTown}
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={handleSearch}
      >
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#3498db',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
