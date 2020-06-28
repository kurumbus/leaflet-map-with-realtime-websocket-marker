
import React, { Component } from 'react'
import {
    Circle,
    CircleMarker,
    Map,
    Marker,
    Polygon,
    Polyline,
    Popup,
    Rectangle,
    ScaleControl,
    TileLayer
} from 'react-leaflet'
Pusher.logToConsole = true;

export default class NewMap extends Component {
    state = {
        animate: false,
        latlng: {
            lat: 51.505,
            lng: -0.09,
        },
        marker: {
            lat: 51.505000,
            lng: -0.090000,
        }
    };

    componentDidMount() {
        window.Echo.channel('my-channel')
            .listen('.my-event', (e) => {

                let {lat, lng} = this.state.marker;
                lat += 0.00001;
                lng += 0.00001;
                this.setState({marker: {lat, lng}})
                console.log(this.state.marker);
            });
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <Map
                    center={this.state.latlng}
                    length={4}
                    zoom={20}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maxNativeZoom={19}
                        maxZoom={25}
                    />
                    <Marker position={this.state.marker}>
                        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                    </Marker>
                    <ScaleControl/>
                </Map>
            </div>
        )
    }
}
