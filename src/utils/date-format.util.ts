export const dateFormatUtil = (day) => {
    // Convierte la secuencia en un número de 3 dígitos, rellenando con ceros a la izquierda si es necesario
    const formattedSequence = day.toString().padStart(3, '0');
    // Devuelve la cadena en el formato "A2013001"
    return `${formattedSequence}`;
}