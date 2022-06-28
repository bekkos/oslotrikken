import { Component } from "react";

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date()
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    tick() {
        this.setState({
            time: new Date()
        });
    }


    render() {
        return(
            <div>
                <p className={this.props.color + " fw-lighter"}>{this.state.time.toLocaleTimeString()}</p>
            </div>
        );
    }

}


export default Clock;