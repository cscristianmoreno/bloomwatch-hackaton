import { useState, type FC, type ReactElement } from "react";
import MapComponent from "./components/map/map.component";
import { Box } from "@mui/joy";
import TimeLineComponent from "./components/time-line/time-line.component";
import IndexPage from "./pages/index.page";
import MenuComponent from "./components/menu/menu.component";
import { BrowserRouter, Route, Router, Routes } from "react-router";

const App: FC = (): ReactElement => {
    return (
        <Box position="relative" width="100vw" height="100vh">
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<IndexPage/>}/>
                    <Route path="/map" element={<MapComponent/>}/>
                </Routes>
            </BrowserRouter>
        </Box>
    );
};

export default App;