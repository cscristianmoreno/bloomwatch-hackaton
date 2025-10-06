import { Box, Button, CircularProgress, Divider, Option, Select, Slider, Typography } from "@mui/joy";
import { useEffect, useRef, useState, type Dispatch, type FC, type ReactElement, type RefObject, type SetStateAction } from "react";
import { dateFormatUtil } from "../../utils/date-format.util";
import type { DateTypeStruct, ModisDateTypeStruct } from "../../types/date.type";
import type { SliderComponentTypeStruct } from "../../types/slider-component.type";
import { useFind } from "../../hooks/use-find.hook";
import type { SubsetTypeStruct } from "../../types/subset.type";
import { generateRasterPolygonsCentered } from "../../utils/cell.util";
import { useLoading } from "../../hooks/use-loading.hook";

const BANDS: string[] = [
  "250m_16_days_blue_reflectance",
  "250m_16_days_composite_day_of_the_year",
  "250m_16_days_EVI",
  "250m_16_days_MIR_reflectance",
  "250m_16_days_NDVI",
  "250m_16_days_NIR_reflectance",
  "250m_16_days_pixel_reliability",
  "250m_16_days_red_reflectance",
  "250m_16_days_relative_azimuth_angle",
  "250m_16_days_sun_zenith_angle",
  "250m_16_days_view_zenith_angle",
  "250m_16_days_VI_Quality"
];


export const SliderComponent: FC<SliderComponentTypeStruct> = ({ setInfo, site, siteSelected  }: SliderComponentTypeStruct): ReactElement => {
    const { sites, getSubset, getAllDatesByCoords } = useFind();

    const { loading, onSetLoading } = useLoading();

    const [dates, setDates] = useState<DateTypeStruct | null>(null);
    const [date, setDate] = useState<string>("");
    const [bands, setBands] = useState<string>(BANDS[0]);
    const [km, setKm] = useState<number>(1);

    const onFindSubset = async (lat: number, lon: number): Promise<void> => {
        onSetLoading(true);
        const result: SubsetTypeStruct = await getSubset(lat, lon, date, km);
        const latlongs = generateRasterPolygonsCentered(result, bands);
        
        // const info

        setInfo({
            band: bands,
            date: date,
            polygons: latlongs,
            siteSelected: siteSelected,
            km: km
        });

        onSetLoading(false);
    };

    useEffect((): void => {
        const findDatesByCoords = async () => {
            const result: DateTypeStruct = await getAllDatesByCoords(site.latitude, site.longitude);
            setDates(result);
        };
        
        findDatesByCoords();
    }, []);

    useEffect((): void => {
        if (!dates) {
            return;
        }

        setDate(dates.dates[0].modis_date);
    }, [dates]);
    
    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <Typography component="span" typography="title-sm">Búsqueda por fecha</Typography>
            {!dates && <CircularProgress size="sm"/>}
            {dates && <Box>
                <Select defaultValue={dates.dates[0].modis_date} onChange={(_, value): void => setDate(value)}>
                {

                    dates && dates.dates.map((value: ModisDateTypeStruct, index: number): ReactElement => {
                        return <Option value={value.modis_date} key={index}>{value.calendar_date}</Option>
                    })
                }
                </Select>
            </Box>}
            
            <Box>
                <Typography component="span" typography="title-sm">Seleccionar banda</Typography>
                <Select defaultValue={BANDS[0]} onChange={(_, value): void => setBands(value)}>
                {   
                    dates?.dates.length && BANDS.map((value: string, index: number): ReactElement => {
                        return <Option value={value} key={index}>{value}</Option>
                    })
                }
                </Select>
            </Box>

            <Box>
                <Typography component="span" typography="title-sm">Tamaño de grilla en kilómetros</Typography>
                <Slider
                    min={1}
                    max={100}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(val): string => val + " km"}
                    defaultValue={1}
                    onChangeCommitted={(_, value) => setKm(value)}
                />
            </Box>

            <Button disabled={loading || !dates?.dates.length} sx={{ mt: 1 }} size="sm" onClick={(): Promise<void> => onFindSubset(site.latitude, site.longitude)}>{(loading) ? "Buscando..." : "Analizar"}</Button>
        </Box>
    );
};

export default SliderComponent;