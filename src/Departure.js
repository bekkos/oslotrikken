import { Component } from "react";

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
        currentTime.setHours(currentTime.getHours() + 1)
        let difference = Date.parse(s) - currentTime.getTime();
        if(difference < 0) {
            this.setState({difference: null})
        }
        this.setState({difference: new Date(difference).toLocaleTimeString()})
    }


    render() {
        let displayDiff;
        if(this.state.difference.getTime < 0) {
            displayDiff = "NÅ";
        } else {
            displayDiff = this.state.difference;
        }
        return(
            <div className="col-md-6 bg-dark border-light text-white d-flex justify-content-center align-items-center flex-column">
                <h1 className="fw-lighter">{this.props.title || "12 MAJORSTUEN"}</h1>
                <h3 className="fw-lighter">{this.props.timeToDisplay || "20:33"}</h3>
                <p>{displayDiff}</p>
            </div>
        );
    }
}

export default Departure;