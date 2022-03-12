import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create(
    {
        modalViewContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
        },
        modalBodyContainer: {
            margin: 20,
            backgroundColor: "orange",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        }
    }
);