import React from "react";
//import { useSelector, connect } from "react-redux"
//import { RootState } from "../app/store";
import {selectScore} from "./quizSlice"
import {useAppSelector} from "../../app/hooks"

export default function BottomBar(props: BottomBarProps) {
    // Render the bottom bar based on the state of the game
    const score = useAppSelector(selectScore)
    if (score == undefined) {
        return (
            <button className="bottomBar--button1" onClick={()=>props.checkAnswers()}>Check Answers</button>
        );
    }

    else {
        return (
            <div className="bottomBar--scoreContainer">
                <h2 className="bottomBar--text">You scored {score}/5 correct answers</h2>
                <button className="bottomBar--button2" onClick={()=>props.newGame()}>Play Again</button>
            </div>
        )
    }
}

//function to map the redux state to the props of the component
//const mapStateToProps = (state: RootState, ownProps: BottomBarProps) => {
//    return {
//        score: state.score.userScore
//    }
//}

//export default connect(mapStateToProps)(BottomBar)

