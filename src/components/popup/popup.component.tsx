import { Box, Divider, Typography } from "@mui/joy";
import { useState, type FC, type ReactElement } from "react";
import PopupTitleComponent from "../popup-title/popup-title.component";
import SliderComponent from "../sliders/slider.component";
import type { PopupTypeStruct } from "../../types/popup.type";
import { Popup } from "react-leaflet";

const PopupComponent: FC<PopupTypeStruct> = ({ site, index, setInfo }: PopupTypeStruct): ReactElement => {

    const [details, setDetails] = useState<boolean>(false);

    return (
        <Popup>
            <Box minWidth={100} display="flex" flexDirection="column" gap={2}>
                <Typography onClick={(): void => setDetails(!details)} component="span" level="body-sm">{(!details) ? "Mostrar" : "Ocultar"} detalles</Typography>
                {details &&
                    <>
                        <Divider/>
                        <PopupTitleComponent title="País" info={site.country}/>
                        <PopupTitleComponent title="Sitio" info={site.sitename}/>
                        <PopupTitleComponent title="Red" info={site.network}/>
                        <PopupTitleComponent title="Estado" info={site.state}/>
                        <Divider/>
                    </> 
                }
                <SliderComponent site={site} siteSelected={index} setInfo={setInfo}/>
            </Box>
        </Popup>
    )
};

export default PopupComponent;