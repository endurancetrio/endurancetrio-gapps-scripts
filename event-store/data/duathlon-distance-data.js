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
 * Gets the data from the duathlon_distance table included in the given spreadsheet.
 *
 * @param {Spreadsheet} spreadsheet the given spreadsheet
 *
 * @returns the data from the duathlon_distance table included in the given spreadsheet
 */
function getDuathlonDistanceDataFromSpreadsheet(spreadsheet) {
  const tableDuathlonDistance = spreadsheet
    .getRangeByName(RANGE_DUATHLON_DISTANCE)
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    });
  const tableDuathlonDistanceFields = tableDuathlonDistance.shift();

  const returnedFields = [
    'id',
    'first_run_distance',
    'first_run_laps',
    'bike_distance',
    'bike_laps',
    'second_run_distance',
    'second_run_laps',
  ];

  const duathlonDistances = [];
  tableDuathlonDistance.forEach((record) => {
    const duathlonDistance = {};
    tableDuathlonDistanceFields.forEach((key, columnIndex) => {
      const value = record[columnIndex].trim();

      if (value === '') {
        duathlonDistance[key] = null;
      } else if (returnedFields.includes(key)) {
        duathlonDistance[key] = parseInt(value, 10);
      }
    });

    duathlonDistances.push(duathlonDistance);
  });

  return duathlonDistances;
}
