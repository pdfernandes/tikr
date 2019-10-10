import React from "react";
// import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';


const CustomTooltip = ({ active, payload }) => {
    
    if (active && payload[0] !== undefined) {
        
        const date = new Date(payload[0].payload.date)
        let time = date.toLocaleTimeString('en-US')

        return (
        <>
            <div className="tooltip-content">
                {time}
            </div>
        
        </>
        )

    } else {
        return null;
    }
    
}


export default CustomTooltip;