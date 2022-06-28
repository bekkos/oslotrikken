import { Component } from "react";
import Search from "./Search";
import createEnturService from '@entur/sdk'
import Departure from "./Departure";

class Container extends Component {
    constructor(props) {
        super(props);

        this.handler = this.handler.bind(this);

        this.state = {
            searched: false
        }
    }


    handler() {
        this.setState({searched: true});
    }

    componentDidMount = () => {
        this.getDepartures("NSR:StopPlace:58259");

        let timerID = setInterval(() => this.updateTable(), 1000);

    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    updateTable = () => {
        let currentTime = new Date();
        let difference = Date.parse(this.state.departures[0]['expectedDepartureTime']) - currentTime.getTime();
        console.log(difference);
        if(difference < 0) {
            console.log("Prompted re-render.")
            this.getDepartures();
        }

        console.log("Re-rendered!")
    }
    


    getDepartures = (sID) => {
        const service = createEnturService({
            clientName: 'bekkos.tech-oslotrikken'
        })
        service.getDeparturesFromStopPlace('NSR:StopPlace:58259', {
            limit: 10
        }).then((departures) => {
            this.setState({
                departures: departures
            })
            console.log(departures)
        })
    }


    render() {

        if(!this.state.searched) {
            return(
                <div className="container-fluid d-flex justify-content-center align-items-center flex-container mt-5">
                    <Search handler={this.handler} />
                </div>
            );

        } else {
            return(
                <div className="col-12 d-flex justify-content-center align-items-center flex-row flex-wrap mt-5">
                    {
                        this.state.departures.map((departure) => {
                            let timeToDisplay = new Date(departure['expectedDepartureTime']).toLocaleTimeString();
                            return <Departure key={Math.random() * 1000000} title={departure['destinationDisplay']['frontText']} 
                            timeToDisplay={timeToDisplay} 
                            timeString={departure['expectedDepartureTime']} />
                        })
                    }
                </div>
            );
        }   
    }
}


export default Container;