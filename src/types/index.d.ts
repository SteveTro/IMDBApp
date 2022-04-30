import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Search: undefined;
  Details: {movie: Movie};
};

export type SplashScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Splash'
>;

export type HomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export type SearchScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Search'
>;

export type DetailsScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;

export interface Movie {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface Rating {
  errorMessage: string;
  filmAffinity: string;
  fullTitle: string;
  imDb: string;
  imDbId: string;
  metacritic: string;
  rottenTomatoes: string;
  theMovieDb: string;
  title: string;
  type: string;
  year: string;
}

export interface IContextData {
  favorites: Movie[];
  hidden: Movie[];
}

export type IKeys = keyof IContextData;

export type ContextType = {
  data: IContextData;
  loadItems: (data: IContextData) => void;
  addItem: (movie: Movie, prop: IKeys) => void;
  removeItem: (movie: Movie, prop: IKeys) => void;
};
