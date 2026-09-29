import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import localData from './data/MOCK_DATA.json';
import MovieCard from './components/MovieCard';
export default function App() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isTile, setIsTile] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMovies(localData);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);
  const handleSelect = (id: string) => {
    const found = movies.find((item) => String(item.id) === String(id));
    if (found) {
      if (Platform.OS === 'web') {
        alert(`Tên phim: ${found.title}`);
      } else {
        Alert.alert('Tên phim', found.title);
      }
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Movie App</Text>
        </View>
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={{ marginTop: 8 }}>Đang tải dữ liệu...</Text>
          </View>
        ) : (
          <FlatList
            data={movies}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                layout="row" 
                onSelect={handleSelect}
              />
            )}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});