import getStringDateLuftdaten from '../../utilities/getStringDateLuftdaten';
import { Luftdaten } from './luftdaten';

export default function luftdatenJsonTransformer(response) {

  const pm10 = response[response.length - 1].sensordatavalues[0].value_type === "P1" ?
    response[response.length - 1].sensordatavalues[0].value : "0";
  const pm25 = response[response.length - 1].sensordatavalues[1].value_type === "P2" ?
    response[response.length - 1].sensordatavalues[1].value : "0";;
  const timestamp = response[response.length - 1].sensordatavalues[0].value_type === "P1" ?
    getStringDateLuftdaten(response[response.length - 1].timestamp) : "";
  const latitude = response[response.length - 1].sensordatavalues[0].value_type === "P1" ?
    response[response.length - 1].location.latitude : "";
  const longitude = response[response.length - 1].sensordatavalues[0].value_type === "P1" ?
    response[response.length - 1].location.longitude : "";

  const components = { pm10, pm25 };
  const location = { longitude, latitude };

  return new Luftdaten(components, location, timestamp);
}
