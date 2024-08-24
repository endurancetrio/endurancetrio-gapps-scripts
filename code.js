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
 * Adds a custom menu to the Google Sheets file
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('FTP').addItem('Importar Registos de Cronometragem', 'validateTimingRecordsImport').addToUi();
}

/**
 * Check if importing timing records is allowed and if all the necessary data is available and valid.
 */
function validateTimingRecordsImport() {
  const timingSystem = getSelectedTimingSystem();
  const importStatus = getSelectedImportStatus();

  if (timingSystem && timingSystem.length > 0 && timingSystem != 'MANUAL' && importStatus === 'ON') {
    switch (timingSystem) {
      case TIMING_SYSTEM_MYLAPS:
        validateMylapsTimingRecordsImport(timingSystem);
        break;
      case TIMING_SYSTEM_RACE_RESULT:
        validateRaceResultTimingRecordsImport(timingSystem);
        break;
      default: {
        const alertMessage =
          'O sistema de cronometragem definido não é suportado!!\n' +
          '\n' +
          'Para poder prosseguir com a importação de registos de cronometragem' +
          'é necessário definir um sistema de cronometragem suportado.';
        SpreadsheetApp.getUi().alert(alertMessage);
        break;
      }
    }
  } else {
    const alertMessage =
      'A importação de registos de cronometragem está bloqueada!\n' +
      '\n' +
      'A importação de registos de cronometragem está bloqueada porque a Cronometragem está definido para "MANUAL"' +
      'e/ou a Importação de tempos não está definida para "ON".';

    SpreadsheetApp.getUi().alert(alertMessage);
  }

  /**
   * Checks if the necessary data to import timing records obtained with
   * {@link https://www.mylaps.com/ Mylaps} decoders is available and is valid.
   *
   * If the necessary data is available and is valid,
   * the function {@link storeTimingRecords} will be executed to get the timing records
   * from the EnduranceTrio Timing Exporter micro-service and store it on the associated Google Sheet.
   *
   * @param {String} timingSystem the given designation for the Mylaps timing system
   */
  function validateMylapsTimingRecordsImport(timingSystem) {
    const startDate = getStartDate();

    if (startDate && startDate.length > 0) {
      storeTimingRecords(timingSystem, getTimeZone(), startDate, null);
    } else {
      const alertMessage =
        'Não está definida a data dos registo de cronometragem a importar!!\n' +
        '\n' +
        'Para prosseguir com a importação de registos de cronometragem, é necessário definir a data dos mesmos.';

      SpreadsheetApp.getUi().alert(alertMessage);
    }
  }

  /**
   * Checks if the necessary data to import timing records obtained with
   * {@link https://www.raceresult.com/ Race Result} decoders is available and is valid.
   *
   * If the necessary data is available and is valid,
   * the function {@link storeTimingRecords} will be executed to get the timing records
   * from the EnduranceTrio Timing Exporter micro-service and store it on the associated Google Sheet.
   *
   * @param {String} timingSystem the given designation for the Race Result timing system
   */
  function validateRaceResultTimingRecordsImport(timingSystem) {
    const eventReference = getSelectedEventReference();

    if (eventReference && eventReference.length > 0) {
      storeTimingRecords(timingSystem, getTimeZone(), null, eventReference);
    } else {
      const alertMessage =
        'Não está definida a referência do evento dos registo de cronometragem a importar!!\n' +
        '\n' +
        'Para prosseguir com a importação de registos de cronometragem, é necessário definir a referência do evento dos mesmos.';

      SpreadsheetApp.getUi().alert(alertMessage);
    }
  }

  /**
   * Gets the timing zone selected on the "Dashboard" tab of the associated Google Sheet
   * and returns it if it is properly defined. Otherwise, returns the default time zone.
   *
   * @returns the timing zone to be used to get the timing records from the EnduranceTrio Timing Exporter micro-service
   */
  function getTimeZone() {
    let timeZone = getSelectedTimeZone();

    if (timeZone && timeZone.length > 0) {
      return timeZone;
    } else {
      SpreadsheetApp.getActive().toast('Está a ser considerado o fuso horário de Lisboa', '\u{2139}');
      return DEFAULT_TIME_ZONE_PATH_PARAMETER;
    }
  }
}
