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
 * Gets the data from the biathlon_distance table included in the given spreadsheet.
 *
 * @param {Spreadsheet} spreadsheet the given spreadsheet
 *
 * @returns the data from the biathlon_distance table included in the given spreadsheet
 */
function getBiathlonDistanceDataFromSpreadsheet(spreadsheet) {
  const tableBiathlonDistance = spreadsheet
    .getRangeByName(RANGE_BIATHLON_DISTANCE)
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    });
  const tableBiathlonDistanceFields = tableBiathlonDistance.shift();

  const returnedFields = ['id', 'bike_distance', 'bike_laps', 'run_distance', 'run_laps'];

  const biathlonDistances = [];
  tableBiathlonDistance.forEach((record) => {
    const biathlonDistance = {};
    tableBiathlonDistanceFields.forEach((key, columnIndex) => {
      const value = record[columnIndex].trim();

      if (value === '') {
        biathlonDistances[key] = null;
      } else if (returnedFields.includes(key)) {
        biathlonDistance[key] = parseInt(value, 10);
      }
    });

    biathlonDistances.push(biathlonDistance);
  });

  return biathlonDistances;
}
