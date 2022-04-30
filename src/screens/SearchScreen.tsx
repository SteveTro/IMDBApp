import {Input} from '@rneui/base';
import axios from 'axios';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {Movie, SearchScreenNavigationProp} from '../types';
import Config from 'react-native-config';
import EmptyComponent from '../components/EmptyComponent';
import ListItem from '../components/ListItem';
import {debounce, difference, differenceBy} from 'lodash';
import {AppContext} from '../AppProvider';

const SearchScreen = ({navigation}: SearchScreenNavigationProp) => {
  const {data} = useContext(AppContext);

  const [hidden, setHidden] = useState(data.hidden);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState<string | undefined>(undefined);

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setHidden(data.hidden);
    setQuery(undefined);
    console.log(movies);
    setMovies(filterMovies(movies, data.hidden));
    console.log('Update movies');
    console.log(movies);
  }, [data]);

  const filterMovies = (m: Movie[], h: Movie[]) => {
    return differenceBy(m, h, 'id');
  };

  const onSearch = async (q: string) => {
    try {
      setQuery(q);
      let res = await axios.get(
        `https://imdb-api.com/DE/API/SearchTitle/${Config.API_KEY}/${q}`,
      );

      const {results}: {results: Movie[]} = res.data;

      console.log(hidden);
      console.log(results);

      let filtered = filterMovies(results, hidden);

      setMovies(filtered ?? []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(onSearch, 500), []);

  const handleChange = (q: string) => {
    setQuery(q);
    setLoading(true);
    debouncedSearch(q);
  };

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
      <Input
        containerStyle={{margin: 0, padding: 0}}
        errorStyle={{height: 0}}
        value={query}
        onChangeText={handleChange}
        placeholder="Search ..."
        clearButtonMode="always"
      />

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={[
            movies.length > 0 ? styles.list : styles.emptyList,
          ]}
          data={movies}
          renderItem={({item}) => renderItem(item)}
          ListEmptyComponent={
            query !== undefined && !isLoading ? (
              <EmptyComponent title="No movies found" icon="frown-o" />
            ) : null
          }
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  list: {},
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {paddingTop: 20},
});
