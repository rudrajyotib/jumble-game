import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import AuthenticatedUserFeed from './screens/AuthenticatedUserFeed/AuthenticatedUserFeed';
import AuthenticatedUserHome from './screens/AuthenticatedUserHome/AuthenticatedUserHome';
import GameMode from './screens/GameMode/GameMode';
import GameScreen from './screens/GameScreen/GameScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import OfflineGameMode from './screens/OfflineGameMode/OfflineGameMode';
import SignInScreen from './screens/SignIn/SignIn';
import store from './store/store';


const Stack = createNativeStackNavigator();



export default function App() {

  const [fontLoaded] = useFonts({
    // 'dancing': require('./assets/fonts/Dancing_Script/DancingScript-VariableFont_wght.ttf'),
    // 'dancing-bold': require('./assets/fonts/Dancing_Script/static/DancingScript-Bold.ttf'),
    // 'devnagari-italic': require('./assets/fonts/Tiro_Devanagari_Sanskrit/TiroDevanagariSanskrit-Italic.ttf'),
    // 'devnagari-regular': require('./assets/fonts/Tiro_Devanagari_Sanskrit/TiroDevanagariSanskrit-Regular.ttf'),
    'RobotoMono-Thin': require('./assets/fonts/Roboto_Mono/static/RobotoMono-Thin.ttf'),
    'RobotoMono-Regular': require('./assets/fonts/Roboto_Mono/static/RobotoMono-Regular.ttf'),
    'RobotoMono-Italic': require('./assets/fonts/Roboto_Mono/static/RobotoMono-Italic.ttf'),
    'RobotoMono-MediumItalic': require('./assets/fonts/Roboto_Mono/static/RobotoMono-MediumItalic.ttf')

  })

  if (!fontLoaded) {
    return <AppLoading />
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='GameMode' screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="TestWindow" component={HomeScreen} />
          <Stack.Screen name="GameMode" component={GameMode} />
          <Stack.Screen name="OfflineGameMode" component={OfflineGameMode} />
          <Stack.Screen name="GameScreen" component={GameScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Login" component={SignInScreen} />
          <Stack.Screen name="AuthenticatedUserHome" component={AuthenticatedUserHome} options={{ gestureEnabled: false }} />
          <Stack.Screen name="AuthenticatedUserFeed" component={AuthenticatedUserFeed} options={{ gestureEnabled: false }} />
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