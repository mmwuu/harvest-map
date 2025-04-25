import React, {useState} from 'react';
import { createRoot } from 'react-dom/client';
import {APIProvider, Map, AdvancedMarker,
    MapCameraChangedEvent,
    Pin} from '@vis.gl/react-google-maps';

type Poi ={ key: string, location: google.maps.LatLngLiteral }
const locations: Poi[] = [
    { key: 'Yarra Valley', location: { lat: -37.6536, lng: 145.5182 }},
    { key: 'Mornington Peninsula', location: { lat: -38.3482, lng: 145.0197 }},
    { key: 'Dandenong Ranges',  location: {lat: -37.8555, lng: 145.3534 }},
    { key: 'Macedon Ranges', location: { lat: -37.3917, lng: 144.5803 }},
    { key: 'Phillip Island',  location: {lat: -38.4848, lng: 145.2373 }},
    { key: 'Bellarine Peninsula', location: { lat: -38.2672, lng: 144.6620 }},
    { key: 'Daylesford / Hepburn', location: { lat: -37.3430, lng: 144.1420 }},
    { key: 'Gippsland', location: { lat: -38.6180, lng: 146.0005 }},
    { key: 'Warburton & Upper Yarra', location: { lat: -37.7530, lng: 145.6892 }},
];

const PoiMarkers = ({ pois }: { pois: Poi[] }) => (
    <>
        {pois.map((poi) => (
            <AdvancedMarker key={poi.key} position={poi.location}>
                <Pin background={'"#FBBC04"'} glyphColor={'#000'} borderColor={'#000'} />
            </AdvancedMarker>
        ))}
    </>
);

const App = () => {
    const [selectedKey, setSelectedKey] = useState('Yarra Valley');
    const [center, setCenter] = useState(locations[0].location);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newKey = e.target.value;
        setSelectedKey(newKey);

        for (let i = 0; i < locations.length; i++) {
            if (locations[i].key === newKey) {
                setCenter(locations[i].location);
                break;
            }
        }
    };

    return (
        <APIProvider apiKey={'AIzaSyB3g1sYu3KcRGPC2FJvhOszWGqto_6x6rY'}>
            <select onChange={handleChange} value={selectedKey} style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
                {locations.map(loc => (
                    <option key={loc.key} value={loc.key}>{loc.key}</option>
                ))}
                </select>

                <Map
                    mapId='DEMO_MAP_ID'
                    zoom={10}
                    center={center}
                    onCameraChanged={(ev: MapCameraChangedEvent) =>
                        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                    }>
                    <PoiMarkers pois={locations} />
                </Map>

        </APIProvider>
    );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
export default App;