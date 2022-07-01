import { Component } from "react";
import $ from "jquery";
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: {
                features: []
            }
        }
    }


    autoComplete = () => {
        let input = document.getElementById("input").value;
        if(input.length < 1) {
            this.setState({
                suggestions: {
                    features: []
                }
            })
            return;
        }
        $.get("https://api.entur.io/geocoder/v1/autocomplete?text=" + input + "&lang=en", (data) => {
            this.setState({
                suggestions: data
            })
        })
    }


    search = (stopId, name) => {
        this.setState({
            suggestions: {
                features: []
            }
        })
        $("#input").val(name);
        this.props.handler(stopId);
    }

    render() {
        return(
            <div className="col-md-3 d-flex flex-column justify-content-center align-items-center flex-wrap position-relative">
                <input id="input" type="text" className="form-control text-center" autoComplete="off" onChange={this.autoComplete} placeholder="Søk etter stoppested" />
                <div className="suggestion-container col-md-12">
                    {
                        this.state.suggestions['features'].map((suggestion) => {
                            if(suggestion['properties']['county'] == "Oslo" && 
                              (suggestion['properties']['category'].includes("onstreetTram") || 
                               suggestion['properties']['category'].includes("onstreetBus"))) {
                                return(
                                    <div className="suggestion col-12" key={suggestion['properties']['id']} onClick={() => {this.search(suggestion['properties']['id'], suggestion['properties']['name'])}}>
                                        <p className="p-2">{suggestion['properties']['name']}</p>
                                    </div>
                                )  
                            }          
                        })
                    }    
                </div>
            </div>
            );
    }
}

export default Search;