import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import ChallengeScreen from './screens/Challenge/ChallengeScreen';
import OfflineGameMode from './screens/OfflineGameMode/OfflineGameMode';
import GameScreen from './screens/GameScreen/GameScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import SignInScreen from './screens/SignIn/SignIn'
import GameMode from './screens/GameMode/GameMode'
import store from './store/store';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="TestWindow" component={HomeScreen} />
          <Stack.Screen name="GameMode" component={GameMode} />
          <Stack.Screen name="OfflineGameMode" component={OfflineGameMode} />
          <Stack.Screen name="GameScreen" component={GameScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Challenges" component={ChallengeScreen} />
          <Stack.Screen name="Login" component={SignInScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});