import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {Pizza} from "../../pages/Home";
import Pagination from "../../components/Pagination";
interface PizzaRequest{
    currentPage:number,
    sortType:string,
    categoryId:number,
    searchTerm:string

}

interface PizzaSliceState {
    items:Pizza[],
    status:"loading"|"success"|"error";
}

const initialState:PizzaSliceState={
    items:[],
    status:'loading'
}
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzaStatus', async (params:PizzaRequest) => {
    const {currentPage,sortType,categoryId,searchTerm}=params;
    const {data}=await axios.get<Pizza[]>(`https://631a22f0dc236c0b1ed7cfbb.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortType}&order=asc${categoryId ? '&category='+categoryId : ''}${searchTerm ? '&search='+searchTerm : ''}`)
    return data
    }
)

const pizzaSlice=createSlice({
    name:'pizza',
    initialState,
    reducers:{
        setPizzaItems(state,action:PayloadAction<Pizza[]>){
            state.items=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchPizzas.pending,(state)=>{
            state.status='loading'
            state.items=[]
        })
        builder.addCase(fetchPizzas.fulfilled,(state,action)=>{
            state.items=action.payload
            state.status='success'
        })
        builder.addCase(fetchPizzas.rejected,(state)=>{
            state.items=[]
            state.status='error'
        })
    }
})
export const pizzaActions = pizzaSlice.actions

export default pizzaSlice.reducer