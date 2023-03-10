import React, {useState} from "react";
import {useAppDispatch} from "../redux/useAppHooks";

type PizzaBlockProps={
    title:string,
    price:number,
    sizes:number[],
    imageUrl:string,
    types:number[],
    id:number
}

const PizzaBlock:React.FC<PizzaBlockProps>=({title,price,sizes,imageUrl,types,id})=>{
    const typesPizzas=['тонкая','традиционная']
    const [activeSize,setActiveSize]=useState(0)
    const [activeType,setActiveType]=useState(0)
    const [count,setCount]=useState(0)
    const {addItem} = useAppDispatch()
    const onAddCart=()=>{
        addItem({title,id,price,size:sizes[activeSize],imageUrl,type:typesPizzas[activeType]})
        setCount(count+1)
    }

    const onActivateSize=(index:number)=>{
        setActiveSize(index)
    }
    const onActivateType=(index:number,type:number)=>{
        setActiveType(index)
        console.log(type)
    }
    return(
        <div className='pizza_wrapper'>
            <div className="pizza-block">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                />
                <h4 className="pizza-block__title">{title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {
                            types.map((type,index)=>
                                <li  key={index} className={activeType===index ? 'active' : ''} onClick={()=>onActivateType(index,type)}>{typesPizzas[type]}</li>
                            )
                        }

                    </ul>
                    <ul>
                        {
                            sizes.map((size,index)=>
                                <li key={index} className={activeSize===index ? 'active':''} onClick={()=>onActivateSize(index)}>{size}</li>
                            )
                        }
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <div className="button button--outline button--add" onClick={onAddCart}>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {count>0 && <i>{count}</i>}
                    </div>
                </div>
            </div>
        </div>

    )
}
export default PizzaBlock;