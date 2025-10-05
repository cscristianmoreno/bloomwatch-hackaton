import { useState, type FC, type ReactElement } from "react";
import MapComponent from "./components/map/map.component";
import { Box } from "@mui/joy";
import TimeLineComponent from "./components/time-line/time-line.component";

const App: FC = (): ReactElement => {
    
    const [selectedYear, setSelectedYear] = useState(2024);
    const [selectedDay, setSelectedDay] = useState(1);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleTimeChange = (year, day) => {
        setSelectedYear(year);
        setSelectedDay(day);
    };

    return (
        <Box position="relative" width="100vw" height="100vh">
            <MapComponent/>
            {/* <TimeLineComponent onDateChange={undefined} selectedDate={undefined}/> */}
        </Box>
    );
};

export default App;