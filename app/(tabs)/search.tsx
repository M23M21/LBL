import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { firestore } from '../../services/firebase';
import { collection, query, where, getDocs, writeBatch, doc } from 'firebase/firestore';

type LoadingBayInfo = {
  id: string;
  name: string;
  location: string;
  openingTime: string;
  restrictions: string;
  town: string;
  what3words: string;
};

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [town, setTown] = useState('');
  const router = useRouter();

  const handleSearch = async () => {
    try {
      const results: LoadingBayInfo[] = [];
      const q = query(
        collection(firestore, 'loadingBays'),
        where('name', '==', searchTerm),
        where('town', '==', town)
      );

      console.log('Executing query with:', { searchTerm, town });

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log('Document data:', doc.data());
        results.push({ id: doc.id, ...doc.data() } as LoadingBayInfo);
      });

      console.log('Results:', results);

      router.push({
        pathname: '/ResultScreen',
        params: { results: JSON.stringify(results) },
      });
    } catch (error) {
      console.error('Error searching Firestore:', error);
    }
  };

  const handleBulkUpload = async () => {
    const data: LoadingBayInfo[] = require('../../data.json');
    const batch = writeBatch(firestore);

    data.forEach((item: LoadingBayInfo) => {
      const docRef = doc(collection(firestore, 'loadingBays'));
      batch.set(docRef, item);
    });

    try {
      await batch.commit();
      console.log('Data uploaded successfully!');
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter what you're looking for..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter town name..."
        value={town}
        onChangeText={setTown}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleBulkUpload}>
        <Text style={styles.buttonText}>Upload Data in Bulk</Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});