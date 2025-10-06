import { Box, Button, CircularProgress, IconButton, Typography } from "@mui/joy";
import { useState, type FC, type ReactElement } from "react";
import type { SiteTypeStruct } from "../../types/sites.type";
import { getLegendItemsForBand } from "../../utils/cell.util";
import { Info, LocationOn } from "@mui/icons-material";
import { useLoading } from "../../hooks/use-loading.hook";
import { useMap } from "react-leaflet";
import type { Map } from "leaflet";
import NavigateComponent from "../navigate/navigate.component";

const InfoComponent: FC<{ site: SiteTypeStruct | undefined, band: string }> = ({ site, band }: { site: SiteTypeStruct | undefined, band: string }): ReactElement => {
    const [details, setDetails] = useState<boolean>(true);
    const { loading } = useLoading();
    const map = useMap();

    return (
        <Box position="absolute" zIndex={1000} top={80} left={10}>
            {loading && <Typography startDecorator={<CircularProgress size="sm" color="primary"/>} level="body-sm">Buscando datos...</Typography>}
            {!loading && !site && <Typography startDecorator={<Info color="primary"/>} level="body-sm">No hay datos para mostrar</Typography>}
            {!loading && site && <Typography onClick={(): void => setDetails(!details)}  startDecorator={<Info color="primary"/>} level="body-sm">Detalles</Typography>}
            {
                site && details && !loading && 
                <>
                    <Box bgcolor="white" padding={1} borderRadius={5}>
                    {
                        getLegendItemsForBand(band).map((value): ReactElement => {
                            return (
                                <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                                    <Box bgcolor={value.color} width={15} height={15}/>
                                    <Typography level="body-sm">{value.description}</Typography>                        
                                </Box>
                            )
                        })
                    }
                     <NavigateComponent pos={[site.latitude, site.longitude]}/>
                     </Box>
                </>
            }
        </Box>
    );
};

export default InfoComponent;