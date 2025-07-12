import { Role } from "@/types/Role";
import { User } from "@/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: User | null;
    token: string | null;
    role: Role | null
}
const initialState: AuthState = {
    user: null,
    token: null,
    role: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        update: (state, action: PayloadAction<{user: User, role: Role|null}>) => {
            state.user = {...action.payload.user}
            localStorage.setItem("user", JSON.stringify({...action.payload.user, role: action.payload.role}));
            console.log('done updating user')
        },
        login: (state, action: PayloadAction<{ user: User; token: string; role: Role }>) => {
            state.user = {...action.payload.user};
            state.token = action.payload.token;
            state.role = action.payload.role;
            localStorage.setItem("accessToken", action.payload.token);
            localStorage.setItem("user", JSON.stringify({...action.payload.user, role: action.payload.role}));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
        },
        loadAuthFromStorage: (state) => {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("accessToken");
            try {
                if (storedUser && storedToken) {
                    const parsedUser = JSON.parse(storedUser);
                    state.user = { ...parsedUser };
                    state.token = storedToken;
                    state.role = parsedUser.role;
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

export const { update, login, logout, loadAuthFromStorage, updateImage } = authSlice.actions;

export default authSlice.reducer;
