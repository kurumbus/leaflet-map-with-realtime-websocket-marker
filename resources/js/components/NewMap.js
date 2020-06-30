
import React, { Component } from 'react'
import {
    Circle,
    CircleMarker, GeoJSON,
    Map,
    Marker,
    Polygon,
    Polyline,
    Popup,
    Rectangle,
    ScaleControl,
    TileLayer, Tooltip
} from 'react-leaflet'
import { DriftMarker } from "leaflet-drift-marker"
Pusher.logToConsole = true;

export default class NewMap extends Component {
    state = {
        animate: false,
        latlng: {
            lat:  49.4185533,
            lng:  8.67689,
        },
        marker: {
            lat:  49.4185533,
            lng:  8.67689,
        }
    };

    componentDidMount() {
        window.Echo.channel('marker-location')
            .listen('.marker-location-changed-event', (e) => {
               // console.log(e);
                const {lat, lng} = e;
                this.setState({marker: {lat, lng}})
            });
    }

    testMoving() {
        const {lat, lng} = this.state.marker;
        axios.post('/test', {lat,lng}).then(res => {
            console.log(res);
        });
    }

    render() {
        const customMarker = L.icon({ iconUrl: require('../../icons/truck.svg'), });
        const emptyMarker = L.icon({ iconUrl: require('../../icons/empty.svg'), });


        return (
            <div style={{ textAlign: 'center' }}>
                <a href="#" onClick={() => this.testMoving()}>Test Moving</a>
                <Map
                    center={this.state.latlng}
                    length={4}
                    zoom={20}>
                    <GeoJSON key='my-geojson'
                             data={require('../../json/geo.json')}
                             pointToLayer={function(geoJsonPoint, latlng) {
                                 return L.marker(latlng, {icon: emptyMarker});
                             }}
                    />
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maxNativeZoom={19}
                        maxZoom={25}
                    />
{/*                    <Marker position={this.state.marker}  icon={customMarker} >
                        <Popup>Realtime truck location</Popup>
                    </Marker>*/}

                    <DriftMarker
                        // if position changes, marker will drift its way to new position
                        position={this.state.marker}
                        // time in ms that marker will take to reach its destination
                        duration={1000}
                        icon={customMarker} >
                        <Popup>Hi this is a popup</Popup>
                        <Tooltip>Hi here is a tooltip</Tooltip>
                    </DriftMarker>
                    <ScaleControl/>
                </Map>
            </div>
        )
    }
}
