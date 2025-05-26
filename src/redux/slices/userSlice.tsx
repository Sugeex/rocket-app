import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date?: number;
  hash?: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  id: 0,
  first_name: '',
  isAuthenticated: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
       setUser: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    },
    clearUser: () => initialState,
    },
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
