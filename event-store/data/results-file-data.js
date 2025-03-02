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
 * Gets the data from the results_file table included in the given spreadsheet.
 *
 * @param {Spreadsheet} spreadsheet the given spreadsheet
 *
 * @returns the data from the results_file table included in the given spreadsheet
 */
function getResultsFileDataFromSpreadsheet(spreadsheet) {
  const tableResultsFile = spreadsheet
    .getRangeByName(RANGE_RESULTS_FILE)
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    });
  const tableResultsFileFields = tableResultsFile.shift();

  const returnedFields = ['id', 'race_id', 'title', 'subtitle', 'revision', 'is_active', 'file_name'];

  const resultsFiles = [];
  tableResultsFile.forEach((record) => {
    const resultFile = {};
    tableResultsFileFields.forEach((key, columnIndex) => {
      if (returnedFields.includes(key)) {
        const value = record[columnIndex].trim();

        if (value === '') {
          resultFile[key] = null;
        } else if (['id', 'race_id', 'revision'].includes(key)) {
          resultFile[key] = parseInt(value, 10);
        } else if ('is_active' === key) {
          resultFile[key] = getBoolean(value);
        } else {
          resultFile[key] = value;
        }
      }
    });

    resultsFiles.push(resultFile);
  });

  return resultsFiles;
}
