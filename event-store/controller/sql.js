/*
 * MIT License
 *
 * Copyright(c) 2025 Ricardo do Canto
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

function saveSqlScript(spreadsheetId) {
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  let sql = createScriptHeader(spreadsheet);
  sql += createEventTableScript(spreadsheet) + '\n\n';
  sql += createOrganizerTableScript(spreadsheet) + '\n\n';
  sql += createEventOrganizerTableScript(spreadsheet) + '\n\n';
  sql += createEventFileTableScript(spreadsheet) + '\n\n';
  sql += createDistanceTableScript(spreadsheet) + '\n\n';
  sql += createAquabikeDistanceTableScript(spreadsheet) + '\n\n';
  sql += createAquathlonDistanceTableScript(spreadsheet) + '\n\n';
  sql += createBiathlonDistanceTableScript(spreadsheet) + '\n\n';
  sql += createDoubleBiathlonDistanceTableScript(spreadsheet) + '\n\n';
  sql += createDuathlonDistanceTableScript(spreadsheet) + '\n\n';
  sql += createTriathlonDistanceTableScript(spreadsheet) + '\n\n';
  sql += createCourseTableScript(spreadsheet) + '\n\n';

  const folder = getFileFolder(spreadsheetId);
  const filename = spreadsheet.getName() + '.sql';
  saveOrUpdateFile(folder, filename, sql, MimeType.PLAIN_TEXT);
}

function createScriptHeader(spreadsheet) {
  return '-- SQL Commands to insert the data provided by the ' + spreadsheet.getName() + ' spreadsheet\n\n';
}
