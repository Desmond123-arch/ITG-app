import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    uuid: string;
    name: string;
    email: string;
    phone: string
}
interface AuthState {
    user: User | null;
    token: string | null;
}
const initialState: AuthState = {
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("accessToken", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
        },
        loadAuthFromStorage: (state) => {
            console.log("Loading auth from storage");
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("accessToken");
            if (storedUser && storedToken) {
                state.user = JSON.parse(storedUser);
                state.token = storedToken;
            }
        },
    },
});

export const { login, logout, loadAuthFromStorage } = authSlice.actions;

export default authSlice.reducer;
