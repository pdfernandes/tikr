import React from "react";
import * as StocksAPIUtil from "../../util/stocks_api_util";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import CustomTooltip from "./tooltip_content";
import Odometer from "react-odometerjs";

class DashboardRefactor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    //get all transactions 
    //get all companies
    //for each company get historic prices for each company for the given time frame
    //create an array of dates from time ago to time now
    


}