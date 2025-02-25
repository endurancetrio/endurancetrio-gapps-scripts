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
 * Gets the parent folder of the Google drive file with the given file id.
 *
 * @param {String} fileId the given Google Drive file id
 * @returns the parent folder of the given file id or null if it doesn't exists
 */
function getFileFolder(fileId) {
  try {
    const file = DriveApp.getFileById(fileId);

    const parents = file.getParents();

    if (parents.hasNext()) {
      const folder = parents.next();
      return folder;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

/**
 * Checks if a file with the given name exists on the given folder. If it does, replaces it with a file
 * with the same name and the given content. If it doesn't exists yet, creates it with the given content.
 *
 * @param {Folder} parentFolder the given Google Drive folder
 * @param {String} fileName the given name of the file to create or update
 * @param {String} fileContent the content of the file to create or update
 * @param {MimeType} mimeType the give Apps Script file mime type
 *
 * @see https://developers.google.com/apps-script/reference/base/mime-type
 */
function saveOrUpdateFile(parentFolder, fileName, fileContent, mimeType) {
  const existingFile = getFileByParentFolderAndName(parentFolder, fileName);

  if (existingFile) {
    existingFile.setTrashed(true);
  }

  parentFolder.createFile(fileName, fileContent, mimeType);
}

/**
 * Checks if a file with the given name exists on the given folder. If it does, returns the file.
 * If the file doesn't exists, returns null.
 *
 * @param {Folder} parentFolder the given Google Drive folder
 * @param {String} fileName the file given name
 *
 * @returns the file with the given name if it exist or null if it doesn't exists
 */
function getFileByParentFolderAndName(parentFolder, fileName) {
  try {
    return parentFolder.getFilesByName(fileName).next();
  } catch (error) {
    return null;
  }
}
