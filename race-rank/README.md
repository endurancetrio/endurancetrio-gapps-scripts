# RaceRank: Timing & Results

**Google Apps Script for a spreadsheet to manage timing and generate classifications of triathlon races**

## Table Of Contents

1. [Introduction](#introduction)
2. [Development](#development)
    1. [Technologies](#technologies)
    2. [Installation](#installation)
3. [License](#license)

## Introduction

**RaceRank: Timing & Results** is a [Google Apps Script](https://www.google.com/script/) for a spreadsheet that manages timing and generates classifications for sports competitions. It was initially created with the [Portuguese Triathlon Federation](https://www.federacao-triatlo.pt/) in mind, but it is versatile enough to be used in any sports event that requires race timing and result management.

## Development

For the development of **RaceRank: Timing & Results**, [Google Clasp](https://github.com/google/clasp) is used and therefore [node](https://nodejs.org/) (and [npm](https://www.npmjs.com/)) needs to be installed in the development machine.

### Technologies

**RaceRank: Timing & Results** uses the following [npm](https://www.npmjs.com/) packages for its development:

+ [@google/clasp](https://www.npmjs.com/package/@google/clasp)
+ [eslint](https://www.npmjs.com/package/eslint);
+ [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier);
+ [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier);
+ [prettier](https://www.npmjs.com/package/prettier);

### Installation

To start developing **RaceRank: Timing & Results**, clone this repository and install the required [npm](https://www.npmjs.com/) packages with the following commands:

    git clone git@github.com:federacao-triatlo/race-rank-timing-results.git
    cd race-rank-timing-results
    npm install

To setup the connection with the [Google Apps Script](https://www.google.com/script/), copy the file [`.clasp.json.template`](./.clasp.json.template) and rename the copy as `.clasp.json`. Then define the appropriate values for the `scriptId` and `rootDir` keys.

To find the `scriptId` value of the project, follow the below steps:

1. Open Apps Script project.
2. At the left, click Project Settings settings.
3. Under IDs, copy the Script ID.

The value for the `rootDir` key is the absolute path of the local repository.

Then, enable the Google Apps Script on the [user settings page](https://script.google.com/home/usersettings).

To enable the connection with the [Google Apps Script](https://www.google.com/script/), it's necessary to sign into the Google account where the [Apps Script](https://www.google.com/script/) project are stored. It will be done with the following command:

    npm run login

The above command executes one of the scripts defined in the [`package.json`](./package.json) file. With its execution, a browser window or tab will open, displaying a Google OAuth consent screen. If prompted, select the Google account that you want to use to authenticate [Google Clasp](https://github.com/google/clasp).

The consent screen will display the permissions that [Google Clasp](https://github.com/google/clasp) requires to access your Google account and manage your Google Apps Script projects. Review the permissions carefully to ensure that you trust the application requesting access and then click "Allow" to grant [Google Clasp](https://github.com/google/clasp) the necessary permissions.

After granting permissions, the [Google Clasp](https://github.com/google/clasp) authentication token is stored in a file named `.clasprc.json`, which is created in the user's home directory (this is a global authentication token).

To pull the code from the online project, execute the following command:

    npm run pull

To push your local code changes to the online project, execute the following command:

    npm run push

#### Very important notice

The command `clasp push` replaces code that is on online project and `clasp pull` replaces all files locally. For this reason, **do not concurrently edit code locally and on `script.google.com`**

Check the [`clasp` official documentation](https://developers.google.com/apps-script/guides/clasp) and the [`clasp` codelabs](https://codelabs.developers.google.com/codelabs/) to learn more about the usage of [Google Clasp](https://github.com/google/clasp).

## License

**RaceRank: Timing & Results** is licensed under the terms of [MIT License](./LICENSE).
