import { useState } from "react";
import { Modal, Text, View } from "react-native"
import { styles } from "../../styles/styles";
import LettersContainer from "../elements/LettersContainer";
import PressableButton from "../elements/PressableButton";
import { modalStyles } from "./styles/ModalStyles";

function ConfirmTarget(props) {

    const modalVisibleProp = props.modalVisibleProp;
    const [modalVisible, setModalVisible] = useState(modalVisibleProp)

    return (
        <View>
            <Modal animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {

                }}>
                <View style={{ ...modalStyles.modalViewContainer }}>
                    <View style={{ ...modalStyles.modalBodyContainer }}>
                        <View >
                            <View style={{ backgroundColor: "orange", opacity: 0.9, alignItems: "center", marginBottom: 20, padding: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your chosen target is</Text>
                            </View>
                            <LettersContainer
                                lettersFrame={props.frame}
                                keyPrefix={'ConfirmModal'}
                                maxRowLength={8}
                                disableCheckFunction={() => { }}
                                questionButtonPressHandler={() => { }}
                            />
                            <View style={{ paddingTop: 30 }}>
                                <View style={{ ...styles.horizontalContainer, ...{ justifyContent: "space-between" } }}>
                                    <PressableButton style={{ ...styles.buttonCard, ...styles.buttonPrimary }} buttonSize="small" disabled={false} handlerFunction={() => {
                                        props.onConfirmTarget()
                                        setModalVisible(false)
                                    }} buttonLabel={'Challenge'} />
                                    <PressableButton style={{ ...styles.buttonCard, ...styles.buttonLowPriority }} buttonSize="small" disabled={false} handlerFunction={() => {
                                        props.onRejectTarget()
                                        setModalVisible(false)
                                    }} buttonLabel={'Try another word'} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )

}

export default ConfirmTarget