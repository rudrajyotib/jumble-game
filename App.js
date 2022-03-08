import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import CreateJumble from './screens/CreateJumble/CreateJumble';
import GameOver from './screens/GameOver/GameOver';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import SolveJumble from './screens/SolveJumble/SolveJumble';

const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={CreateJumble} />
        <Stack.Screen name="SolveJumble" component={SolveJumble} />
        <Stack.Screen name="GameOver" component={GameOver} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});