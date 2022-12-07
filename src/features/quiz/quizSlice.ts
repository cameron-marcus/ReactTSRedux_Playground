//Reducer for score state
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

export interface IQuiz {
    userScore: number | undefined;
}

const initialState: IQuiz = {userScore: undefined};

// Create a slice for score with actions to set and increment by an amount
export const quizzSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setScore: (state, action: PayloadAction<number | undefined>) => {
            state.userScore = action.payload;
        },
        addToScore: (state, action: PayloadAction<number>) => {
            state.userScore = (state.userScore == undefined ? 0: state.userScore) + action.payload;
        }
    }
});

// Export reducer
export default quizzSlice.reducer;
// Export actions
export const {setScore, addToScore} = quizzSlice.actions;
// Export selector
export const selectScore = (state: RootState) => state.quiz.userScore;