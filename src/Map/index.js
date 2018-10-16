import DisplayModal from './DisplayModal';
import React, { Component } from 'react';
import ToolModal from './ToolModal';
import mapboxgl from 'mapbox-gl';
//import 'mapbox-gl/dist/mapbox-gl.css';


class Map extends Component {
    render() {
        return (
            <div>
                <div id='map'></div>
                <DisplayModal />
                <ToolModal />
            </div>
        );
    }
    componentDidMount() {
        mapboxgl.accessToken = 'pk.eyJ1IjoibG9uZ2giLCJhIjoiY2psem92M2JkMDN4bDNsbXlhZ2Z6ZzhoZiJ9.qEtkhzP-UwuKVkV5suN7sg';
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/longh/cjms2zdmpa7g52smzgtobl908',
            center: [-95.7, 39],
            minZoom: 3.75,
            zoom: 3.75,
            interactive: false
        });
        map.on('load', function () {
            map.addSource('stateSource', {
                type: 'vector',
                url: 'mapbox://longh.0mfgysin'
            });
            map.addLayer({
                'id': 'stateBorders',
                'type': 'line',
                'source': 'stateSource',
                'source-layer': 'usstates',
                'layout': {},
                'paint': {
                    'line-color': '#ffffff',
                    'line-width': 2.0
                },
                'minzoom': 3.5,
                'maxzoom': 5.5
            });
        });
    }
}

export default Map;

//
var map;

/*function fly() {
    map.flyTo({center: [-89.36, 44.87], zoom: 6});
}

function resetZoom() {
    map.flyTo({center: [-95.7, 39], zoom: 3.75});
}*/


//loadMap();
//