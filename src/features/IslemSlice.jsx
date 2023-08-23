import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import islemservice from "./IslemService";

const initialState = {
  islemler:[],
  aylar: [],
  yillar: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const aylargetir = createAsyncThunk("islem/aylargetir",async(_,thunkAPI)=>{
    try {
        return await islemservice.aylargetir()
    } catch (error) {
        const message = error.message
       return thunkAPI.rejectWithValue(message)
    }
})

export const yillargetir = createAsyncThunk("islem/yillargetir",async(_,thunkAPI)=>{
  try {
    return await islemservice.yillargetir()
  } catch (error) {
    const message = error.message
   return thunkAPI.rejectWithValue(message)
  }
})

export const islemgetir=createAsyncThunk("islem/islemgetir",async(veri,thunkAPI)=>{
  try {
    return await islemservice.islemgetir(veri)
  } catch (error) {
    const message = error.message
    console.log(message);
    return thunkAPI.rejectWithValue(message)
  }
})
export const son10islemgetir=createAsyncThunk("islem/son10islemgetir",async(email,thunkAPI)=>{
  try {
    return await islemservice.son10islem(email)
  } catch (error) {
    const message = error.message
    console.log(message);
    return thunkAPI.rejectWithValue(message)
  }
})
export const islemslice = createSlice({
  name: "islemslice",
  initialState,
  reducers: {
    reset: (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(aylargetir.pending,(state)=>{
        state.isLoading=true
    })
    .addCase(aylargetir.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.isError=false
        state.aylar=action.payload
    })
    .addCase(aylargetir.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.isSuccess=false
        state.message=action.payload
        state.aylar=[]
    })
    //!YILLAR
    .addCase(yillargetir.pending,(state)=>{
      state.isLoading=true
  })
  .addCase(yillargetir.fulfilled,(state,action)=>{
      state.isLoading=false
      state.isSuccess=true
      state.yillar=action.payload
  })
  .addCase(yillargetir.rejected,(state,action)=>{
      state.isLoading=false
      state.isError=true
      state.message=action.payload
      state.yillar=[]
  })
  //! SON 10 İŞLEM
 
  .addCase(son10islemgetir.pending,(state)=>{
    state.isLoading=true
})
.addCase(son10islemgetir.fulfilled,(state,action)=>{
    state.isLoading=false
    state.isSuccess=true
    state.islemler=action.payload
})
.addCase(son10islemgetir.rejected, (state, action) => {
  state.isLoading = false;
  state.isSuccess = false;
  state.isError = true;
  state.message = action.payload;
})
 //! işlem
.addCase(islemgetir.pending,(state)=>{
  state.isLoading=true
})
.addCase(islemgetir.fulfilled,(state,action)=>{
  state.isLoading=false
  state.isSuccess=true
  state.isError = false
  state.islemler.unshift(action.payload)
})
.addCase(islemgetir.rejected,(state,action)=>{
  state.isLoading=false
  state.isError=true
  state.message=action.payload
  state.islemler=[]
})
  },
});

export const { reset } = islemslice.actions;
export default islemslice.reducer;
