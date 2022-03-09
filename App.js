import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import CreateJumble from './screens/CreateJumble/CreateJumble';
import GameMode from './screens/GameMode/GameMode';
import GameOver from './screens/GameOver/GameOver';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import SolveJumble from './screens/SolveJumble/SolveJumble';

const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='CreateJumble' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="CreateJumble" component={CreateJumble} />
        <Stack.Screen name="GameMode" component={GameMode} />
        <Stack.Screen name="SolveJumble" component={SolveJumble} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});