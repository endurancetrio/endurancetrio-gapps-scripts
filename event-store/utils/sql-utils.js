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

/**
 * Generates the SQL script to insert the given data into the database schema and table
 *
 * @param {String} schema the given database schema name
 * @param {String} table the given database table name
 * @param {Array} data the given data to be inserted into the table
 *
 * @returns the sql script to insert the data into the database table
 */
function createSqlScriptToInsertTableData(schema, table, data) {
  let sql = '';
  if (data.length === 0) {
    sql += `-- No data found in the ${table} table\n`;
    return sql;
  }

  const columns = Object.keys(data[0]);

  data.forEach((row) => {
    const values = columns.map((column) => {
      const value = row[column];

      if (value === null || value === undefined) {
        return 'null';
      } else if (typeof value === 'string') {
        return `'${value.replace(/'/g, "''")}'`;
      } else {
        return value;
      }
    });

    sql += `INSERT INTO ${schema}.${table} (${columns.join(', ')}) VALUES (${values.join(', ')});\n`;
  });

  return sql;
}
