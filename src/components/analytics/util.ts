import { ANALYTICS } from 'helpers/constants';

/* 
    get chart current width / height
    @params [length] 
    @returns number
*/

export function getCurrentChartSize(containerWidth: number, length: number) {
  if (length * ANALYTICS.AXIS_SIZE > containerWidth) {
    return Math.max(length * ANALYTICS.AXIS_SIZE - ANALYTICS.LEGEND_TOOL_WIDTH);
  }
  return containerWidth;
}

/* 
    format label
    @params [value] 
    @returns string
*/

export function valueFormatter(value: string, max: number) {
  const numericValue = parseFloat(value);
  if (!isNaN(numericValue)) {
    const value = Number.isInteger(numericValue) ? numericValue : numericValue.toFixed(1);
    return value.toString();
  }
  return value.length > max ? `${value.slice(0, max)}...` : value;
}
