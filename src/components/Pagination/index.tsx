import React from "react";
import styles from './Pagination.module.scss'
import ReactPaginate from "react-paginate";
import {isNumberObject} from "util/types";

type PaginationProps={
    value:number;
    onChangePage:(page:number)=>void
}

const Pagination:React.FC<PaginationProps>=({value,onChangePage})=>{
    return (
        <ReactPaginate
            breakLabel="..."
            className={styles.root}
            nextLabel=">"
            onPageChange={event=>onChangePage(event.selected+1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            forcePage={value-1}
        />
    )
}
export default Pagination