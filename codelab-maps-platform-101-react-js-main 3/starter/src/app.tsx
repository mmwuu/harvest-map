import React, {useState,useMemo} from 'react';
import { createRoot } from 'react-dom/client';
import {APIProvider, Map, AdvancedMarker,
    MapCameraChangedEvent,
    Pin} from '@vis.gl/react-google-maps';

type Poi ={ key: string, location: google.maps.LatLngLiteral }
const locations: Poi[] = [
    { "key": "Mornington Peninsula", "location": { "lat": -38.3482, "lng": 145.0197 } },
    { "key": "Dandenong Ranges", "location": { "lat": -37.8555, "lng": 145.3534 } },
    { "key": "Macedon Ranges", "location": { "lat": -37.3917, "lng": 144.5803 } },
    { "key": "Phillip Island", "location": { "lat": -38.4848, "lng": 145.2373 } },
    { "key": "Bellarine Peninsula", "location": { "lat": -38.2672, "lng": 144.6620 } },
    { "key": "Daylesford / Hepburn", "location": { "lat": -37.3430, "lng": 144.1420 } },
    { "key": "Gippsland", "location": { "lat": -38.6180, "lng": 146.0005 } },
    { "key": "Warburton & Upper Yarra", "location": { "lat": -37.7530, "lng": 145.6892 } },
    { "key": "Mornington Peninsula", "location": { "lat": -38.3753, "lng": 145.0132 } },
    { "key": "Yarra Valley", "location": { "lat": -37.6536, "lng": 145.5182 } },
    { "key": "Dandenong Ranges", "location": { "lat": -37.8702, "lng": 145.3601 } },
    { "key": "Macedon Ranges", "location": { "lat": -37.3900, "lng": 144.5829 } },
    { "key": "Gippsland", "location": { "lat": -38.6000, "lng": 146.0500 } },
    { "key": "Bellarine Peninsula", "location": { "lat": -38.2655, "lng": 144.6711 } },
    { "key": "Daylesford / Hepburn", "location": { "lat": -37.3400, "lng": 144.1450 } },
];

const PoiMarkers = ({ pois }: { pois: Poi[] }) => (
    <>
        {pois.map((poi) => (
            <AdvancedMarker key={poi.key} position={poi.location}>
                <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
            </AdvancedMarker>
        ))}
    </>
);

const App = () => {
    const [selectedKey, setSelectedKey] = useState<string | null>('Yarra Valley');
    const [center, setCenter] = useState(locations[0].location);

    // Filter locations based on the selected key
    const filteredLocations = useMemo(() => {
        if (!selectedKey) {
            return locations; // Show all if no key is selected (optional)
        }
        return locations.filter((loc) => loc.key === selectedKey);
    }, [selectedKey]);

    // Update the center when the selected key changes and there are filtered locations
    useMemo(() => {
        if (filteredLocations.length > 0) {
            setCenter(filteredLocations[0].location);
        } else if (locations.length > 0) {
            setCenter(locations[0].location); // Fallback if no matching locations
        }
    }, [filteredLocations, locations]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newKey = e.target.value;
        setSelectedKey(newKey);
    };

    // Get unique keys for the dropdown options
    const uniqueKeys = useMemo(() => {
        const keys: string[] = [];
        for (const loc of locations) {
            let found = false;
            for (const key of keys) {
                if (loc.key === key) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                keys.push(loc.key);
            }
        }
        return keys;
    }, [locations]);

    return (
        <APIProvider apiKey={'AIzaSyB3g1sYu3KcRGPC2FJvhOszWGqto_6x6rY'}>
            <select
                onChange={handleChange}
                value={selectedKey || ''}
                style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}
            >
                <option value="">All Areas</option> {/* Option to show all markers */}
                {uniqueKeys.map((key) => (
                    <option key={key} value={key}>
                        {key}
                    </option>
                ))}
            </select>

                <Map
                    mapId='DEMO_MAP_ID'
                    zoom={13}
                    center={center}
                    onCameraChanged={(ev: MapCameraChangedEvent) =>
                        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                    }>
                    <PoiMarkers pois={filteredLocations} />
                </Map>

        </APIProvider>
    );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
export default App;