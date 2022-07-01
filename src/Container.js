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


    handler(stopId) {
        this.getDepartures(stopId);
        // NSR:StopPlace:58259
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    updateTable = () => {
        let currentTime = new Date();
        let difference = Date.parse(this.state.departures[0]['expectedDepartureTime']) - currentTime.getTime();
        if(difference < 0) {
            this.getDepartures(this.state.stopId);
        }

    }
    
    getDepartures = (stopId) => {
        const service = createEnturService({
            clientName: 'bekkos.tech-oslotrikken'
        })
        service.getDeparturesFromStopPlace(stopId, {
            limit: 10
        }).then((departures) => {
            this.setState({
                departures: departures,
                searched: true,
                stopId: stopId
            })
            let timerID = setInterval(() => this.updateTable(), 1000);
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
            console.log(this.state.departures);
            return(
                <>
                    <div className="container-fluid d-flex justify-content-center align-items-center flex-container mt-5">
                        <Search handler={this.handler} />
                    </div>
                    <div className="col-12 d-flex justify-content-center align-items-center flex-row flex-wrap mt-5 mb-5">
                        {
                            this.state.departures.map((departure) => {
                                let timeToDisplay = new Date(departure['expectedDepartureTime']).toLocaleTimeString();
                                return <Departure key={Math.random() * 1000000} title={departure['destinationDisplay']['frontText']}
                                publicCode={departure['serviceJourney']['journeyPattern']['line']['publicCode']}
                                transportType={departure['serviceJourney']['journeyPattern']['line']['transportSubmode']}
                                timeToDisplay={timeToDisplay} 
                                timeString={departure['expectedDepartureTime']} />
                            })
                        }
                        <div className="mt-5 mb-5"></div>
                    </div>
                </>
            );
        }   
    }
}


export default Container;