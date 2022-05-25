import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import { getListOfConfirmedFriends } from "../../services/UserService";
import { styles } from "../../styles/styles";
import SingleFriend from "../elements/SingleFriend";
import FriendshipDetails from "../modals/FriendshipDetails";

function ListOfFriends(props) {

    const addChallengeHandler = (duelId, userId) => {
        props.onAddChallenge(duelId, userId)
    }

    const [friendList, setFriendList] = useState({ loading: true, friends: [] })
    const [duelDisplay, setDuelDisplay] = useState({ display: false, duelId: '', friendUserId: '', friendName: '' })
    useFocusEffect(React.useCallback(() => {
        getListOfConfirmedFriends(props.userId)
            .then((response) => {
                if (response.result == 1) {
                    setFriendList((friendList) => { return { loading: false, friends: response.friends } })
                } else {
                    setFriendList((friendList) => { return { loading: false } })
                }
            })
            .catch(() => {
                setFriendList((friendList) => { return { loading: false } })
            })
    }, []))

    let friendListContent = <View />
    if (friendList.loading === true) {
        friendListContent = <View style={{ ...styles.card }}><Text>Loading list of friends</Text></View>
    } else {

        if (friendList.friends.length > 0) {
            friendListContent =
                friendList.friends.map(friend => <SingleFriend
                    key={`'friend'${friend.id}`}
                    userName={props.userName}
                    userId={props.userId}
                    friendUserId={friend.friendUserId}
                    name={friend.name}
                    duelId={friend.duelId}
                    challengeHandler={(duelId, friendId, friendName) => {
                        setDuelDisplay(() => {
                            return {
                                display: true,
                                duelId: duelId,
                                friendUserId: friendId,
                                friendName: friendName
                            }
                        })
                    }} />)
        } else {
            friendListContent = <View style={{ ...styles.card }}><Text>You do not have any friends yet</Text></View>
        }
    }

    return (<View>
        {/* <Text>Hello list of Friends</Text> */}

        {friendListContent}
        {duelDisplay.display && <FriendshipDetails
            userName={props.userName}
            userId={props.userId}
            modalVisibleProp={true}
            duelId={duelDisplay.duelId}
            friendUserId={duelDisplay.friendUserId}
            friendName={duelDisplay.friendName}
            onAddChallenge={addChallengeHandler}
            onBack={() => {
                setDuelDisplay(() => {
                    return {
                        display: false,
                        duelId: '',
                        friendUserId: '',
                        friendName: ''
                    }
                })
            }} />}
    </View>)
}

export default ListOfFriends