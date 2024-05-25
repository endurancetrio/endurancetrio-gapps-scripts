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
 * @deprecated
 * Gets the Five Waypoints Track Data for the given date from the EnduranceTrio Timing Exporter microservice.
 *
 * @param importDate the given import date
 *
 * @returns the Five Waypoints Track Data for the given date
 */
function getFiveWaypointsTrackData(importDate) {
  const endpoint = TIMING_EXPORTER_BASE_URL + 'v1/mylaps/five-waypoints/' + importDate;
  const options = {
    method: 'GET',
  };

  const response = JSON.parse(UrlFetchApp.fetch(endpoint, options).getContentText());
  const result = response.data.validTrackRecords;

  const times = new Array();
  result.forEach((record) => {
    const timeRecord = new Array();
    timeRecord.push(record['[CI][Chip]']);
    timeRecord.push(getUtcTime(record['[CI][Time]']));
    timeRecord.push(record['[CI][Lap]']);
    timeRecord.push(record['[SL][Chip]']);
    timeRecord.push(getUtcTime(record['[SL][Time]']));
    timeRecord.push(record['[SL][Lap]']);
    timeRecord.push(record['[WA][Chip]']);
    timeRecord.push(getUtcTime(record['[WA][Time]']));
    timeRecord.push(record['[WA][Lap]']);
    timeRecord.push(record['[WB][Chip]']);
    timeRecord.push(getUtcTime(record['[WB][Time]']));
    timeRecord.push(record['[WB][Lap]']);
    timeRecord.push(record['[WC][Chip]']);
    timeRecord.push(getUtcTime(record['[WC][Time]']));
    timeRecord.push(record['[WC][Lap]']);
    timeRecord.push(record['[WD][Chip]']);
    timeRecord.push(getUtcTime(record['[WD][Time]']));
    timeRecord.push(record['[WD][Lap]']);
    timeRecord.push(record['[FL][Chip]']);
    timeRecord.push(getUtcTime(record['[FL][Time]']));
    timeRecord.push(record['[FL][Lap]']);

    times.push(timeRecord);
  });

  return times;
}

/**
 * Gets the Timing Data, recorded in the given timezone, of the given date
 * from the EnduranceTrio Timing Exporter microservice.
 *
 * The timezone is represented by a string that EnduranceTrio TimingExporter microservice stores as an enum. The
 * supported values are "lisbon" and "azores". The timezone "Lisbon/Europe" is represented by "lisbon" and the
 * timezone "Atlantic/Azores" is represented by "azores".
 *
 * @param {String} timezone the given timezone
 * @param {String} importDate the given import date
 *
 * @returns the Timing Data, recorded in the given timezone, of the given date
 */
function getMylapsTimingDataByDate(timezone, importDate) {
  const endpoint = TIMING_EXPORTER_BASE_URL.concat('v1/mylaps/', timezone, 'track-timing/', importDate);
  const options = {
    method: 'GET',
  };

  const response = JSON.parse(UrlFetchApp.fetch(endpoint, options).getContentText());
  const result = response.data;

  const timingData = {};

  timingData.checkIn = result.checkIn.map((record) => {
    return convertTimingObjectToArray(record);
  });

  timingData.startLine = result.startLine.map((record) => {
    return convertTimingObjectToArray(record);
  });

  timingData.intermediateWaypoints = result.intermediateWaypoints.map((record) => {
    return convertTimingObjectToArray(record);
  });

  timingData.finishLine = result.finishLine.map((record) => {
    return convertTimingObjectToArray(record);
  });

  timingData.invalid = result.invalid.map((record) => {
    return convertTimingObjectToArray(record);
  });

  return timingData;
}

/**
 * Converts the given timing record object into an array with the values of a timing record object.
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

/**
 * @deprecated
 * Converts the given UTC date string in ISO 8601 format into a UTC Time string.
 *
 * @param value the given UTC date string in ISO 8601 format
 *
 * @return a Local Time string
 */
function getUtcTime(value) {
  const date = new Date(value);
  date.setHours(date.getHours() - 1);
  return value === null ? null : date.toLocaleTimeString('pt-PT') + `,${date.getMilliseconds()}`;
}
