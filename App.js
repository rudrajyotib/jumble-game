import { StyleSheet, View } from 'react-native';
import CreateJumble from './screens/CreateJumble/CreateJumble';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import SolveJumble from './screens/SolveJumble/SolveJumble';

export default function App() {

  return (
    <View style={styles.screen}>
      {/* <SolveJumble questionWord="UMBLJe" answerWord="JUMBLE" /> */}
      {/* <CreateJumble /> */}
      <CreateJumble />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //paddingTop: 30
  }
});