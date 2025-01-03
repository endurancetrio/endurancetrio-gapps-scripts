/*
 * MIT License
 *
 * Copyright(c) 2023 Ricardo do Canto
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files(the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Gets, from the EnduranceTrio Timing Exporter micro-service, the timing records obtained
 * with {@link https://www.mylaps.com/ Mylaps} decoders, recorded in the given time zone and on the given date.
 *
 * The time zone is represented by a string that EnduranceTrio Timing Exporter micro-service stores as an enum.
 * The supported values are "lisbon" and "azores". The time zone "Lisbon/Europe" is represented by "lisbon"
 * and the time zone "Atlantic/Azores" is represented by "azores".
 *
 * @param {String} timeZone the given time zone
 * @param {String} startDate the given start date
 *
 * @returns the timing data recorded in the given date and in the given time zone
 */
function getMylapsTimingDataByDate(timeZone, startDate) {
  const endpoint = TIMING_EXPORTER_BASE_URL.concat('v1/mylaps/', timeZone, '/event-timing/', startDate);
  const options = {
    method: 'GET',
  };
  const response = JSON.parse(UrlFetchApp.fetch(endpoint, options).getContentText());

  return convert(response.data);
}

/**
 * Gets, from the EnduranceTrio Timing Exporter micro-service, the timing records obtained
 * with {@link https://www.raceresult.com/ Race Result} decoders, recorded in the given time zone
 * and with the given event reference.
 *
 * The time zone is represented by a string that EnduranceTrio Timing Exporter micro-service stores as an enum.
 * The supported values are "lisbon" and "azores". The time zone "Lisbon/Europe" is represented by "lisbon"
 * and the time zone "Atlantic/Azores" is represented by "azores".
 *
 * @param {String} timeZone the given time zone
 * @param {String} eventReference the given event reference
 *
 * @returns the timing data recorded with the given event reference and in the given time zone
 */
function getRaceResultTimingDataByEventReference(timeZone, eventReference) {
  const endpoint = TIMING_EXPORTER_BASE_URL.concat('v1/race-result/', timeZone, '/event-timing/', eventReference);
  const options = {
    method: 'GET',
  };
  const response = JSON.parse(UrlFetchApp.fetch(endpoint, options).getContentText());

  return convert(response.data);
}

/**
 * Converts the lists of timing record objects contained by the given timing data
 * into list of arrays with the values of those timing record objects.
 *
 * @param {Object} timingData the given timing data object
 * @returns a timing data object with lists of timing records arrays
 */
function convert(timingData) {
  const timingDataArrays = {};

  timingDataArrays.checkIn = timingData.checkIn.map((timingRecord) => {
    return convertTimingObjectToArray(timingRecord);
  });

  timingDataArrays.startLine = timingData.startLine.map((timingRecord) => {
    return convertTimingObjectToArray(timingRecord);
  });

  timingDataArrays.intermediateWaypoints = timingData.intermediateWaypoints.map((timingRecord) => {
    return convertTimingObjectToArray(timingRecord);
  });

  timingDataArrays.finishLine = timingData.finishLine.map((timingRecord) => {
    return convertTimingObjectToArray(timingRecord);
  });

  timingDataArrays.invalid = timingData.invalid.map((timingRecord) => {
    return convertTimingObjectToArray(timingRecord);
  });

  return timingDataArrays;
}

/**
 * Converts the timing record object into an array with the values of a timing record object.
 *
 * @param {timingRecord} timingRecord the given timing record object
 *
 * @returns an array with the values of a timing record object
 */
function convertTimingObjectToArray(timingRecord) {
  const recordArray = new Array();

  if (timingRecord.waypoint) {
    recordArray.push(timingRecord.waypoint);
  } else {
    recordArray.push(timingRecord.location);
  }

  recordArray.push(timingRecord.chip);
  recordArray.push(getTime(timingRecord.time));
  recordArray.push(timingRecord.lap);

  return recordArray;
}

/**
 * Converts the given UTC date string in ISO 8601 format into a Local Time string.
 *
 * @param value the given UTC date string in ISO 8601 format
 *
 * @return a Local Time string
 */
function getTime(value) {
  const date = new Date(value);
  return value === null ? null : date.toLocaleTimeString('pt-PT') + `,${date.getMilliseconds()}`;
}
