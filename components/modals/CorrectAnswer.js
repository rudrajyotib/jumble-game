import { useState } from "react";
import { Modal, Text, View } from "react-native"
import { styles } from "../../styles/styles";
import LettersContainer from "../LettersContainer";
import PressableButton from "../PressableButton";

function CorrectAnswer(props) {

    const modalVisibleProp = props.modalVisibleProp;
    const [modalVisible, setModalVisible] = useState(modalVisibleProp)

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
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Answer</Text>
                            </View>
                            <LettersContainer
                                lettersFrame={props.frame}
                                keyPrefix={'CorrectAnswerModal'}
                                maxRowLength={8}
                                disableCheckFunction={() => { }}
                                questionButtonPressHandler={() => { }}
                            />
                            <View style={{ paddingTop: 30 }}>
                                <View style={{ ...styles.horizontalContainer, ...{ justifyContent: "center" } }}>
                                    <PressableButton style={{ ...styles.buttonCard, ...styles.buttonPrimary }} buttonSize="small" disabled={false} handlerFunction={() => {
                                        props.onPressOk()
                                        setModalVisible(false)
                                    }} buttonLabel={'OK'} />

                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )

}

export default CorrectAnswer