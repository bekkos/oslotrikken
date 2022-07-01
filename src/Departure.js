import { Component } from "react";
import "./Departure.css";

class Departure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difference: "00:00:00"
        }
    }

    componentDidMount() {
        let timerID = setInterval(
            () => this.updateDifference(this.props.timeString),
            1000
            );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updateDifference = (s) => {
        let currentTime = new Date();
        currentTime.setHours(currentTime.getHours())
        let difference = Date.parse(s) - currentTime.getTime();
        if(difference < 0) {
            this.setState({difference: null})
        }
        this.setState({difference: difference})
    }


    render() {
        let displayDiff = "";
        if(this.state.difference <= 0) {
            displayDiff = "NÅ";
        }  else {
            let date = new Date(this.state.difference);
            date.setHours(date.getHours() - 1);
            displayDiff = date.toLocaleTimeString();
        }
        
        if(this.props.transportType == "localBus") {
            return(
                <div className="col-md-6 bg-dark border-light text-white d-flex justify-content-center align-items-center flex-column a-fadeIn">
                    <div className="d-flex justify-content-center align-items-center flex-row flex-nowrap">
                        <h1 className="fw-lighter">{this.props.publicCode + " " + this.props.title || "12 MAJORSTUEN"}</h1>
                        <img src="./img/bus.png" className="img-fluid m-2" style={{filter: "invert()"}} width="5%" />
                    </div>
                    <h3 className="fw-lighter">{this.props.timeToDisplay || "20:33"}</h3>
                    <p>{displayDiff}</p>
                </div>
            );
        } else {
            return(
                <div className="col-md-6 bg-dark border-light text-white d-flex justify-content-center align-items-center flex-column a-fadeIn">
                    <div className="d-flex justify-content-center align-items-center flex-row flex-nowrap">
                        <h1 className="fw-lighter">{this.props.publicCode + " " + this.props.title || "12 MAJORSTUEN"}</h1>
                        <img src="./img/tram.png" className="img-fluid m-2" style={{filter: "invert()"}} width="5%"/>
                    </div>
                    <h3 className="fw-lighter">{this.props.timeToDisplay || "20:33"}</h3>
                    <p>{displayDiff}</p>
                </div>
            );
        }
        
    }
}

export default Departure;