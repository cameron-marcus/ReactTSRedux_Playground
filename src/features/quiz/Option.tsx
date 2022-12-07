import { produceWithPatches } from "immer";
import React from "react";
import styled from "styled-components";

interface IButtonProps {
     className: string;
     parentProps: OptionProps;
     onClick: () => void;
}

const getButtonStyle = (props: IButtonProps)=> {
     const parentProps = props.parentProps;
     if (parentProps.question.correct == undefined) {
          return `
          background-color: ${parentProps.question.userAnswer == parentProps.id ? "#D6DBF5" : "rgba(0,0,0,0)"};
          border-idth: ${parentProps.question.userAnswer == parentProps.id ? "0px" : "0.8px"};
          `;
     }
     else if (parentProps.question.correctAnswer == parentProps.id){
          return `
          background-color: #94D7A2;
          border-width: 0px;
          `;
     }
     else if (parentProps.question.userAnswer == parentProps.id){
          return `
          background-color: #F8BCBC;
          border-width: 0px;
          opacity: 0.5;
          `;
     }
     else {
          return `
               opacity: 0.5;
          `;
     }
}

const Button = styled.button<IButtonProps>`${(props)=>getButtonStyle(props)}`;

export default function Options(props: OptionProps) {
     
     return (
          <Button className="option" parentProps={props} onClick={()=>props.setUserAnswer(props.question.index, props.id)}>
               {props.id}
          </Button>
     );
}