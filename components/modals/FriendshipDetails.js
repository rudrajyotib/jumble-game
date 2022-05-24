import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Modal, Text, View } from "react-native"
import { getFriendshipDetails } from "../../services/UserService";
import { styles } from "../../styles/styles";
import PressableButton from "../elements/PressableButton";
import ScoreSummary from "../game/ScoreSummary";
import { modalStyles } from "./styles/ModalStyles";

function FriendshipDetails(props) {

    const modalVisibleProp = props.modalVisibleProp;
    const [modalVisible, setModalVisible] = useState(modalVisibleProp)
    const [friendshipDetails, setFriendshipDetails] = useState({ loaded: false, score: [0, 0], players: ['', ''] })

    useFocusEffect(React.useCallback(() => {
        getFriendshipDetails(props.duelId)
            .then((response) => {
                if (response.result === 1) {
                    players = [props.userName, props.friendName]
                    scores = [0, 0]
                    try {
                        if (response.duelDetails.score) {
                            scores[0] = response.duelDetails.score[props.userId]
                            scores[1] = response.duelDetails.score[props.friendUserId]
                        }
                    } catch (err) { }
                    setFriendshipDetails(() => { return { loaded: true, score: scores, players: players } })
                } else {
                    setFriendshipDetails(() => { return { loaded: false, score: [0, 0], players: ['', ''] } })
                }
            })
            .catch(() => { setFriendshipDetails(() => { return { loaded: false, score: [0, 0], players: ['', ''] } }) })
    }, []))


    return (
        <View>
            <Modal animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { }}>
                <View style={{ ...modalStyles.modalViewContainer, width: 400 }}>
                    <View style={{ ...modalStyles.modalBodyContainer }}>

                        <View >
                            <Text style={{ fontWeight: 'bold', fontSize: 30 }}>{props.friendName}</Text>
                        </View>
                        {(friendshipDetails.loaded === true) &&
                            <View style={{ width: '90%' }}>
                                <View style={{ paddingTop: 20 }}>
                                    <Text style={{ fontSize: 14 }}>Scorecard                                                 </Text>
                                </View>
                                <View style={{ paddingTop: 10 }}>
                                    <ScoreSummary scores={friendshipDetails.score} gameContainer={
                                        { scores: friendshipDetails.score }
                                    } players={friendshipDetails.players} />
                                </View>
                            </View>}
                        {(friendshipDetails.loaded === false) && <View><Text>Loading friendship</Text></View>}
                        <View style={{ paddingTop: 30 }}>
                            <View style={{ ...styles.horizontalContainer, ...{ justifyContent: "space-between" } }}>
                                <PressableButton style={{ ...styles.buttonCard, ...styles.buttonLowPriority }} buttonSize="small" disabled={false} handlerFunction={() => {
                                    // props.onConfirmTarget()
                                    props.onBack()
                                    setModalVisible(() => false)
                                }} buttonLabel={'Back'} />
                                <PressableButton style={{ ...styles.buttonCard, ...styles.buttonPrimary }} buttonSize="small" disabled={false} handlerFunction={() => {
                                    // props.onConfirmTarget()
                                    props.onAddChallenge(props.duelId, props.userId)
                                    props.onBack()
                                    setModalVisible(() => false)
                                }} buttonLabel={'set a challenge'} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default FriendshipDetails