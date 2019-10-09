import React from "react";
// import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';


const CustomTooltip = ({ active, payload }) => {
    
    if (active) {
        return (
            <>
        <div className="content">
            {payload[0].payload.date}
        </div>
        <div>
            {payload[0].payload.value}
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