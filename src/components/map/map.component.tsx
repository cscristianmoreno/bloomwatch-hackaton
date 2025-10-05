import { MapContainer, TileLayer, GeoJSON, Marker, Popup, Polygon, Tooltip } from "react-leaflet";
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
import type { InfoTypestruct } from "../../types/info.type";
import InfoComponent from "../info/info.component";
import PopupComponent from "../popup/popup.component";

type LatLng = [number, number];
type Polygon = LatLng[];

const MapComponent: FC = (): ReactElement => {

    const { sites } = useFind();
    const [loading, setLoading] = useState<boolean>(false);

    const [info, setInfo] = useState<InfoTypestruct>({
        polygons: [],
        band: "",
        date: "",
        siteSelected: -1,
        km: 1
    });

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
                                <Tooltip permanent>{site.sitename}</Tooltip>
                                <PopupComponent loading={loading} setLoading={setLoading} site={site} index={index} setInfo={setInfo}/>
                            </Marker>
                        );
                    })
                }
                </MarkerClusterGroup>
                {
                    info.polygons
                    .map((cell, index: number): ReactElement => {
                        return <Polygon key={index} positions={cell.position} pathOptions={{
                            fillColor: (cell.data !== null) ? getColor(cell.data[info.date]) : "black",
                            color: "#000",
                            weight: 1,
                            fillOpacity: 0.6
                        }}/>
                    })
                }
            </MapContainer>
            <InfoComponent band={info.band} site={sites?.sites[info.siteSelected]}/>
        </>
    );
};

export default MapComponent;