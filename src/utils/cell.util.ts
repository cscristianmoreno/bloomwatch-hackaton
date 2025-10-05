import proj4 from "proj4";
import type { SubsetTypeStruct } from "../types/subset.type";

const projSrc = 'EPSG:4326'; // WGS84
const projDst = 'EPSG:3857'; // Web Mercator

export function generateRasterPolygonsCentered(
    sset: SubsetTypeStruct
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

            subset.forEach(sub => {
              const value = sub.data?.[idx] ?? null;
              if (value !== null && value !== undefined) {
                cellData[sub.calendar_date] = {
                  band: sub.band,
                  value
                };
              }
            });

            polygons.push({
                position: polygon,
                data: cellData
            });
        }
    }
    return polygons;
}

export function getColor(value: number): string {
  if (value < 100) return '#ffffcc';
  if (value < 150) return '#a1dab4';
  if (value < 200) return '#41b6c4';
  if (value < 250) return '#2c7fb8';
  return '#253494';
}