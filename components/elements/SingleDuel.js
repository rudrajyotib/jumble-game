import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { friendshipAndChallengeStatus } from "../../services/UserService";
import { styles } from "../../styles/styles";

function SingleDuel(props) {

    const [friendshipData, setFriendshipData] = useState({ loaded: false })


    useFocusEffect(React.useCallback(() => {
        if (false === friendshipData.loaded) {
            const friendshipStatusFunction = async (userId, friendUserId) => {
                const friendshipStatus = await friendshipAndChallengeStatus(userId, friendUserId)
                if (friendshipStatus && 1 === friendshipStatus.result) {
                    data = friendshipStatus.friendshipData
                    setFriendshipData((currentData) => {
                        updatedData = { ...currentData }
                        updatedData.loaded = true
                        updatedData.challengeable = data.challengeable
                        updatedData.sourceUserScore = data.sourceUserScore
                        updatedData.targetUserScore = data.targetUserScore
                        return updatedData
                    })
                }
            }
            friendshipStatusFunction(props.userId, props.friendUserId)
        }
    }, []))

    var scoreContent = <View><Text>Loading score...</Text></View>
    if (friendshipData.loaded) {
        scoreContent = <View>
            <Text style={{ fontFamily: 'RobotoMono-Regular', fontSize: 12, color: 'maroon' }}>[ {friendshipData.sourceUserScore}- {friendshipData.targetUserScore} ]</Text>
        </View>
    }

    return <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'space-between' }}>
            <View style={{ flex: 4, justifyContent: "center" }}>
                {scoreContent}
            </View>
            <View style={{ flex: 6, justifyContent: "center" }}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    {((true === friendshipData.loaded)
                        && (true === friendshipData.challengeable)) && <Pressable
                            style={{ ...styles.card, ...styles.buttonPrimary, width: '70%' }}
                            onPress={() => {
                                props.onChallenge(props.duelId, props.userId)
                            }}>
                            <Text>Challenge</Text>
                        </Pressable>}
                </View>
            </View>
        </View>
    </View>
}

export default SingleDuel