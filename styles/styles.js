import { StyleSheet } from "react-native";

export const styles = StyleSheet.create(
    {
        parentContainer: {
            flexDirection: "column",
            flex: 1
        },
        countdownTimerContainer: {
            flex: 1,
            //  backgroundColor: "white",
            //  justifyContent: "center",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: 30,
            paddingRight: 30,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
        }, questionContainer: {
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
            //borderColor: "green",
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: 'black',
            shadowOffset: { width: 2, height: 2 },
            shadowRadius: 40,
            shadowOpacity: 0.26,
            elevation: 8,
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 300,
            margin: 3
        },
        buttonSecondary:
        {
            borderWidth: 4,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "black",
            backgroundColor: "orange"
        },
        buttonPrimary:
        {
            borderWidth: 4,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "black",
            backgroundColor: "#09e85f",
            paddingHorizontal: 20
        },
        buttonLowPriority:
        {
            borderWidth: 4,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "black",
            backgroundColor: "#e80987"
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
