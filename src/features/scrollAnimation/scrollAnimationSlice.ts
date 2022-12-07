import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

export interface IScrollAnimation {
    numFrames: number;
    currentFrame: number;
}

const initialState: IScrollAnimation = {
    numFrames: 148,
    currentFrame: 0,
}

export const ScrollAnimationSlice = createSlice({
    name: 'scrollAnimation',
    initialState,
    reducers: {
        setcurrentFrame: (state, action: PayloadAction<number>) => {
            state.currentFrame = action.payload;
        },
        setnumFrames: (state, action: PayloadAction<number>) => {
            state.numFrames = action.payload;
        }
    }
});

export default ScrollAnimationSlice.reducer;
export const {setcurrentFrame, setnumFrames} = ScrollAnimationSlice.actions;
export const selectScrollAnimation = (state: RootState) => state.scrollAnimation;