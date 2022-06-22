import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import SingleDuel from "./SingleDuel";

function SingleFriendNew(props) {

    const [details, setDetails] = useState({ loaded: false })

    var detailContent = <View />
    if (details.loaded === true) {
        detailContent = <View>
            <SingleDuel onChallenge={(duelId, userId) => {
                props.onChallenge(duelId, userId)
            }} name={props.friend.name} userId={props.userId} duelId={props.duelId} friendUserId={props.friend.friendUserId} />
        </View>
    }

    return <Pressable style={{ ...styles.card, paddingVertical: 10, backgroundColor: 'white', opacity: '0.9' }} onPress={() => {
        setDetails((currentDetail) => {
            const newDetail = { ...currentDetail }
            newDetail.loaded = !currentDetail.loaded
            return newDetail
        })
    }}>
        <View>
            <Text style={{ fontFamily: 'RobotoMono-Regular', fontSize: 18, color: 'black' }}>{props.friend.name}</Text>
            {detailContent}
        </View>

    </Pressable>
}

export default SingleFriendNew