# Employee Performance Webpart Sample 🔥 💼 🚀

Sample SPFx webpart built using React, also illustrating different scenarios to fetch data from SP REST, PnP, MS Graph and Mockup data.

![Alt Text](./EmployeePerformanceApp_Demo.gif)

---

# Features

This webpart illustrates the following concepts on top of the SharePoint Framework:

- Using React for building SharePoint Framework client-side webparts
- Using Office UI Fabric React styles for building user experience consistent with SharePoint and Office
- Communicating with the Microsoft Graph, SharePoint REST API and PnP API
- Passing webpart properties to React components
- Using Chart.js plugin to display chart indicators

---

# Running the webpart

## Prerequisites

- [Set up development environment](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment?view=sp-typescript-latest)

## Building the code

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

## Useful Gulp tasks

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

# Configuration

## Project configuration

### [Integrate TSLint with VSCode](https://joelfmrodrigues.wordpress.com/2017/12/06/tslint-spfx/)

1. Install TSLint extension on VSCode
2. Add a `tslint.json` file on the root of the project to tell the extension to get its rules from the `config` folder:
   ```json5
   {
     rulesDirectory: './config'
   }
   ```

### [Integrate Prettier with VSCode](https://prettier.io/docs/en/editors.html#visual-studio-code)

1. Install Prettier extension: `ext install prettier-vscode`
2. Add a `.prettierrc` file to the root of the project to tell the extension to use the following prettier rules:

   ```json5
   {
     singleQuote: true
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

### [Configure precommit hook with Husky, Lint-staged and Prettier](https://github.com/typicode/husky)

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

## Configure Webpart

### [Configure webpart group](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/simplify-adding-web-parts-with-preconfigured-entries)

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

### [Configure webpart icon](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/configure-web-part-icon)

> **NOTE**: This icon only applies to modern sites.

1. The easiest way to configure a webpart icon is to use an icon name from [Office UI Fabric](https://developer.microsoft.com/en-us/fabric#/styles/icons)
2. On `src/EmployeePerformanceAppWebPart.manifest.json` file, update following property:

```json5
  "officeFabricIconFontName": "[icon-name]",
```

### [Configure custom App icon](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/notes-on-solution-packaging)

> **NOTE**: This icon only applies to classic sites.

1. Get an image icon with 96px to 96px dimension.
2. Upload the icon to the `sharepoint/images` folder
3. On `config/package-solution.json` file, update the following property to reference the new icon:

```json5
  "iconPath": "images/[icon-name].png",
```

### [Provisioning SharePoint assets](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/provision-sp-assets-from-package)

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

### [Localization](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/localize-web-parts?view=sp-typescript-latest)

1. For localization string resources declare the property names of the strings inside the `[webpart]/loc/mystrings.d.ts` file, example:

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

## Development

### [Install React Developer Tool](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

### [Recommended Webpart Scaffolding](https://github.com/agzertuche/SPFx-Learning-Path/blob/master/SPFx/scaffolding.md)

Each folder purpose is described below:
| Folder | Purpose |
| --- | --- |
| data | To store api calls |
| loc | To store localization strings |
| models | To store the models of the objects to use on your webpart code |
| styles | To store global styles and variables of the SCSS of the webpart |
| components | To store all the components that integrate the webpart |

> For more recomendations on how to properly scaffold the project, please read this [document.](https://github.com/agzertuche/SPFx-Learning-Path/blob/master/SPFx/scaffolding.md#project-scaffolding)

### Data Providers

This webpart uses different data providers to fetch data from SharePoint:
| Data Provider | Description |
| --- | --- |
| Mockup Data | Dummy JSON data to easily test the webpart functionality |
| SP REST | Fetch data using SharePoint REST services, more info [here](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service?view=sp-typescript-latest) |
| PnP api | Fetch data using PnP api, more info [here](https://pnp.github.io/pnpjs/) |
| MS Graph | Fetch data using MS Graph api, more info [here](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-msgraph), another spfx project using MS Graph [here](https://github.com/microsoftgraph/msgraph-training-spfx) |

### [EnvironmentType](https://docs.microsoft.com/en-us/javascript/api/sp-core-library/environmenttype?view=sp-typescript-latest)

This property indicates the environment where the SPFx is running and it is pretty useful if the webpart needs to behave different depending the running environment, it has four types and values:

- 0 = Test
- 1 = Local
- 2 = SharePoint
- 3 = ClassicSharePoint

### [Debugging](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/debug-in-vscode?view=sp-typescript-latest)

By default the package template comes with two debug configurations, on for the local workbench and the other onw for the hosted workbench (online).

To debug the code on the **local workbench**, follow the next steps:

1. Add a breakpoint
2. Run this command on the terminal:

```bash
gulp serve --nobrowser
```

3. Press `F5` to start the debbuging option on VSCode
4. On the local workbench, add the webpart to the page

To debug the code on the **hosted workbench**, follow the next steps:

1. Update the `url` property on the `.vscode/launch.json` file

```jason5
  {
    "name": "Hosted workbench",
    "type": "chrome",
    "request": "launch",
    "url": "https://[SharePoint-Site]/_layouts/workbench.aspx",
    ... // other properties omitted for brevity
  }
```

2. Add a breakpoint
3. Run this command on the terminal:

```bash
gulp serve --nobrowser
```

3. Press `F5` to start the debbuging option on VSCode
4. On the hosted workbench, add the webpart to the page

### [Property Pane Configuration](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/simplify-adding-web-parts-with-preconfigured-entries#render-web-part-properties-in-the-property-pane)

This webpart shows how to render a choice property and also to disable the reactive updates form the proerty pane by overriding `disableReactivePropertyChanges` method:

```typescript
  // Override this method to disable reactive property pane
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.DataProviderGroupName,
              groupFields: [
                PropertyPaneChoiceGroup('dataProvider', {
                  options: [
                    { key: DataProvider.MockData, text: 'Mock Data' },
                    { key: DataProvider.MSGraph, text: 'MS Graph' },
                    { key: DataProvider.PnP, text: 'PnP API' },
                    { key: DataProvider.REST, text: 'REST Service' }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
```

To update the DataProvider of the webpart, while running the webpart open the property pane, select one data provider to fetch the information and finally click on "Apply" button.

> For more information regarding property pane configuration go [here](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/simplify-adding-web-parts-with-preconfigured-entries#render-web-part-properties-in-the-property-pane)

## Deployment

### [Commands to deploy package](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page?view=sp-typescript-latest)

1. Bundle the project to verify everything will complie properly by running the following command using `--ship` argument to bundle it in production mode:

```bash
  gulp bundle --ship
```

2. Package the project by running the following command using `--ship` argument to package it in production mode:

```bash
  gulp package-solution --ship
```

3. Upload the `.ppkg` file to the app catalog on your tenant
4. Install the app on your site
5. Add the webpart to a SharePoint page

### [Useful notes on how to setup the solution package](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/notes-on-solution-packaging?view=sp-typescript-latest)

### [Optimize build by using the Analyze Package Tool](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/toolchain/optimize-builds-for-production?view=sp-typescript-latest)

---

# Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
