import { useState } from "react";
import { Modal, Text, View } from "react-native"
import { styles } from "../../styles/styles";
import PressableButton from "../PressableButton";

function ReadyCheck(props) {

    const [modalVisible, setModalVisible] = useState(true)


    return (
        <View>
            <Modal animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {

                }}>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 22,
                }}>
                    <View style={{
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
                    }}>
                        <View >
                            {/* <Text style={{ ...styles.modalText, ...styles.textStyle }}>You have set target</Text> */}
                            <View style={{ backgroundColor: "orange", opacity: 0.9, alignItems: "center", marginBottom: 20, padding: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Are you ready ?</Text>
                            </View>

                            <View style={{ paddingTop: 30 }}>
                                <View style={{ ...styles.horizontalContainer, ...{ justifyContent: "space-between" } }}>
                                    <PressableButton style={{ ...styles.buttonCard, ...styles.buttonPrimary }} buttonSize="medium" disabled={false} handlerFunction={() => {
                                        props.onStart()
                                        setModalVisible(false)
                                    }} buttonLabel={'START SOLVING !!!'} />

                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )

}


export default ReadyCheck