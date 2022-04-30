import {FAB} from '@rneui/base';
import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {AppContext} from '../AppProvider';
import EmptyComponent from '../components/EmptyComponent';
import ListItem from '../components/ListItem';
import {HomeScreenNavigationProp, Movie} from '../types';

const HomeScreen = ({navigation}: HomeScreenNavigationProp) => {
  const {
    data: {favorites},
  } = useContext(AppContext);
  const renderItem = (item: Movie) => {
    return (
      <ListItem
        movie={item}
        onPress={() => navigation.push('Details', {movie: item})}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        contentContainerStyle={[
          favorites.length > 0 ? styles.list : styles.emptyList,
        ]}
        renderItem={({item}) => renderItem(item)}
        data={favorites}
        ListEmptyComponent={
          <EmptyComponent
            title="You dont have any favorites yes"
            icon="frown-o"
          />
        }
      />

      <FAB
        title={'Search Movies'}
        style={styles.fab}
        visible={true}
        placement={'right'}
        icon={{type: 'ionicon', name: 'search', color: 'white'}}
        color="green"
        onPress={() => navigation.push('Search')}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  list: {},
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    bottom: 50,
    right: 16,
  },
});
