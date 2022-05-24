import axios from 'axios'

export async function getListOfConfirmedFriends(userId) {
    // var challenges_link = GameConstants.BASE_SERVICE_LINK + "/challenges.json";
    const friendList = { result: 0, friends: [] };
    await axios.get("https://jumble-apis.herokuapp.com/api/user/friends/" + userId)
        .then((response) => {
            if (200 === response.status) {
                friendList.result = 1
                const friendData = response.data
                if (friendData && friendData.length > 0) {
                    friendData.forEach(function (confirmedFriend, index) {
                        const friend = {
                            duelId: confirmedFriend.duelId,
                            name: confirmedFriend.name,
                            friendUserId: confirmedFriend.id
                            //   challengeDate: response.data[key].challengeDate,
                            //   question: response.data[key].question
                        }
                        friendList.friends.push(friend)
                    })
                }
            }
        })
        .catch((err) => {
            friendList.result = -1
        })


    return friendList;
}

export async function getFriendshipDetails(duelId) {
    const duelData = { result: 0 };
    await axios.get("https://jumble-apis.herokuapp.com/api/challenge/duel/" + duelId)
        .then((response) => {
            if (200 === response.status) {
                duelData.result = 1
                duelData.duelDetails = response.data
            }
        })
        .catch(() => {
            duelData.result = -1
        })
    return duelData
}

export async function isChallengeable(userId, friendUserId) {
    const duelData = { result: 0 };
    await axios.get("https://jumble-apis.herokuapp.com/api/user/isChallengeable/" + userId + "/" + friendUserId)
        .then((response) => {
            if (200 === response.status) {
                challengeability = response.data
                if (challengeability && true === challengeability.challengeable) {
                    duelData.result = 1
                }
            }
        })
        .catch(() => {
            duelData.result = -1
        })
    return duelData
}