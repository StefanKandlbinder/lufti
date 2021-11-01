import getStringDate from './getStringDate';
import getUnixDateFromLuftdaten from './getUnixDateFromLuftdaten';

export default function getStringDateLuftdaten(date) {
    var newDate = getUnixDateFromLuftdaten(date);
    
    // Summertime
    // newDate += 7200;
  
    // Wintertime
    newDate += 3600;
  
    return getStringDate(newDate * 1000);
}
