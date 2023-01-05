import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
type CartItemSlice={
    title:string,id:number,price:number,size:number,imageUrl:string,type:string,count:number
}
interface CartSliceState{
    totalPrice:number,
    items:CartItemSlice[]
}

const initialState:CartSliceState={
    totalPrice:0,
    items:[],
}

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
       addItem(state,action){
           const findItem=state.items.find((obj)=>{
               const {count,...objWithoutCount}=obj;
               return JSON.stringify(objWithoutCount)===JSON.stringify(action.payload)
           })
           if(findItem){
               findItem.count+=1;
           }
           else{
               state.items.push({...action.payload,count:1})
           }
       },
       removeItem(state,action){
           const findItem =state.items.find((obj)=>{
               const {count,...objWithoutCount}=obj;
               return JSON.stringify(objWithoutCount)===JSON.stringify(action.payload)
           })

           if(findItem && findItem.count!==0){
                findItem.count-=1;
           }
           if(findItem && findItem.count===0){
               state.items=state.items.filter(item=>JSON.stringify(item)!==JSON.stringify(findItem))
           }
       },
        deletePizzaItem(state,action){
           state.items=state.items.filter(obj=>JSON.stringify(obj)!==JSON.stringify(action.payload))
        },
       clearItems(state){
           state.items=[]
           state.totalPrice=0
       }
    }
})
export const cartActions = cartSlice.actions

export default cartSlice.reducer