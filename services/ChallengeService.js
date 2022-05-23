import axios from 'axios'
import { GameConstants } from '../utils/Constants';

export async function getAllChallenges() {
    var challenges_link = GameConstants.BASE_SERVICE_LINK + "/challenges.json";
    const response = await axios.get("http://demo5985284.mockable.io/challenges")
    const challenges = [];
    // console.log('Challenges response' + JSON.stringify(response))
    for (const key in response.data) {
        const challenge = {
            gameId: key,
            challenger: response.data[key].challenger,
            challengeDate: response.data[key].challengeDate,
            question: response.data[key].question
        }
        challenges.push(challenge)
    }
    return challenges;
}

export async function getAllChallengesForUser(userId) {
    // var challenges_link = GameConstants.BASE_SERVICE_LINK + "/challenges.json";
    const challengesList = { result: 0, challenges: [] };
    await axios.get("https://jumble-apis.herokuapp.com/api/challenge/pendingduels/" + userId)
        .then((response) => {
            if (200 === response.status) {
                challengesList.result = 1
                const challengeData = response.data
                if (challengeData && challengeData.length > 0) {
                    challengeData.forEach(function (pendingDuel, index) {
                        const challenge = {
                            duelId: pendingDuel.duelId,
                            challenger: pendingDuel.sourceUser,
                            challengeId: pendingDuel.challengeId
                            //   challengeDate: response.data[key].challengeDate,
                            //   question: response.data[key].question
                        }
                        challengesList.challenges.push(challenge)
                    })
                }
            }
        })
        .catch((err) => {
            challengesList.result = -1
        })





    console.log('challengse list::' + JSON.stringify(challengesList))
    return challengesList;
}

export async function getChallengeForDuel(duelId) {
    const response = await axios.get("https://jumble-apis.herokuapp.com/api/challenge/challenge/" + duelId)
    const challengeQuestion = { result: 0 };
    if (200 != response.status) {
        challengeQuestion.result = -1
        return challengeQuestion
    } else {
        challengeQuestion.result = 1
        challengeQuestion.question = response.data
    }
    console.log('Challenge question response' + JSON.stringify(response.data))

    return challengeQuestion;
}

export async function markChallengeAttempted(duelId) {
    console.log('attempting challenge' + duelId)
    const response = await updateStatusOfDuelId(duelId, 'attempt')
    return response
}

export async function markChallengeSuccess(duelId) {
    console.log('attempting challenge' + duelId)
    const response = await updateStatusOfDuelId(duelId, 'success')
    return response
}

export async function markChallengeFailure(duelId) {
    console.log('attempting challenge' + duelId)
    const response = await updateStatusOfDuelId(duelId, 'failure')
    return response
}

async function updateStatusOfDuelId(duelId, status) {
    const response = await axios.post("https://jumble-apis.herokuapp.com/api/challenge/" + status + "/" + duelId)
    if (204 != response.status) { return false }
    return true
}