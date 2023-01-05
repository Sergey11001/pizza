import React from "react";

type CategoryProps={
    categoryId:number,
    setActiveIndex:(i:number)=>void
}

const Categories:React.FC<CategoryProps>=({categoryId,setActiveIndex})=>{
    const categories=[
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]
    const onClickActive=(index:number)=>{
        setActiveIndex(index)
    }

    return (
        <div className="categories">
            <ul>
                {categories.map((item,index)=>
                     <li key={index}  className={categoryId===index ? "active" : ''} onClick={()=>onClickActive(index)} >{item}</li>
                )}
            </ul>
        </div>
    )
}
export default Categories