import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {cartActions} from "./slices/cartSlice";
import {filterActions} from "./slices/filterSlice";
import {fetchPizzas, pizzaActions} from "./slices/pizzaSlice";
import type {RootState} from "./store";

const ALL_ACTIONS = {
    ...cartActions,
    ...filterActions,
    ...pizzaActions,
    fetchPizzas,
}

export const useAppDispatch = ()=>{
    const dispatch = useDispatch()
    return bindActionCreators(ALL_ACTIONS,dispatch)
}

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector