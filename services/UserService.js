import axios from 'axios'

export async function getListOfConfirmedFriends(userId) {
    // var challenges_link = GameConstants.BASE_SERVICE_LINK + "/challenges.json";
    const friendList = { result: 0, friends: [] };
    await axios.get("https://jumble-apis.herokuapp.com/api/user/friends/" + userId)
        // await axios.get("https://621eca13849220b1fca15c71.mockapi.io/friends/" + userId)
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
        .catch((response) => {
            duelData.result = -1
        })
    return duelData
}

export async function friendshipAndChallengeStatus(userId, friendUserId) {
    const duelData = { result: 0 };
    await axios.get("https://jumble-apis.herokuapp.com/api/user/scoresandchallengestatus/" + userId + "/" + friendUserId)
        // await axios.get("https://621eca13849220b1fca15c71.mockapi.io/scoresandchallengestatus/" + userId)
        .then((response) => {
            if (200 === response.status) {
                const challengeability = response.data
                duelData.result = 1
                duelData.friendshipData = {
                    challengeable: challengeability.challengeable,
                    sourceUserScore: challengeability.sourceUserScore,
                    targetUserScore: challengeability.targetUserScore
                }
            }
        })
        .catch((response) => {
            duelData.result = -1
        })
    return duelData
}

export async function getEmailForUserId(userId) {
    const result = { found: false, email: '' }
    await axios.get("https://jumble-apis.herokuapp.com/api/user/emailIdForLogin/" + userId)
        .then((response) => {
            if (response.status === 200) {
                const userData = response.data
                if (userData.email) {
                    result.found = true
                    result.email = userData.email
                }
            }
        })
        .catch(() => { })
    return result
}