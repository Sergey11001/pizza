import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <div className='skeleton_wrapper'>
        <ContentLoader
            className='pizza-skeleton'
            speed={2}
            width={280}
            height={460}
            viewBox="0 0 280 480"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="127" cy="127" r="121" />
            <rect x="0" y="265" rx="0" ry="0" width="280" height="28" />
            <rect x="0" y="315" rx="0" ry="0" width="280" height="84" />
            <rect x="0" y="430" rx="0" ry="0" width="90" height="30" />
            <rect x="130" y="435" rx="25" ry="25" width="150" height="45" />
        </ContentLoader>
    </div>

)

export default Skeleton