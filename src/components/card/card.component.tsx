import { Box, Typography } from "@mui/joy";
import type { FC, ReactElement } from "react";
import { NavLink } from "react-router";

const CardComponent: FC<{ link: string, image: string, description: string }> = ({ link, image, description }): ReactElement => {


    return (
        <NavLink to={link}>
            <Box mt={3} boxSizing="border-box" overflow="hidden" borderRadius={10} width={250}>
                <img src={"/images/" + image}/>
                
                <Typography level="title-sm">{description}</Typography>
            </Box>
        </NavLink>
    )
};

export default CardComponent;