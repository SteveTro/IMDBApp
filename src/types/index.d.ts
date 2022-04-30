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
