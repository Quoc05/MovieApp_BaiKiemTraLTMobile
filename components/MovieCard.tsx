import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
}

export interface MovieCardProps {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, layout = 'row', onSelect }) => {
  const isTile = layout === 'tile';

  return (
    <TouchableOpacity
      style={[styles.card, isTile && styles.cardTile]}
      onPress={() => onSelect(movie.id)}
    >
      <View style={isTile ? styles.posterBoxTile : undefined}>
        <Image
          source={{ uri: movie.poster }}
          style={[styles.poster, isTile && styles.posterTile]}
          resizeMode="cover"
        />
        {isTile && (
          <View style={styles.badgeAbsolute}>
            <Text style={styles.badgeText}>⭐ {Number(movie.rating / 10).toFixed(1)}</Text>
          </View>
        )}
      </View>

      {/* Thông tin phim */}
      <View style={[styles.info, isTile && styles.infoTile]}>
        <Text style={styles.title} numberOfLines={isTile ? 1 : 2}>
          {movie.title}
        </Text>
        
        {!isTile && (
          <Text style={styles.textGray}>{movie.genre} • {movie.year}</Text>
        )}
        
        {!isTile && (
          <Text style={styles.ratingText}>⭐ {Number(movie.rating / 10).toFixed(1)}</Text>
        )}

        <Text style={styles.statusText}>Trạng thái: {movie.isShowing ? '✔' : '✖'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(MovieCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 6,
    padding: 8,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  cardTile: {
    flexDirection: 'column',
    flex: 1,
    padding: 0,
    margin: 4,
    overflow: 'hidden',
  },
  poster: {
    width: 70,
    height: 100,
    backgroundColor: '#eeeeee',
    borderRadius: 4,
  },
  posterBoxTile: {
    width: '100%',
    position: 'relative',
  },
  posterTile: {
    width: '100%',
    aspectRatio: 2 / 3,
  },
  badgeAbsolute: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  info: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  infoTile: {
    marginLeft: 0,
    padding: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  textGray: {
    color: '#555555',
    marginVertical: 2,
  },
  ratingText: {
    color: 'orange',
    fontWeight: 'bold',
    marginVertical: 2,
  },
  statusText: {
    marginTop: 2,
    fontSize: 12,
    color: '#333333',
  },
});