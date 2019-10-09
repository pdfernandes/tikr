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

// const { PropTypes } = React;
// const CustomTooltip = React.createClass({
//     propTypes: {
//         type: PropTypes.string,
//         payload: PropTypes.array,
//         label: PropTypes.string,
//     },
//     render() {
//         const { active } = this.props;
        
//         if (active) {
//             const { payload, label } = this.props;
//             debugger
//             return (
//                 <div className="custom-tooltip">
//                   {payload}
//                 </div>
//             );
//         }
        
//         return null;
//     }
// });
export default CustomTooltip;