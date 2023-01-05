import React, {useContext, useEffect, useRef, useState} from "react";
import qs from 'qs'
import {useNavigate} from "react-router-dom";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {useAppSelector, useAppDispatch} from "../redux/useAppHooks";
import {fetchPizzas} from "../redux/slices/pizzaSlice";

export interface Pizza{
    title:string,
    id:number,
    price:number,
    sizes:number[],
    imageUrl:string,
    types:number[],
    category:number,
    rating:number
}

interface PizzaRequest{
    currentPage:number,
    sortType:string,
    categoryId:number,
    searchTerm:string
}
export const Home: React.FC = () =>{
    const navigate=useNavigate()
    const {setCategoryId, setCurrentPage, setFilters, fetchPizzas} = useAppDispatch()
    const {categoryId,sortType,currentPage,searchTerm} =useAppSelector(state => state.filter)
    const {items,status}=useAppSelector(state => state.pizza)
    const isSearch=useRef(false)
    const isMount=useRef(false)

    const setActiveIndex=(index:number)=>{
        setCategoryId(index)
    }
    const onChangePage=(number:number)=>{
        setCurrentPage(number)
    }

    const fetchRequest=async (params:PizzaRequest)=>{
        fetchPizzas(params)
    }

    useEffect(()=>{
        if(window.location.search && window.location.search!=='?categoryId=0&sortType=rate&currentPage=1'){
            const params=qs.parse(window.location.search.substring(1))
            setFilters(params)
            isSearch.current=true
        }
    },[])

    useEffect(()=>{
        if(!isSearch.current){
            fetchRequest({currentPage,sortType,categoryId,searchTerm})
        }
        isSearch.current=false
        window.scroll(0,0)
    },[categoryId,sortType,searchTerm,currentPage])

    useEffect(()=>{
        if(isMount.current){
            let navLink=qs.stringify({
                categoryId,
                sortType,
                currentPage
        })
            navigate(`?${navLink}`)
        }
        isMount.current=true

    },[categoryId,sortType,searchTerm,currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} setActiveIndex={setActiveIndex}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    status==='loading' ?
                        [... new Array(4)].map((_,i)=><Skeleton key={i} />)
                        :
                        items.map((item:Pizza)=>
                            <PizzaBlock {...item} key={item.id}/>
                        )
                }
            </div>
            <Pagination value={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}