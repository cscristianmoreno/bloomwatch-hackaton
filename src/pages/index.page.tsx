import { Box } from "@mui/joy";
import type { FC, ReactElement } from "react";
import CardComponent from "../components/card/card.component";

const IndexPage: FC = (): ReactElement => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <img src="/images/logo.png" width={200} style={{ marginTop: 50}}/>
            
            <CardComponent link="/map" description="Explorá un mapa interactivo con floraciones actuales y previstas." image="card_1.jpg"/>
            
            <CardComponent link="" description="Leé novedades y reportes oficiales de la NASA sobre vegetación." image="card_2.jpg"/>

            <CardComponent link="" description="Descubrí plantas en 3D con modelos interactivos." image="card_3.jpg"/>

            <CardComponent link="" description="Unite a canales temáticos para compartir experiencias y datos." image="card_4.jpg"/>

        </Box>
    );
};

export default IndexPage;