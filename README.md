# Employee Performance Webpart Sample 🔥 💼 🚀

## Summary

Sample SPFx webpart built using React, also illustrating different scenarios to fetch data from SP REST, PnP, MS Graph and Mockup data.

![Alt Text](./EmployeePerformanceApp_Demo.gif)

---

## Features

This webpart illustrates the following concepts on top of the SharePoint Framework:

- Using React for building SharePoint Framework client-side webparts
- Using Office UI Fabric React styles for building user experience consistent with SharePoint and Office
- Communicating with the Microsoft Graph, SharePoint REST API and PnP API
- Passing webpart properties to React components

### Solution configuration

#### [Integrate TSLint with VSCode](https://joelfmrodrigues.wordpress.com/2017/12/06/tslint-spfx/)

1. Install TSLint extension on VSCode
2. Add a `tslint.json` file on the root of the project to tell the extension to get its rules from the `config` folder:
   ```json5
   {
     "rulesDirectory": "./config"
   }
   ```

#### [Integrate Prettier with VSCode](https://prettier.io/docs/en/editors.html#visual-studio-code)

1. Install Prettier extension: `ext install prettier-vscode`
2. Add a `.prettierrc` file to the root of the project to tell the extension to use the following prettier rules:

   ```json5
   {
     "singleQuote": true
   }
   ```

   > **NOTE:** To avoid rule conflicts between TSLint and Prettier follow below steps.

3. Install some packages and update TSLint rules:

   - `npm install --save-dev tslint tslint-config-prettier tslint-eslint-rules tslint-react`
   - Update `./config/tslint.json` file to extend the default linting functionality:

   ```json5
   "lintConfig": {
     "extends": [
       "tslint:latest",
       "tslint-react",
       "tslint-eslint-rules",
       "tslint-config-prettier"
     ],
     "rules": { // ... other rules omitted for brevity
       "quotemark": [true, "single", "jsx-double"]
     }
   }
   ```

#### [Configure precommit hook with Husky, Lint-staged and Prettier](https://github.com/typicode/husky)

1. Install packages: `npm install --save-dev husky lint-staged prettier`
2. Edit the `package.json` file to configure the git hooks as following:

```json5 
  "scripts": { // ... other scripts omitted for brevity
    "precommit": "lint-staged",
  },
  "lint-staged": {
    "*.{json,css,scss,md}": [
      "prettier --write",
      "git add"
    ],
    "*.{js,ts,tsx}": [
      "tslint --fix",
      "prettier --single-quote --parser typescript --write",
      "git add"
    ]
  },
```

3. Now, every time `git commit` command is executed, the staged files will be formatted according to tslint and prettier rules configured.

### Configure Webpart

#### [Configure webpart group](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/simplify-adding-web-parts-with-preconfigured-entries)

On `src/EmployeePerformanceAppWebPart.manifest.json` file, update following properties:

- Group GUID for modern experience:

```json5
  "groupId": "1bc7927e-4a5e-4520-b540-71305c79c20a", // GUID for Planning and process
```

- Group name for classic experience:

```json5
  "group": {
      "default": "[Group-name]",
    },
```

#### [Configure webpart icon](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/configure-web-part-icon)

> **NOTE**: This icon only applies to modern sites.

1. The easiest way to configure a webpart icon is to use an icon name from [Office UI Fabric](https://developer.microsoft.com/en-us/fabric#/styles/icons)
2. On `src/EmployeePerformanceAppWebPart.manifest.json` file, update following property:

```json5
  "officeFabricIconFontName": "[icon-name]",
```

#### [Configure custom App icon](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/notes-on-solution-packaging)

> **NOTE**: This icon only applies to classic sites.

1. Get an image icon with 96px to 96px dimension.
2. Upload the icon to the `sharepoint/images` folder
3. On `config/package-solution.json` file, update the following property to reference the new icon:

```json5
  "iconPath": "images/[icon-name].png",
```

#### [Provisioning SharePoint assets](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/provision-sp-assets-from-package)

This sample webpart provide four different lists to a SharePoint site

1. Add SP List schemas inside the `sharepoint/assets` folder
2. Add a "features" option on `config/package-solution.json` file to reference the lists schemas as follows:

```json5
"solution": { // other attributes omitted for brevity
    "features": [
      {
        "title": "employee-performance-app-assets",
        "description": "List assets for employee performance app",
        "id": "368d2b60-be42-4505-986a-5f775c922780",
        "version": "1.0.0.0",
        "assets": {
          "elementManifests": ["elements.xml"],
          "elementFiles": [
            "employeesListSchema.xml",
            "achievementsListSchema.xml",
            "earnedAchievementsListSchema.xml",
            "performanceSkillsListSchema.xml"
          ]
        }
      }
    ],
  }
```

For more information on how to provision SP assets, please read carefully this [guide](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/provision-sp-assets-from-package) and these samples: [sample 1](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-feature-framework), [sample 2](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-provision-assets).

#### [Localization](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/localize-web-parts?view=sp-typescript-latest)

1. For localization string resources declare the property names of the strings inside the `[webpart]/loc/mystrings.d.ts` file:

```typescript
declare interface IEmployeePerformanceAppWebPartStrings {
  PropertyPaneDescription: string;
  CardsMenuLabel: string;
  InformationMenuLabel: string;
  AchievementsMenuLabel: string;
  PerformanceMenuLabel: string;
  DataProviderGroupName: string;
}
```

2. Add the resources files inside the `[webpart]/loc` folder using LCID named files. example:

   - `en-us.js`: For english
   - `es-es.js`: For spanish

3. To use the string resources import them as following:

```javascript
import * as strings from 'EmployeePerformanceAppWebPartStrings';
```

### Development

#### [Install React Developer Tool](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

#### [Project Scaffolding](https://github.com/agzertuche/SPFx-Learning-Path/blob/master/SPFx/scaffolding.md)

// TODO: Summary of project scaffolding

- Models // TODO: explain models
- Data providers // TODO: explain each data provider
  - Mockup Data
  - [SP REST](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service?view=sp-typescript-latest)
  - [PnP](https://pnp.github.io/pnpjs/)
  - [MSGraph](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-msgraph)
    - [Example](https://github.com/microsoftgraph/msgraph-training-spfx)
- Styles global and specific // TODO: how is configured and why is useful
- Themes // TODO: how to configure and how does it works
  - https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-theme-colors-in-your-customizations?view=sp-typescript-latest
  - https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-themes
- https://github.com/StfBauer/spfx-uifabric-themes/blob/master/docs/css-variables.md

#### [EnvironmentType](https://docs.microsoft.com/en-us/javascript/api/sp-core-library/environmenttype?view=sp-typescript-latest)

// TODO: How to use this property and how is useful

#### [Debugging](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/debug-in-vscode?view=sp-typescript-latest)

// TODO: How to configure debbuging

#### Property pane

// TODO: How to configure property panes for webparts

- Use webpart property pane

Open the property pane to select one data provider to fetch the information, then click on "Apply" button.

// TODO: add gif to show property pane configuration

### Deployment

#### [Useful notes on how to setup the solution package](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/notes-on-solution-packaging?view=sp-typescript-latest)

// TODO: Explain package-solution.json

#### [Export Analyze Package Tool](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/toolchain/optimize-builds-for-production?view=sp-typescript-latest)

- `npm install webpack-bundle-analyzer --save-dev`
  // TODO: Steps to export analyze package

#### [Commands to deploy package](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page?view=sp-typescript-latest)

// TODO: Steps to deploy package

---

## Running this sample webpart

### Prerequisites

- [Set up development environment](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment?view=sp-typescript-latest)

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

- lib/\* - intermediate-stage commonjs build artifacts
- dist/\* - the bundled script, along with other resources
- deploy/\* - all resources which should be uploaded to a CDN.

### Useful Gulp tasks

- `gulp trust-dev-cert`

  Command to install the developer certificate for building your custom solutions easily with HTTPS endpoint.

- `gulp clean`

  Command to clear the temporary build folders and files created in the solution. Some of the folders cleaned up during the process are `temp/` and `dist/`.

- `gulp serve`

  This command executes a series of gulp tasks to create a local, node-based HTTPS server on `localhost:4321` and launches your default browser to preview webparts from your local dev environment. Note: if you see issues with the certificate in the browser, please run `gulp trust-dev-cert` command. The minified assets can be found under the `temp\deploy` directory.

- `gulp bundle`

  Command to build a bundle of your solution.

- `gulp bundle --ship`

  This builds the minified assets required to upload to the CDN provider. The `--ship` indicates the build tool to build for distribution.

- `gulp package-solution`

  This command packages one or more client-side component manifests, such as webparts, along with the feature XML files referenced in the `package-solution.json` configuration file.

- `gulp package-solution --ship`

  Same as the previous command but with `--ship` flag to package minified versions of your components.

- `gulp serve --locale=es-es`

  To specify the locale to be used by the local SharePoint workbench. [More info](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/localize-web-parts)

---

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
