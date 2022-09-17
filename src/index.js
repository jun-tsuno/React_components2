import React from "react";
import  {createRoot}  from "react-dom/client";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";




class App extends React.Component {
    state = { lat: null, errorMessage: ''};

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errorMessage: err.message})
        );
    }

    returnContent() {
        if(this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        } else if(!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        } else {
            return <Spinner message="Please accept the location request."/>
        }
    }

    render() {
        return (
            <div className="border red">
                {this.returnContent()}
            </div>
        );
    }
}

const container = document.querySelector('#root')
const root = createRoot(container);
root.render(<App />);