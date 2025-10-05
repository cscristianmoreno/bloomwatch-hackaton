import { Box, Divider, Slider, Typography } from "@mui/joy";
import { useEffect, useRef, useState, type Dispatch, type FC, type ReactElement, type RefObject, type SetStateAction } from "react";
import { dateFormatUtil } from "../../utils/date-format.util";
import type { DateTypeStruct } from "../../types/date.type";

export const SliderComponent: FC<{ min: number, max: number, title: string, date: DateTypeStruct, setDate: Dispatch<SetStateAction<DateTypeStruct>> }> = ({ min, max, title, date, setDate }): ReactElement => {

    const [day, setDay] = useState<number>(113);
    const [year, setYear] = useState<number>(2016);

    useEffect((): void => {
        setDate({
            day: day,
            year: year
        })
    }, [day, year]);

    return (
        <Box>
            <Typography component="span" typography="title-sm">{title}</Typography>
            <Box>
                <Typography component="span" level="body-sm">Año</Typography>
                <Slider
                    min={min}
                    max={max}
                    defaultValue={date.year}
                    step={1}
                    marks
                    valueLabelDisplay="auto"
                    onChangeCommitted={(_, value): void => setYear(value as number)}
                />

            </Box>

            <Box>
                <Typography component="span" level="body-sm">Día</Typography>
                <Slider
                    min={1}
                    max={365}
                    step={1}
                    defaultValue={date.day}
                    valueLabelDisplay="auto"
                    onChangeCommitted={(_, value): void => setYear(value as number)}
                />
            </Box>
        </Box>
    );
};

export default SliderComponent;