import React from "react";
import Options from "./Option";
import { connect } from "react-redux"

export default function Question(props: QuestionProps) {
    
    // Generate options array from incorrect answers
    const options = props.question.options.map((option: string) => {
        return <Options key={option} id={option} question={props.question} setUserAnswer={props.setUserAnswer}/>
    })

    return (
        <div className="question">
            <h1 className="prompt">{props.question.prompt}</h1>
            <div className="option--container">
                {options}
            </div>
            <hr />
        </div>
    );
}