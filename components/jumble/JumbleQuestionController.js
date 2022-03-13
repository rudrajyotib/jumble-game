import OfflineShuffler from "./OfflineShuffler";

function JumbleQuestionController(props) {
    return (
        <OfflineShuffler onStart={(targetWord, jumbledWord) => {
            props.onStart(targetWord, jumbledWord)
        }} />
    )
}

export default JumbleQuestionController