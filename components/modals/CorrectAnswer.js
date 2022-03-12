import { useState } from "react";
import { Modal, Text, View } from "react-native"
import { styles } from "../../styles/styles";
import LettersContainer from "../LettersContainer";
import PressableButton from "../PressableButton";
import { modalStyles } from "./styles/ModalStyles";

function CorrectAnswer(props) {

    const modalVisibleProp = props.modalVisibleProp;
    const [modalVisible, setModalVisible] = useState(modalVisibleProp)

    return (
        <View >
            <Modal animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {

                }}>
                <View style={{ ...modalStyles.modalViewContainer }}>
                    <View style={{ ...modalStyles.modalBodyContainer, width: "100%" }}>
                        <View style={{}}>
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
                                    <PressableButton style={{ ...styles.buttonCard, ...styles.buttonPrimary }} buttonSize="medium" disabled={false} handlerFunction={() => {
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