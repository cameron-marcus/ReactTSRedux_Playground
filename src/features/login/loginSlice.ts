import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export interface ILogin {
    username: string;
    userIsSet: boolean;
    loginStatus: "idle" | "pending" | "success" | "failed";
}

const initialState: ILogin = {
    username: '',
    userIsSet: false,
    loginStatus: 'idle'
}

export const loginAsync = createAsyncThunk<void, boolean, {state: RootState }>(
    'login/loginAsync',
    async (isSet: boolean, store) => {
        const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
                const username = store.getState().login.username;
                if (username.toLocaleLowerCase() == "admin") {
                    reject("Admin is not allowed as a username");
                }
                else if (username.toLocaleLowerCase() == "dehan") {
                    reject("Dehan is not allowed as a username");
                }
                resolve(username);
            }, 5000);
        });
    }
);

export const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setUserIsSet: (state, action: PayloadAction<boolean>) => {
            state.userIsSet = action.payload;
        },
        setLoginStatus: (state, action: PayloadAction<"idle" | "pending" | "success" | "failed">) => {
            state.loginStatus = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.fulfilled, (state) => {
            state.loginStatus = 'success';
            state.userIsSet = true;
        });
        builder.addCase(loginAsync.pending, (state) => {
            state.loginStatus = 'pending';
        });
        builder.addCase(loginAsync.rejected, (state) => {
            state.loginStatus = 'failed';
        });
        builder.addDefaultCase((state) => {
            state.loginStatus = 'idle';
        });
    }
});

export default LoginSlice.reducer;
export const { setUsername, setUserIsSet, setLoginStatus} = LoginSlice.actions;
export const selectUsername = (state: RootState) => state.login.username;
export const selectUserIsSet = (state: RootState) => state.login.userIsSet;
export const selectLoginStatus = (state: RootState) => state.login.loginStatus;