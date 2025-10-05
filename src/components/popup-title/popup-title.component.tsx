import { Box, Typography } from "@mui/joy";
import type { FC, ReactElement } from "react";

const PopupTitleComponent: FC<{ title: string, info: string }> = ({ title, info }): ReactElement => {
    return (
        <Box display="flex" flexDirection="column">
            <Typography component="span" level="title-sm">{title}:</Typography>
            <Typography component="span" level="body-sm">{info}</Typography>
        </Box>
    );
};

export default PopupTitleComponent;