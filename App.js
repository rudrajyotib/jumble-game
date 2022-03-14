import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import GameMode from './screens/GameMode/GameMode';
import GameScreen from './screens/GameScreen/GameScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='GameMode' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="TestWindow" component={HomeScreen} />
        <Stack.Screen name="GameMode" component={GameMode} />
        <Stack.Screen name="GameScreen" component={GameScreen} options={{ gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});