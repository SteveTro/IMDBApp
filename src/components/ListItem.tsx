import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Movie} from '../types';

interface ListItemProps {
  movie: Movie;
  onPress: () => void;
}
const ListItem: FC<ListItemProps> = ({
  movie: {title, description, image},
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
    backgroundColor: '#ededed',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    height: 100,
    width: 150,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 20,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
  },
  description: {
    color: '#666',
    fontSize: 14,
  },
});
