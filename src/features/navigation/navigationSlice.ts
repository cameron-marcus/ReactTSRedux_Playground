import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { IMenuLink } from './linkTree';

export interface NavigationState {
    menuIsOpen: boolean;
    logOutIsOpen: boolean;
    linkTree: IMenuLink | undefined;
    linkHistory: IMenuLink[];
}

const initialState: NavigationState = {
    menuIsOpen: false,
    logOutIsOpen: false,
    linkTree: undefined,
    linkHistory: []
};

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        toggleMenuIsOpen: (state) => {
            state.menuIsOpen = !state.menuIsOpen;
        },
        toggleLogOutIsOpen: (state) => {
            state.logOutIsOpen = !state.logOutIsOpen;
        },
        setLinkTree: (state, action: PayloadAction<any>) => {
            state.linkTree = action.payload;
        },
        setLinkHistory: (state, action: PayloadAction<any>) => {
            state.linkHistory = action.payload;
        },
        pushLinkHistory: (state, action: PayloadAction<any>) => {
            state.linkHistory.push(action.payload);
        },
        popLinkHistory: (state) => {
            state.linkHistory.pop();
        }
    }
});

export default navigationSlice.reducer;
export const { toggleMenuIsOpen, toggleLogOutIsOpen, setLinkTree, setLinkHistory, pushLinkHistory, popLinkHistory} = navigationSlice.actions;
export const selectMenuIsOpen = (state: RootState) => state.navigation.menuIsOpen;
export const selectLogOutIsOpen = (state: RootState) => state.navigation.logOutIsOpen;
export const selectLinkTree = (state: RootState) => state.navigation.linkTree;
export const selectLinkHistory = (state: RootState) => state.navigation.linkHistory;
