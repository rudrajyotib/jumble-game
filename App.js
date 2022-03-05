import { StyleSheet, View } from 'react-native';
import CreateJumble from './screens/CreateJumble/CreateJumble';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import SolveJumble from './screens/SolveJumble/SolveJumble';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    // <View style={styles.screen}>
    //   {/* <SolveJumble questionWord="UMBLJe" answerWord="JUMBLE" /> */}
    //   {/* <CreateJumble /> */}
    //   <CreateJumble />
    // </View>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={CreateJumble} />
        <Stack.Screen name="SolveJumble" component={SolveJumble} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //paddingTop: 30
  }
});