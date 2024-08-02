import { createSlice } from "@reduxjs/toolkit";

const initialState = { theme: "dark", newUserList: [], newUserListLoading: true };

const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleTheme: (state) => { 
      state.theme = state.theme === "dark" ? "light" : "dark"; 
      document.documentElement.classList.toggle("dark", state.theme === "dark"); 
    },
    addNewUsersList: (state, action) => { state.newUserList = action.payload; state.newUserListLoading = false; },
    resetNewUserList: (state) => { state.newUserList = []; state.newUserListLoading = true; },
    setThemeDark: (state) => { state.theme = "dark"; document.documentElement.classList.add("dark"); },
    setThemeLight: (state) => { state.theme = "light"; document.documentElement.classList.remove("dark"); }
  }
});

export const { toggleTheme, addNewUsersList, resetNewUserList, setThemeDark, setThemeLight } = AppSlice.actions;
export default AppSlice.reducer;
