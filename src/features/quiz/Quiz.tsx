import React, {useEffect, useRef, useState} from "react"
import Question from "./Question"
import BottomBar from "./BottomBar"
import autoAnimate from '@formkit/auto-animate'
import { setScore, selectScore, addToScore} from "./quizSlice"
import { useAppSelector, useAppDispatch } from "../../app/hooks"

export default function Quiz(props: {catagory: string, name: string}) {
    const bottomBarRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (bottomBarRef.current) {
            autoAnimate(bottomBarRef.current);   
        }
        if (containerRef.current) {
            autoAnimate(containerRef.current);   
        }
    }, [containerRef.current])

    // Typed version of dispatch
    const dispatch = useAppDispatch();

    // State for the current questions
    const [questions, setQuestions] = useState<Question[]>([])

    // UserScore in the score state
    const score = useAppSelector(selectScore)
    
    //Function to decode html to a string
    function decodeHtml(html: string) { 
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    // Function to fetch questions from API, decode the HTML text to strings, and set them to state
    async function fetchQuestions() {
        const response = await fetch("https://opentdb.com/api.php?amount=5&category=" + props.catagory + "&difficulty=easy&type=multiple")
        const data = await response.json()
        const questions: Question[] = data.results.map((question: APIResponseData, counter: number) => {
            return {
                index: counter,
                prompt: decodeHtml(question.question),
                options: [...question.incorrect_answers.map((a: string) => 
                        decodeHtml(a)), decodeHtml(question.correct_answer)].sort(() => Math.random() - 0.5),
                correctAnswer: decodeHtml(question.correct_answer),
                userAnswer: "",
                correct: undefined
            }
        })
        setQuestions(questions)
    }

    // Funcion to set the users answer (option) for a question (index)
    function setUserAnswer(index: number, option: string) {
        // Get current state of score
        if(score == undefined) {
            const newQuestions = [...questions]
            newQuestions[index].userAnswer = (newQuestions[index].userAnswer== option ? "": option);
            setQuestions(newQuestions)
        }

    }

    // Function to check the users answers
    function checkAnswers() {
        //loop trough questions and check if the user answer is correct
        const newQuestions = [...questions]
        newQuestions.forEach((question: Question) => {
            question.correct = question.correctAnswer == question.userAnswer;
        })

        //set the new question and score states
        setQuestions(newQuestions);
        dispatch(addToScore(newQuestions.filter((question: Question) => question.correct).length));
    }

    // Function to start a new game
    async function newGame() {
        await fetchQuestions();
        dispatch(setScore(undefined));
    }

    useEffect(() => {
        setQuestions(()=>[])
        dispatch(setScore(undefined));
    }, [props.catagory])

    //Create an array of Question components from the questions in state
    const questionComponents = questions.map((question: Question) => {
        return <Question key={question.prompt} question={question} setUserAnswer={setUserAnswer}/>
    })
    
    // Render the app based on the questions state
    if (questions.length == 0) {
        return (
            <div className="start">
                <br />
                <p className="start--text">Test yourself with 5 random questions about {props.name}</p>
                <button className="start--button" onClick={()=>fetchQuestions()}>Start Quiz</button>
            </div>
        )
    }
    else {
        return (
            <div className="questionContainer" ref={containerRef}>
                {questionComponents}
                <BottomBar checkAnswers={checkAnswers} newGame={newGame}/>
            </div>
        )
    }
}