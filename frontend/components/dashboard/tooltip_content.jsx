import React from "react";
// import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';


const CustomTooltip = ({ active, payload }) => {
    
    if (payload !== null && (active && payload[0] !== undefined)) {
      let date = Date.parse(payload[0].payload.date);
      let newDate = new Date(date);
      let time = newDate.toLocaleString("en-US");

      return (
        <>
          <div className="tooltip-content">{time}</div>
        </>
      );
    } else {
      return null;
    }
    
}

export default CustomTooltip;