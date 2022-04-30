import {Button} from '@rneui/base';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import Config from 'react-native-config';
import {AppContext} from '../AppProvider';
import {DetailsScreenNavigationProp, IKeys, Rating} from '../types';

const DetailScreen = ({navigation, route}: DetailsScreenNavigationProp) => {
  const {data, addItem, removeItem} = useContext(AppContext);
  const [isLoading, setLoading] = useState(false);
  const [rating, setRating] = useState<Partial<Rating>>({imDb: '10'});
  const {movie} = route.params;

  // const movie: Movie = {
  //   id: 'tt0111161',
  //   title: 'The Shawshank Redemption',
  //   description: 'Two imprisoned',
  //   image:
  //     'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg',
  // };
  navigation.setOptions({title: movie.title});

  useEffect(() => {
    loadRatings();
  }, []);

  const loadRatings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://imdb-api.com/en/API/Ratings/${Config.API_KEY}/${movie.id}`,
      );
      setRating(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const renderProps = (prop: IKeys) => {
    const isAdded = !!data[prop].find(f => f.id === movie.id);
    if (isAdded) {
      return {
        icon: {
          name: prop === 'favorites' ? 'heart' : 'eye',
          type: 'font-awesome',
          size: 15,
          color: 'white',
        },
        onPress: () => removeItem(movie, prop),
        title: `REMOVE FROM ${prop}`.toUpperCase(),
      };
    } else {
      return {
        icon: {
          name: prop === 'hidden' ? 'eye-slash' : 'heart-o',
          type: 'font-awesome',
          size: 15,
          color: 'white',
        },
        onPress: () => addItem(movie, prop),
        title: `ADD TO ${prop}`.toUpperCase(),
      };
    }
  };

  return isLoading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{uri: movie.image}} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.desc}>{movie.description}</Text>
        <Text style={[styles.desc, styles.rating]}>
          IMDB Rating: {rating?.imDb ?? 'No rating found'}
        </Text>

        <Button
          {...renderProps('favorites')}
          iconContainerStyle={styles.icon}
          titleStyle={styles.buttonTitleStyle}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainerStyle}
        />

        <Button
          {...renderProps('hidden')}
          iconContainerStyle={styles.icon}
          titleStyle={styles.buttonTitleStyle}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainerStyle}
        />
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  imageWrapper: {
    flex: 1,
    alignItems: 'stretch',
  },
  image: {
    flex: 1,
  },
  content: {
    flexBasis: '30%',
  },
  title: {
    fontSize: 20,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginVertical: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  desc: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
  rating: {
    fontWeight: '700',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },

  buttonStyle: {
    backgroundColor: 'rgba(90, 154, 230, 1)',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 30,
  },
  buttonContainerStyle: {
    marginHorizontal: 50,
    marginVertical: 5,
  },
  buttonTitleStyle: {
    fontWeight: '800',
  },
});
