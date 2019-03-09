import getStringDateLuftdaten from '../../utilities/getStringDateLuftdaten';
import { Luftdaten } from './luftdaten';

export default function luftdatenJsonTransformer(response) {
  let pm10 = "0";
  let pm25 = "0";
  let longitude = "";
  let latitude = "";
  let timestamp = "";

  if (response.length) {
    pm10 = response[response.length - 1].sensordatavalues[0].value_type === "P1" ?
      response[response.length - 1].sensordatavalues[0].value : "0";
    pm25 = response[response.length - 1].sensordatavalues[1].value_type === "P2" ?
      response[response.length - 1].sensordatavalues[1].value : "0";;
    timestamp = response[response.length - 1].sensordatavalues[0].value_type === "P1" ?
      getStringDateLuftdaten(response[response.length - 1].timestamp) : "";
    latitude = response[response.length - 1].sensordatavalues[0].value_type === "P1" ?
      response[response.length - 1].location.latitude : "";
    longitude = response[response.length - 1].sensordatavalues[0].value_type === "P1" ?
      response[response.length - 1].location.longitude : "";
  }

  const components = { pm10, pm25 };
  const location = { longitude, latitude };

  return new Luftdaten(components, location, timestamp);
}
