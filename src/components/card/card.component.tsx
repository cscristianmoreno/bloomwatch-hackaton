import { Box, Typography } from "@mui/joy";
import type { FC, ReactElement } from "react";
import { NavLink } from "react-router";

const CardComponent: FC<{ link: string, image: string, description: string }> = ({ link, image, description }): ReactElement => {


    return (
        <NavLink to={link}>
            <Box mt={4} boxSizing="border-box" borderRadius={10} width={250}>
                
                <Box display="flex" justifyContent="center" alignItems="center" position="relative" width={250}>
                    <img src={"/images/" + image}/>
                    {!link.length &&
                    <Box display="flex" justifyContent="center" alignItems="center" bgcolor="rgb(150, 105, 150)" sx={{ filter: "opacity(75%)" }}  borderRadius={10} position="absolute" width="80%" height="80%">
                        <Typography sx={{ color: "white" }} level="title-md">PRÓXIMAMENTE</Typography>
                    </Box>
                }
                </Box>
                
                <Typography level="title-sm">{description}</Typography>
            </Box>
        </NavLink>
    )
};

export default CardComponent;