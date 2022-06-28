import './Navbar.css';

import { Component } from 'react';
import Clock from './Clock';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    

    render() {
        return(
            <nav className="navbar narvbar-collapse bg-transparent text-white d-flex justify-content-center align-items-center flex-column">
                <h2 className='fw-lighter'>OSLOTRIKKEN</h2>
                <Clock />
            </nav>
        );
    }

}


export default Navbar;
