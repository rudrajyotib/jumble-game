import { StyleSheet, View } from 'react-native';
import SolveJumble from './screens/SolveJumble/SolveJumble';

export default function App() {

  return (
    <View style={styles.screen}>
      <SolveJumble questionWord="UMBLJe" answerWord="JUMBLE" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //paddingTop: 30
  }
});