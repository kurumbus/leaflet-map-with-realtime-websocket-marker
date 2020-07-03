
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
        id_client: 1,
        animate: false,
        latlng: {
            lat:  49.4185533,
            lng:  8.67689,
        },
        markers: [],
        colors: [
            '#EA0029',
            '#ffe60a',
            '#ff7b0a',
            '#0a95ff',
            '#d6382d',
            '#73bc00',
            '#7284a1',
            '#0abdff',
            '#5c606a',
            '#8d8f95',
            '#7d0aff',
        ]
    };

    componentDidMount() {
        axios.get('/api/markers').then(res => this.setState({markers: res.data}));

        window.Echo.channel('marker-location-'+this.state.id_client)
            .listen('.marker-location-changed-event', (marker) => {
                console.log(marker);
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

    _getFeatureStyle(feature) {
        if (feature.properties.tags.buildingpart && feature.properties.tags.buildingpart == 'corridor' ) {
            return {color: '#ffff'}
        }

        const index = parseInt(feature.id.substr(-1))
        return {color:  this.state.colors[index]}
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
                             style={feature => this._getFeatureStyle(feature)}
                    />
                    <GeoJSON key='geo2'
                             data={{
                                 "type": "Feature",
                                 "properties": {"party": "Democrat"},
                                 "geometry": {
                                     "type": "Polygon",
                                     "coordinates": [[
                                         [-109.05, 41.00],
                                         [-102.06, 40.99],
                                         [-102.03, 36.99],
                                         [-109.04, 36.99],
                                         [-109.05, 41.00]
                                     ]]
                                 }
                             }}

                             style={
                                 function(feature) {
                                     switch (feature.properties.party) {
                                         case 'Democrat': return {color: "#ff0000"};
                                         case 'Republican':   return {color: "#0000ff"};
                                         default:   return {color: "#00ff35"};
                                     }
                                 }
                             }
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
