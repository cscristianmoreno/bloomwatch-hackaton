import proj4 from "proj4";
import type { SubsetChildrenTypeStruct, SubsetTypeStruct } from "../types/subset.type";

const projSrc = 'EPSG:4326'; // WGS84
const projDst = 'EPSG:3857'; // Web Mercator

export function generateRasterPolygonsCentered(
    sset: SubsetTypeStruct,
    band: string
): Polygon[] {

  const { yllcorner, xllcorner, cellsize, longitude, latitude, ncols, nrows, subset } = sset;

    // 1. Centro del raster en proyectadas
    const x0 = typeof xllcorner === "string" ? parseFloat(xllcorner) : xllcorner;
    const y0 = typeof yllcorner === "string" ? parseFloat(yllcorner) : yllcorner;
    const rasterWidth = ncols * cellsize;
    const rasterHeight = nrows * cellsize;
    const rasterCenter = [x0 + rasterWidth / 2, y0 + rasterHeight / 2];

    // 2. Centro deseado en proyectadas
    const desiredCenter = proj4(projSrc, projDst, [longitude, latitude]);

    // 3. Desplazamiento
    const dx = desiredCenter[0] - rasterCenter[0];
    const dy = desiredCenter[1] - rasterCenter[1];

    // 4. Ajusta xllcorner y yllcorner
    const newXllcorner = x0 + dx;
    const newYllcorner = y0 + dy;
    
    // 5. Genera polígonos y convierte a lat/lng
    const polygons: Polygon[] = [];
    for (let row = 0; row < nrows; row++) {
        for (let col = 0; col < ncols; col++) {
            const x = newXllcorner + col * cellsize;
            const y = newYllcorner + row * cellsize;

            // Convierte cada esquina a lat/lng
            const ll1 = proj4(projDst, projSrc, [x, y]);
            const ll2 = proj4(projDst, projSrc, [x + cellsize, y]);
            const ll3 = proj4(projDst, projSrc, [x + cellsize, y + cellsize]);
            const ll4 = proj4(projDst, projSrc, [x, y + cellsize]);

            const polygon: Polygon = [
                [ll1[1], ll1[0]],
                [ll2[1], ll2[0]],
                [ll3[1], ll3[0]],
                [ll4[1], ll4[0]],
                [ll1[1], ll1[0]], // cerrar polígono
            ];

            const idx = row * ncols + col;
            const cellData: Polygon["data"] = {};

            const filtered = [...subset].filter((v: SubsetChildrenTypeStruct): boolean => v.band === band)[0];
              const value = filtered.data?.[idx] ?? null;
              if (value !== null && value !== undefined) {
                cellData[filtered.modis_date] = {
                  band: filtered.band,
                  value
                };
              }

            polygons.push({
                position: polygon,
                data: cellData
            });
        }
    }
    return polygons;
}

export function getColor(value): string {
  if (!value || value.value === null || value.value === undefined) return "black";

  const band = value.band;
  const v = value.value;

  switch (band) {
    // NDVI: -2000 to 10000 (scale 0.0001)
    case "250m_16_days_NDVI": {
      const scaled = v * 0.0001;
      if (scaled < 0) return '#d73027';        // suelos, agua, nubes
      if (scaled < 0.2) return '#fdae61';      // vegetación escasa
      if (scaled < 0.4) return '#fee08b';      // vegetación moderada
      if (scaled < 0.6) return '#d9ef8b';      // vegetación buena
      return '#1a9850';                        // vegetación densa
    }

    // EVI: -2000 to 10000 (scale 0.0001)
    case "250m_16_days_EVI": {
      const scaled = v * 0.0001;
      if (scaled < 0) return '#d73027';
      if (scaled < 0.1) return '#fdae61';
      if (scaled < 0.3) return '#fee08b';
      if (scaled < 0.5) return '#d9ef8b';
      return '#1a9850';
    }

    // Reflectancias (0 - 10000), escala 0.0001
    case "250m_16_days_red_reflectance":
    case "250m_16_days_blue_reflectance":
    case "250m_16_days_NIR_reflectance":
    case "250m_16_days_MIR_reflectance": {
      const scaled = v * 0.0001;
      if (scaled < 0.1) return '#ffffcc';
      if (scaled < 0.3) return '#a1dab4';
      if (scaled < 0.6) return '#41b6c4';
      if (scaled < 0.9) return '#2c7fb8';
      return '#253494';
    }

    // Pixel reliability: valores entre 0 y 3
    case "250m_16_days_pixel_reliability": {
      switch (v) {
        case 0: return 'green';    // buena
        case 1: return 'yellow';   // marginal
        case 2: return 'orange';   // pobre (nieve/hielo)
        case 3: return 'red';      // nublado
        default: return 'black';   // inválido
      }
    }

    // Day of Year (1 - 366)
    case "250m_16_days_composite_day_of_the_year": {
      if (v < 60) return '#edf8fb';      // invierno
      if (v < 120) return '#b2e2e2';     // primavera temprana
      if (v < 180) return '#66c2a4';     // primavera
      if (v < 240) return '#2ca25f';     // verano
      if (v < 300) return '#006d2c';     // otoño
      return '#00441b';                 // fin de año
    }

    // Relative azimuth angle (-3600 to 3600, escala 0.1)
    case "250m_16_days_relative_azimuth_angle": {
      const scaled = v * 0.1;
      if (scaled < 90) return '#fee5d9';
      if (scaled < 180) return '#fcae91';
      if (scaled < 270) return '#fb6a4a';
      if (scaled < 360) return '#de2d26';
      return '#a50f15';
    }

    // Sun zenith angle / View zenith angle (-9000 to 9000, escala 0.01)
    case "250m_16_days_sun_zenith_angle":
    case "250m_16_days_view_zenith_angle": {
      const scaled = v * 0.01;
      if (scaled < 20) return '#f7fcf0';
      if (scaled < 40) return '#ccece6';
      if (scaled < 60) return '#66c2a4';
      if (scaled < 80) return '#238b45';
      return '#00441b';
    }

    // VI Quality: campo bitfield (0–65534)
    case "250m_16_days_VI_Quality": {
      if (v < 10000) return '#c7e9b4';
      if (v < 40000) return '#7fcdbb';
      if (v < 60000) return '#41b6c4';
      return '#2c7fb8';
    }

    // Fallback
    default:
      return '#999';  // Banda desconocida
  }
}

export function getLegendItemsForBand(band: string): { color: string, description: string }[] {
  switch (band) {
    case "250m_16_days_NDVI":
      return [
        { color: '#d73027', description: 'Suelos, agua o nubes (NDVI < 0)' },
        { color: '#fdae61', description: 'Vegetación escasa (0 - 0.2)' },
        { color: '#fee08b', description: 'Vegetación moderada (0.2 - 0.4)' },
        { color: '#d9ef8b', description: 'Vegetación buena (0.4 - 0.6)' },
        { color: '#1a9850', description: 'Vegetación densa (> 0.6)' },
      ];

    case "250m_16_days_EVI":
      return [
        { color: '#d73027', description: 'Sin vegetación (EVI < 0)' },
        { color: '#fdae61', description: 'Vegetación muy escasa (0 - 0.1)' },
        { color: '#fee08b', description: 'Vegetación baja (0.1 - 0.3)' },
        { color: '#d9ef8b', description: 'Vegetación moderada (0.3 - 0.5)' },
        { color: '#1a9850', description: 'Vegetación densa (> 0.5)' },
      ];

    case "250m_16_days_red_reflectance":
    case "250m_16_days_blue_reflectance":
    case "250m_16_days_NIR_reflectance":
    case "250m_16_days_MIR_reflectance":
      return [
        { color: '#ffffcc', description: 'Baja reflectancia (< 0.1)' },
        { color: '#a1dab4', description: 'Reflectancia moderada (0.1 - 0.3)' },
        { color: '#41b6c4', description: 'Reflectancia alta (0.3 - 0.6)' },
        { color: '#2c7fb8', description: 'Reflectancia muy alta (0.6 - 0.9)' },
        { color: '#253494', description: 'Reflectancia extrema (> 0.9)' },
      ];

    case "250m_16_days_pixel_reliability":
      return [
        { color: 'green', description: 'Buena calidad (0)' },
        { color: 'yellow', description: 'Marginal (1)' },
        { color: 'orange', description: 'Pobre: nieve/hielo (2)' },
        { color: 'red', description: 'Nublado (3)' },
        { color: 'black', description: 'No válido' },
      ];

    case "250m_16_days_composite_day_of_the_year":
      return [
        { color: '#edf8fb', description: 'Invierno (< día 60)' },
        { color: '#b2e2e2', description: 'Primavera temprana (60-120)' },
        { color: '#66c2a4', description: 'Primavera (120-180)' },
        { color: '#2ca25f', description: 'Verano (180-240)' },
        { color: '#006d2c', description: 'Otoño (240-300)' },
        { color: '#00441b', description: 'Fin de año (> 300)' },
      ];

    case "250m_16_days_relative_azimuth_angle":
      return [
        { color: '#fee5d9', description: 'Ángulo < 90°' },
        { color: '#fcae91', description: 'Ángulo < 180°' },
        { color: '#fb6a4a', description: 'Ángulo < 270°' },
        { color: '#de2d26', description: 'Ángulo < 360°' },
        { color: '#a50f15', description: 'Ángulo > 360°' },
      ];

    case "250m_16_days_sun_zenith_angle":
    case "250m_16_days_view_zenith_angle":
      return [
        { color: '#f7fcf0', description: 'Ángulo < 20°' },
        { color: '#ccece6', description: 'Ángulo < 40°' },
        { color: '#66c2a4', description: 'Ángulo < 60°' },
        { color: '#238b45', description: 'Ángulo < 80°' },
        { color: '#00441b', description: 'Ángulo > 80°' },
      ];

    case "250m_16_days_VI_Quality":
      return [
        { color: '#c7e9b4', description: 'Calidad alta (< 10.000)' },
        { color: '#7fcdbb', description: 'Calidad media (10.000 - 40.000)' },
        { color: '#41b6c4', description: 'Calidad baja (40.000 - 60.000)' },
        { color: '#2c7fb8', description: 'Muy baja (> 60.000)' },
      ];

    default:
      return [{ color: '#999', description: 'Banda desconocida o sin leyenda' }];
  }
}
