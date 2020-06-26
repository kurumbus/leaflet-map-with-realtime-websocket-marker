import React from 'react'
import { render } from 'react-dom'
import {Circle, CircleMarker, Map, Marker, Polygon, Polyline, Popup, Rectangle, TileLayer} from 'react-leaflet'

const position = [51.505, -0.09]
const polyline = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
]

const multiPolyline = [
    [
        [51.5, -0.1],
        [51.5, -0.12],
        [51.52, -0.12],
    ],
    [
        [51.5, -0.05],
        [51.5, -0.06],
        [51.52, -0.06],
    ],
]

const polygon = [
    [51.515, -0.09],
    [51.52, -0.1],
    [51.52, -0.12],
]

const multiPolygon = [
    [
        [51.51, -0.12],
        [51.51, -0.13],
        [51.53, -0.13],
    ],
    [
        [51.51, -0.05],
        [51.51, -0.07],
        [51.53, -0.07],
    ],
]

const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
]

const map = (
    <Map center={position} zoom={20}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={position}>
            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        </Marker>
        <Polyline color="lime" positions={polyline} />
        <Polyline color="lime" positions={multiPolyline} />
        <Polygon color="purple" positions={polygon} />
        <Polygon color="purple" positions={multiPolygon} />
        <Rectangle bounds={rectangle} color="black" />
    </Map>
)

render(map, document.getElementById('map-container'));
