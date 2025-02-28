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

function getEventFileDataFromSpreadsheet(spreadsheet) {
  const eventFileTable = spreadsheet
    .getRangeByName(RANGE_EVENT_FILE)
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    });
  const tableEventFileFields = eventFileTable.shift();

  const returnedFields = ['id', 'event_id', 'title', 'revision', 'is_active', 'file_name', 'file_type'];

  const eventFiles = [];
  eventFileTable.forEach((record) => {
    const eventFile = {};
    tableEventFileFields.map((key, columnIndex) => {
      if (returnedFields.includes(key)) {
        switch (key) {
          case 'id':
          case 'event_id':
          case 'revision':
            eventFile[key] = parseInt(record[columnIndex], 10);
            break;
          case 'is_active':
            eventFile[key] = getBoolean(record[columnIndex]);
            break;
          default:
            eventFile[key] = String(record[columnIndex]);
            break;
        }
      }
    });

    eventFiles.push(eventFile);
  });

  return eventFiles;
}
