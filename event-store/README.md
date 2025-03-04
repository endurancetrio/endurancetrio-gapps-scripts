# EventStore

**Google Apps Script for a spreadsheet to manage endurance sport events**

## Table Of Contents

1. [Introduction](#introduction)
2. [Development](#development)
    1. [Technologies](#technologies)
    2. [Installation](#installation)
3. [License](#license)

## Introduction

**EventStore** is a [Google Apps Script](https://www.google.com/script/) to be used with a spreadsheet that manages the data of endurance sport events.

## Development

For the development of **EventStore**, [Google Clasp](https://github.com/google/clasp) is used and therefore [node](https://nodejs.org/) (and [npm](https://www.npmjs.com/)) needs to be installed in the development machine.

### Technologies

**EventStore** uses the following [npm](https://www.npmjs.com/) packages for its development:

+ [@google/clasp](https://www.npmjs.com/package/@google/clasp)
+ [eslint](https://www.npmjs.com/package/eslint);
+ [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier);
+ [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier);
+ [prettier](https://www.npmjs.com/package/prettier);

### Installation

To start developing **EventStore**, follow these steps:

1. Fork this repository by clicking the "Fork" button on the [GitHub repository](https://github.com/endurancetrio/endurancetrio-gapps-scripts);
2. Clone your forked repository to your local machine and install the required [npm](https://www.npmjs.com/) packages, replace the ***{LABEL}*** in the below command as appropriate and execute it:

    git clone <git@github.com>:{GITHUB_USERNAME}/endurancetrio-gapps-scripts.git
    cd endurancetrio-gapps-scripts/event-store
    npm install

> **Label Definition**
>
> + **{GITHUB_USERNAME}** : Your [GitHub username](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/remembering-your-github-username-or-email)

To setup the connection with the [Google Apps Script](https://www.google.com/script/), copy the file [`.clasp.json.template`](./.clasp.json.template) and rename the copy as `.clasp.json`. Then define the appropriate values for the `scriptId` and `rootDir` keys.

To find the `scriptId` value of the project, follow the below steps:

1. Open Apps Script project.
2. At the left sidebar, click Project Settings.
3. Under IDs, copy the Script ID.

The value for the `rootDir` key is the absolute path of the local script main folder.

Then, enable the Google Apps Script on the [user settings page](https://script.google.com/home/usersettings).

To enable the connection with the [Google Apps Script](https://www.google.com/script/), it's necessary to sign into the Google account where the [Apps Script](https://www.google.com/script/) project are stored. It will be done with the following command:

    npm run login

The above command executes a script from [`package.json`](./package.json) file, opening a browser window for Google OAuth authentication. Follow these steps:

1. Select the Google account that you want to use to authenticate [Google Clasp](https://github.com/google/clasp);
2. Review the requested permissions for [Google Clasp](https://github.com/google/clasp);
3. Click **Allow** to grant access.

After granting permissions, the [Google Clasp](https://github.com/google/clasp) authentication token is stored in a file named `.clasprc.json`, which is created in the user's home directory (this is a global authentication token).

To pull the code from the online project, execute the following command:

    npm run pull

To push your local code changes to the online project, execute the following command:

    npm run push

#### Very important notice

The command `clasp push` replaces code that is on online project and `clasp pull` replaces all files locally. For this reason, **do not concurrently edit code locally and on `script.google.com`**

Check the [`clasp` official documentation](https://developers.google.com/apps-script/guides/clasp) and the [`clasp` codelabs](https://codelabs.developers.google.com/codelabs/) to learn more about the usage of [Google Clasp](https://github.com/google/clasp).

## License

**EventStore** is licensed under the terms of [MIT License](./LICENSE).
