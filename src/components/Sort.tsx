import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../redux/useAppHooks";

interface TranslateOptions{
    [key:string]:string;
}

export default function Sort(){
    const [openSort,setOpenSort]=useState(false)
    const sortType=useAppSelector(state => state.filter.sortType)
    const {setTypeSort} = useAppDispatch()
    const sortRef=useRef<HTMLDivElement>(null)
    const sort_list:string[]=['rate','price','title']
    const sort_translate:TranslateOptions={
        rate:'популярности',
        price:'цене',
        title:'алфавиту'
    }

    useEffect(()=>{
        const HandleClick=(e:MouseEvent)=>{
            const _event=e as MouseEvent & {
                path:Node[],
            }
            if(sortRef.current && !_event.path.includes(sortRef.current)){
                setOpenSort(false)
            }
        }
        document.body.addEventListener('click', HandleClick)
        return ()=>document.removeEventListener('click',HandleClick)
    },[])
    const selectedSort=(item:string)=>{
        setTypeSort(item)
        setOpenSort(false)
    }
    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    className={!openSort ? 'rotate_sort':''}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={()=>setOpenSort(!openSort)}>{sort_translate[sortType]}</span>
            </div>
            {openSort && (
                <div className="sort__popup">
                <ul>
                    {sort_list.map((item:string,i:number)=>(
                        <li key={i} className={sortType===item ? 'active' : ''} onClick={()=>selectedSort(item)}>{sort_translate[item]}</li>
                    ))}
                </ul>
            </div>)}

        </div>
    )
}
