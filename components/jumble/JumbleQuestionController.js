import OfflineShuffler from "./OfflineShuffler";

function JumbleQuestionController(props) {
    return (
        <OfflineShuffler name={props.name} onStart={(targetWord, jumbledWord) => {
            props.onStart(targetWord, jumbledWord)
        }} />
    )
}

export default JumbleQuestionController