import { createStackNavigator } from 'react-navigation'
import HomeScreen from './src/screens/HomeScreen';
import MovieDetail from './src/screens/MovieDetailScreen';


const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  MovieDetail: { screen: MovieDetail }
})

export default AppNavigator
