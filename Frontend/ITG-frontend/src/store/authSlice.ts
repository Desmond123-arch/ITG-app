import { User } from "@/types/User";
import { ProfilePic } from "@/assets/images";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
            state.user = {...action.payload.user};
            state.token = action.payload.token;
            localStorage.setItem("accessToken", action.payload.token);
            localStorage.setItem("user", JSON.stringify({...action.payload.user, imageUrl: ProfilePic}));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
        },
        loadAuthFromStorage: (state) => {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("accessToken");
            try {
                if (storedUser && storedToken) {
                    const parsedUser = JSON.parse(storedUser);
                    state.user = { ...parsedUser, imageUrl: ProfilePic };
                    state.token = storedToken;
                }
            } catch (err) {
                console.error("Failed to parse stored user:", err);
                localStorage.removeItem("user");
                localStorage.removeItem("accessToken");
            }
        },
        updateImage: (state, action: PayloadAction<string>) => {
            if (state.user) {
                state.user.imageUrl = action.payload;
                localStorage.setItem("user", JSON.stringify(state.user));
            }
        },
    },
});

export const { login, logout, loadAuthFromStorage, updateImage } = authSlice.actions;

export default authSlice.reducer;
