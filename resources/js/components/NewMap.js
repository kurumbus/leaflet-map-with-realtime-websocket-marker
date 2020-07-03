
import React, { Component } from 'react'
import {GeoJSON,
    Map,
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
        markers: [],
    };

    componentDidMount() {
        axios.get('/api/markers').then(res => this.setState({markers: res.data}));

        window.Echo.channel('marker-location')
            .listen('.marker-location-changed-event', (marker) => {
                this.setState({
                    markers: this.state.markers.filter(i => i.id !== marker.id).concat(marker)
                });
            });
    }

    testMoving() {
        const {lat, lng} = this.state.latlng;
        axios.post('/test', {lat,lng}).then(res => console.log(res));
    }

    _getIcon(marker) {
        const customMarker = L.icon({ iconUrl: require('../../icons/truck.svg'), });
        const truckGreen = L.icon({ iconUrl: require('../../icons/truck_green.svg'), });
        const truckYellow = L.icon({ iconUrl: require('../../icons/truck_yellow.svg'), });
        const truckRed = L.icon({ iconUrl: require('../../icons/truck_red.svg'), });

        switch (marker.battery) {
            case 0: return truckGreen;
            case 1: return truckYellow;
            case 2: return truckRed;
            default: return  customMarker;
        }
    }

    render() {

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
                    {
                        this.state.markers.map(marker =>
                            <DriftMarker
                                key={marker.id}
                                position={marker.position}
                                duration={1000}
                                icon={this._getIcon(marker)} >
                                <Tooltip>{marker.info}</Tooltip>
                            </DriftMarker>
                        )
                    }

                    <ScaleControl/>
                </Map>
            </div>
        )
    }
}
