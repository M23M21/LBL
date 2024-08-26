import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, Linking, Image } from 'react-native';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type LoadingBayInfo = {
  id: string;
  name: string;
  location: string;
  openingTime: string;
  restrictions: string;
  what3words: string;
  directions: string;
};

const ResultScreen = () => {
  const { results } = useLocalSearchParams();
  const parsedResults: LoadingBayInfo[] = typeof results === 'string' ? JSON.parse(results) : [];
  const router = useRouter();

  const handleNavigation = (what3words: string) => {
    const url = `https://what3words.com/${what3words}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RESULT</Text>
      </View>
      <Image
        source={require('../assets/images/loading-bay.jpg')}
        style={styles.image}
      />
      <ScrollView style={styles.scrollView}>
        {parsedResults.map((item) => (
          <View key={item.id} style={styles.infoSection}>
            <Text style={styles.infoLabel}>Loading Bay is:</Text>
            <TouchableOpacity onPress={() => handleNavigation(item.what3words)}>
              <Text style={styles.infoText}>{item.what3words}</Text>
            </TouchableOpacity>
            
            <Text style={styles.infoLabel}>Opening Time:</Text>
            <Text style={styles.infoText}>{item.openingTime}</Text>
            
            <Text style={styles.infoLabel}>Restrictions:</Text>
            <Text style={styles.infoText}>{item.restrictions}</Text>
            
            <Text style={styles.infoLabel}>Location:</Text>
            <Text style={styles.infoText}>{item.location}</Text>
            
            <Text style={styles.infoLabel}>Directions:</Text>
            <Text style={styles.infoText}>{item.directions}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerItem} 
          onPress={() => handleNavigation(parsedResults[0]?.what3words)}
        >
          <Ionicons name="car" size={24} color="#3498db" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.footerItem} 
          onPress={() => handleNavigation(parsedResults[0]?.what3words)}
        >
          <Ionicons name="walk" size={24} color="#3498db" />
        </TouchableOpacity>
        <Link href="/(tabs)/home" asChild>
          <TouchableOpacity style={styles.footerItem}>
            <Ionicons name="search" size={24} color="#3498db" />
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.logoutText}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 15,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  scrollView: {
    flex: 1,
  },
  infoSection: {
    padding: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  footerItem: {
    alignItems: 'center',
  },
  logoutText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
});

export default ResultScreen;