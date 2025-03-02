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
 * Gets the data from the triathlon_based_race table included in the given spreadsheet.
 *
 * @param {Spreadsheet} spreadsheet the given spreadsheet
 *
 * @returns the data from the triathlon_based_race table included in the given spreadsheet
 */
function getTriathlonBasedRaceDataFromSpreadsheet(spreadsheet) {
  const tableTriathlonBasedRace = spreadsheet
    .getRangeByName(RANGE_TRIATHLON_BASED_RACE)
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    });
  const tableTriathlonBasedRaceFields = tableTriathlonBasedRace.shift();

  const returnedFields = ['id', 'water_temperature', 'wetsuit_rule'];

  const triathlonBasedRaces = [];
  tableTriathlonBasedRace.forEach((record) => {
    const triathlonBasedRace = {};
    tableTriathlonBasedRaceFields.forEach((key, columnIndex) => {
      if (returnedFields.includes(key)) {
        const value = record[columnIndex].trim();

        if (value === '') {
          triathlonBasedRace[key] = null;
        } else if ('id' === key) {
          triathlonBasedRace[key] = parseInt(value, 10);
        } else if ('water_temperature' === key) {
          triathlonBasedRace[key] = parseFloat(value);
        } else {
          triathlonBasedRace[key] = value;
        }
      }
    });

    triathlonBasedRaces.push(triathlonBasedRace);
  });

  return triathlonBasedRaces;
}
