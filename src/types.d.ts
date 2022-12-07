interface APIResponseData {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}


interface Question {
    index: number;
    prompt: string;
    options: string[];
    correctAnswer: string;
    userAnswer: string;
    correct: boolean | undefined;
}

interface QuestionProps {
    question: Question;
    setUserAnswer: (index: number, option: string) => void;
}

interface OptionProps {
    id: string;
    question: Question;
    setUserAnswer: (index: number, option: string) => void;
}

interface BottomBarProps {
    checkAnswers: () => void;
    newGame: () => void;
}

interface ScoreAction {
    type: string;
    payload: number | undefined;
}
