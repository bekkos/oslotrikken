import { Component } from "react";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    autoComplete = () => {
        
    }

    render() {
        return(
            <div className="col-md-3 d-flex flex-row justify-content-center align-items-center flex-wrap">
                <input type="text" className="form-control m-2 text-center " placeholder="Søk etter trikk / trikkestopp" />
                <button className="btn btn-secondary" onClick={this.props.handler}>Søk</button>
            </div>
            );
    }
}

export default Search;