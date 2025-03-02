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

function getRaceDataFromSpreadsheet(spreadsheet) {
  const tableRace = spreadsheet
    .getRangeByName(RANGE_RACE)
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    });
  const tableRaceFields = tableRace.shift();

  const returnedFields = [
    'id',
    'race_reference',
    'title',
    'subtitle',
    'gender_category',
    'age_group_id',
    'race_type',
    'date',
    'time',
    'gun_time',
    'air_temperature',
    'race_status',
  ];

  const races = [];
  tableRace.forEach((record) => {
    const race = {};
    tableRaceFields.forEach((key, columnIndex) => {
      if (returnedFields.includes(key)) {
        const value = record[columnIndex].trim();

        if (value === '') {
          race[key] = null;
        } else if (['id', 'age_group_id'].includes(key)) {
          race[key] = parseInt(value, 10);
        } else if ('air_temperature' === key) {
          race[key] = parseFloat(value);
        } else {
          race[key] = value;
        }
      }
    });

    races.push(race);
  });

  return races;
}
