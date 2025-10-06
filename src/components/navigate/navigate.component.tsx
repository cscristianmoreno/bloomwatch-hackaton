import { LocationOn } from "@mui/icons-material";
import { IconButton } from "@mui/joy";
import type { Map } from "leaflet";
import type { FC, ReactElement } from "react";
import { useMap } from "react-leaflet";

const NavigateComponent: FC<{ pos: number[] }> = ({ pos }): ReactElement => {
    const map = useMap();

    return (
        <IconButton color="primary" onClick={(): Map => map.flyTo([pos[0], pos[1]], 13, {
            duration: 3,
            animate: true,
            noMoveStart: true
        })} 
        sx={{ mt: 1}} size="sm"><LocationOn/></IconButton>
    )
};

export default NavigateComponent;