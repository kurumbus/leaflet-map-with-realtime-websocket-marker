
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
        window.Echo.channel('marker-location')
            .listen('.marker-location-changed-event', (e) => {
                console.log(e);
                const {lat, lng} = e;
                this.setState({marker: {lat, lng}})
            });
    }

    testMoving() {
        const {lat, lng} = this.state.marker;
        console.log(lat, lng);
        axios.post('/test', {lat,lng}).then(res => {
            console.log(res);
        });
    }

    render() {
        const customMarker = L.icon({ iconUrl: require('../../icons/truck.svg'), });


        return (
            <div style={{ textAlign: 'center' }}>
                <a href="#" onClick={() => this.testMoving()}>Test Moving</a>
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
                    <Marker position={this.state.marker}  icon={customMarker} >
                        <Popup>Realtime truck location</Popup>
                    </Marker>
                    <ScaleControl/>
                </Map>
            </div>
        )
    }
}
