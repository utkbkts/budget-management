import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Authservice from "./Authservice.jsx";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
//KAYIT İŞLEMİ
export const register=createAsyncThunk('auth/register',async (user,thunkAPI)=>{
    try {
        return await Authservice.register(user.email,user.password,user.displayName)
    } catch (error) {
        const message=error.message
        return thunkAPI.rejectWithValue(message)
    }
})

//GİRİŞ İŞLEMİ

export const login = createAsyncThunk("auth/login",async(user,thunkAPI)=>{
    try {
        return await Authservice.login(user.email,user.password)
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk("auth/logout",async(_,thunkAPI)=>{
  try {
    await Authservice.logout()
  } catch (error) {
    const message = error.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
    //KAYIT
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      //LOGİN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      //logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = AuthSlice.actions;
export default AuthSlice.reducer;
