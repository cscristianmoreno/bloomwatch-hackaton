import { Box, Typography } from "@mui/joy";
import { useState, type FC, type ReactElement } from "react";
import type { SiteTypeStruct } from "../../types/sites.type";
import { getLegendItemsForBand } from "../../utils/cell.util";
import { Info } from "@mui/icons-material";

const InfoComponent: FC<{ site: SiteTypeStruct, band: string }> = ({ site, band }: { site: SiteTypeStruct, band: string }): ReactElement => {
    const [details, setDetails] = useState<boolean>(true);

    return (
        <Box position="absolute" zIndex={1000} top={80} left={10}>
            <Info color="primary" onClick={(): void => setDetails(!details)}/>
            {
                details && 
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
             </Box>
            }
        </Box>
    );
};

export default InfoComponent;