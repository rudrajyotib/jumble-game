import { StyleSheet } from "react-native";

export const styles = StyleSheet.create(
    {
        parentContainer: {
            flexDirection: "column",
            flex: 1
        },
        questionContainer: {
            flex: 4,
            backgroundColor: "orange",
            justifyContent: "center",
            paddingTop: 40
        },
        createJumbleContainer: {
            flex: 1,
            justifyContent: "center",
            paddingTop: 40
        },
        answerContainer: {
            flex: 4,
            backgroundColor: "#ffffcc",
            justifyContent: "center"
        },
        questionText: {
            fontWeight: "bold"
        },
        card: {
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 2,
            shadowOpacity: 0.26,
            elevation: 8,
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 8,
            margin: 3
        },
        letterCard: {
            width: 40,
            height: 40,
            borderColor: "aqua",
            borderWidth: 4,
            justifyContent: "center",
            alignItems: "center"
        },
        buttonCard: {
            //width: 100,
            height: 50,
            borderColor: "green",
            borderWidth: 4,
            justifyContent: "center",
            alignItems: "center",
        },
        undoButtonContainer: {
            padding: 10
        },
        horizontalContainer: {
            flexDirection: "row",
            justifyContent: "center"
        },
        input: {
            height: 60,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 2,
            shadowOpacity: 0.26,
            elevation: 8,
            backgroundColor: 'white',
            borderRadius: 8,
        }
    }

);
