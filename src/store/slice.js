import { createSlice } from '@reduxjs/toolkit'


export const todoSlice = createSlice({
  name: 'todo',
  initialState: [
    {
      id:1,
      text:"an cut",
      isDone: false
    }
  ],
  reducers: {
    increment: (state) => {
      state+=1
  
      console.log(state)
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})


export const { increment, decrement, incrementByAmount } = todoSlice.actions

export default todoSlice.reducer