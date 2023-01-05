import {createSlice} from "@reduxjs/toolkit";

interface FilterSliceState{
    searchTerm:string,
    categoryId:number,
    sortType:"rate" | "price" | "title",
    currentPage:number
}

const initialState:FilterSliceState={
    searchTerm:'',
    categoryId:0,
    sortType:'rate',
    currentPage:1,
}

const filterSlice=createSlice({
    name:'filter',
    initialState,
    reducers:{
        setCategoryId(state,action){
            state.categoryId=action.payload;
        },
        setTypeSort(state,action){
            state.sortType=action.payload;

        },
        setCurrentPage(state,action){
            state.currentPage=action.payload
        },
        setSearchTerm(state,action){
            state.searchTerm=action.payload
        },

        setFilters(state,action){
            state.categoryId=Number(action.payload.categoryId) ;
            state.sortType=action.payload.sortType;
            state.currentPage=Number(action.payload.currentPage)
        }
    }
})
export const filterActions = filterSlice.actions
export default filterSlice.reducer