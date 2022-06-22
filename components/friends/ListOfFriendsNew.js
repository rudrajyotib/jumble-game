import { useFocusEffect } from "@react-navigation/native"
import React from "react"
import { Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { getListOfConfirmedFriends } from "../../services/UserService"
import { updateFriends } from "../../store/data/GameStateSlice"
import SingleFriendNew from "../elements/SingleFriendNew"

function ListOfFriendsNew(props) {

    const gameState = useSelector(state => state.gameState)
    const dispatch = useDispatch()
    useFocusEffect(React.useCallback(() => {
        if (gameState.feed.friends.loaded === true) {
            props.onDataLoad()
            return
        }
        getListOfConfirmedFriends(gameState.authenticatedUser.uid)
            .then((response) => {
                if (response.result === 1) {
                    dispatch(updateFriends({ friendList: response.friends }))

                }
                else {
                    dispatch(updateFriends({ friendList: [] }))
                }
                props.onDataLoad()

            }).catch((err) => {
                dispatch(updateFriends({ friendList: [] }))
                props.onDataLoad()
            })


    }, []))

    const friends = gameState.feed.friends
    var friendsContent = <View />
    if (friends) {
        if (friends.loaded === false) {
            friendsContent = <View>
                <Text>Your friendlist loading</Text>
            </View>
        } else {
            if (friends.friendList) {
                if (friends.friendList.length > 0) {
                    friendsContent = friends.friendList.map(
                        friend => <SingleFriendNew onChallenge={(duelId, userId) => {
                            props.onChallenge(duelId, userId)
                        }} key={`'challenge'${friend.friendUserId}`} userId={gameState.authenticatedUser.uid} duelId={friend.duelId} name={friend.name} friend={friend} />
                    )
                } else {
                    friendsContent = <View>
                        <Text>You don't have any friends yet.</Text>
                    </View>
                }
            } else {
                friendsContent = <View>
                    <Text>Friend list could not be loaded due to technical error</Text>
                </View>
            }
        }
    } else {
        friendsContent = <View>
            <Text>Friend list could not be loaded due to technical error</Text>
        </View>
    }


    return <View>
        <Text style={{ fontFamily: 'RobotoMono-Italic', paddingLeft: 20 }}>Who do you want to challenge?</Text>
        {friendsContent}
    </View>
}

export default ListOfFriendsNew