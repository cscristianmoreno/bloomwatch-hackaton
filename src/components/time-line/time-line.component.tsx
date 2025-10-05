import React, { useState } from 'react';
import { Box, Slider, Typography, Input, Sheet, Grid, Button } from '@mui/joy';

const TimeLineComponent = ({ onFind }) => {
  const [year, setYear] = useState(2018); // Año por defecto
  const [day, setDay] = useState(1); // Día juliano por defecto (1 de enero)

  // Nuevas fechas de inicio y finalización con día juliano
  const [startDate, setStartDate] = useState(2018); // Año de inicio
  const [startDateDay, setStartDateDay] = useState(1); // Día juliano de inicio (1 de enero)
  const [endDate, setEndDate] = useState(2025); // Año de finalización
  const [endDateDay, setEndDateDay] = useState(365); // Día juliano de finalización (365 de diciembre)

  const handleYearChange = (event, newValue) => {
    setYear(newValue);
  };

  const handleDayChange = (event, newValue) => {
    setDay(newValue);
  };

  const handleStartDateChange = (event, newValue) => {
    setStartDate(newValue);
  };

  const handleStartDateDayChange = (event, newValue) => {
    setStartDateDay(newValue);
  };

  const handleEndDateChange = (event, newValue) => {
    setEndDate(newValue);
  };

  const handleEndDateDayChange = (event, newValue) => {
    setEndDateDay(newValue);
  };

  const toMODISDate = (year, day) => {
    return `A${year}${String(day).padStart(3, '0')}`;
  };

  // Comprobación de que la fecha de inicio no sea posterior a la de finalización
  const isStartBeforeEnd = startDate < endDate || (startDate === endDate && startDateDay <= endDateDay);

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Typography level="h4" textAlign="center" gutterBottom>
        Selecciona una Fecha
      </Typography>

      <Grid container spacing={2}>
        {/* Slider para el Año */}
        <Grid item xs={12}>
          <Typography level="h6">Año</Typography>
          <Slider
            value={year}
            min={2000}
            max={2025}
            step={1}
            onChange={handleYearChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}`}
            valueLabelText={(value) => `${value}`}
            aria-labelledby="year-slider"
            sx={{ marginBottom: 2 }}
          />
          <Typography level="body1" align="center">
            Año seleccionado: {year}
          </Typography>
        </Grid>

        {/* Slider para el Día Juliano */}
        <Grid item xs={12}>
          <Typography level="h6">Día Juliano</Typography>
          <Slider
            value={day}
            min={1}
            max={365}
            step={1}
            onChange={handleDayChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}`}
            valueLabelText={(value) => `${value}`}
            aria-labelledby="day-slider"
            sx={{ marginBottom: 2 }}
          />
          <Typography level="body1" align="center">
            Día seleccionado: {day} (Juliano)
          </Typography>
        </Grid>

        {/* Sliders para la fecha de inicio (startDate) y día juliano de inicio */}
        <Grid item xs={12} sm={6}>
          <Typography level="h6">Fecha de Inicio (Año)</Typography>
          <Slider
            value={startDate}
            min={2000}
            max={2025}
            step={1}
            onChange={handleStartDateChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}`}
            valueLabelText={(value) => `${value}`}
            aria-labelledby="start-date-slider"
            sx={{ marginBottom: 2 }}
          />
          <Typography level="body1" align="center">
            Año de inicio seleccionado: {startDate}
          </Typography>
        </Grid>

        {/* Slider para el Día Juliano de la Fecha de Inicio */}
        <Grid item xs={12} sm={6}>
          <Typography level="h6">Día Juliano de Inicio</Typography>
          <Slider
            value={startDateDay}
            min={1}
            max={366} // Permite hasta 366 para años bisiestos
            step={1}
            onChange={handleStartDateDayChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}`}
            valueLabelText={(value) => `${value}`}
            aria-labelledby="start-date-day-slider"
            sx={{ marginBottom: 2 }}
          />
          <Typography level="body1" align="center">
            Día Juliano de Inicio seleccionado: {startDateDay}
          </Typography>
        </Grid>

        {/* Sliders para la fecha de finalización (endDate) y día juliano de finalización */}
        <Grid item xs={12} sm={6}>
          <Typography level="h6">Fecha de Finalización (Año)</Typography>
          <Slider
            value={endDate}
            min={2000}
            max={2025}
            step={1}
            onChange={handleEndDateChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}`}
            valueLabelText={(value) => `${value}`}
            aria-labelledby="end-date-slider"
            sx={{ marginBottom: 2 }}
          />
          <Typography level="body1" align="center">
            Año de finalización seleccionado: {endDate}
          </Typography>
        </Grid>

        {/* Slider para el Día Juliano de la Fecha de Finalización */}
        <Grid item xs={12} sm={6}>
          <Typography level="h6">Día Juliano de Finalización</Typography>
          <Slider
            value={endDateDay}
            min={1}
            max={366} // Permite hasta 366 para años bisiestos
            step={1}
            onChange={handleEndDateDayChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}`}
            valueLabelText={(value) => `${value}`}
            aria-labelledby="end-date-day-slider"
            sx={{ marginBottom: 2 }}
          />
          <Typography level="body1" align="center">
            Día Juliano de Finalización seleccionado: {endDateDay}
          </Typography>
        </Grid>

        {/* Mostrar la fecha MODIS para Inicio y Final */}
        <Grid item xs={12} textAlign="center">
          <Typography level="h6">Fecha MODIS de Inicio: {toMODISDate(startDate, startDateDay)}</Typography>
          <Typography level="h6">Fecha MODIS de Finalización: {toMODISDate(endDate, endDateDay)}</Typography>
        </Grid>

        {/* Mostrar la fecha MODIS (AyyyyDDD) */}
        <Grid item xs={12} textAlign="center">
          <Sheet
            variant="outlined"
            sx={{
              width: 'fit-content',
              margin: '0 auto',
              padding: '0.5rem 1rem',
              textAlign: 'center',
              fontSize: '1.2rem',
              backgroundColor: '#f0f0f0',
            }}
          >
            <Button
              disabled={!isStartBeforeEnd}
              onClick={(): void => onFind(toMODISDate(startDate, startDateDay), toMODISDate(endDate, endDateDay))}
            >
              Buscar
            </Button>
          </Sheet>
          {!isStartBeforeEnd && (
            <Typography color="error" level="body2" align="center">
              La fecha de inicio no puede ser posterior a la fecha de finalización.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TimeLineComponent;
