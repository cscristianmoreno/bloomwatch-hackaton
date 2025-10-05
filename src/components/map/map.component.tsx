import { MapContainer, TileLayer, GeoJSON, Marker, Popup, Polygon } from "react-leaflet";
import { useEffect, useRef, useState, type FC, type ReactElement } from "react";

import "leaflet/dist/leaflet.css";
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css'

import type { SiteTypeStruct } from "../../types/sites.type";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useFind } from "../../hooks/use-find.hook";
import type { SubsetTypeStruct } from "../../types/subset.type";
import { Box, Button, Divider, Slider, Typography } from "@mui/joy";
import PopupTitleComponent from "../popup-title/popup-title.component";
import SliderComponent from "../sliders/slider.component";
import { generateRasterPolygonsCentered, getColor } from "../../utils/cell.util";

type LatLng = [number, number];
type Polygon = LatLng[];

const MapComponent: FC = (): ReactElement => {

    const { sites, getSubset } = useFind();
    const [polygons, setPolygons] = useState([]);

    const [date, setDate] = useState({
        year: 2016,
        day: 113
    });

    const onFindSubset = async (lat: number, lon: number): Promise<void> => {
        const result: SubsetTypeStruct = await getSubset(lat, lon, date);
        const latlongs = generateRasterPolygonsCentered(result);
        console.log(latlongs);
        setPolygons(latlongs);
    };

    useEffect((): void => {
    }, [polygons]);

    return (
        <>
            {/* <TimeLineComponent
                onFind={onFindSubset}
             /> */}
            <MapContainer
                id="map"
                center={[import.meta.env.VITE_ARG_POSITION_LATITUDE, import.meta.env.VITE_ARG_POSITION_LONGITUDE]}
                zoom={5}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="map-tiles"
                />
                <MarkerClusterGroup showCoverageOnHover={false}>
                {
                    sites && sites.sites.map((site: SiteTypeStruct, index: number): ReactElement => {
                        return (
                            <Marker
                                key={index}
                                position={[site.latitude, site.longitude]}
                            >
                                <Popup>
                                    <Box minWidth={250} display="flex" flexDirection="column" gap={2}>
                                        <PopupTitleComponent title="País" info={site.country}/>
                                        <PopupTitleComponent title="Sitio" info={site.sitename}/>
                                        <PopupTitleComponent title="Red" info={site.network}/>
                                        <PopupTitleComponent title="Estado" info={site.state}/>

                                        <SliderComponent min={2013} max={2025} title="Dato de entrada" date={date} setDate={setDate}/>
                                    </Box>
                                    <Button sx={{ mt: 1 }} size="sm" onClick={(): Promise<void> => onFindSubset(site.latitude, site.longitude)}>Detalles</Button>
                                </Popup>
                            </Marker>
                        );
                    })
                }
                </MarkerClusterGroup>
                {
                    polygons
                    .map((cell, index: number): ReactElement => {
                        return <Polygon key={index} positions={cell.position} pathOptions={{
                            fillColor: (cell.data !== null) ? getColor(cell.data) : "black",
                            color: "#000",
                            weight: 1,
                            fillOpacity: 0.6
                        }}/>
                    })
                }
            </MapContainer>
        </>
    );
};

export default MapComponent;