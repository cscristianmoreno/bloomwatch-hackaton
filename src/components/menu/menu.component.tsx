import { Box } from "@mui/joy";
import type { FC, ReactElement } from "react";

const MenuComponent: FC = (): ReactElement => {
    return (
        <Box display="flex" alignItems="center" justifyContent="space-around" bgcolor="rgb(9, 22, 64)" width="100%" position="sticky" height={100} bottom={0} sx={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
            <Box>a</Box>
            <Box>a</Box>
            <Box>a</Box>
            <Box>a</Box>
        </Box>
);
};

export default MenuComponent;