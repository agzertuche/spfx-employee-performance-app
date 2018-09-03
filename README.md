# Employee Performance WebPart

## Summary

Sample SPFx webpart built using React, also illustrating different scenarios to fetch data from SP REST, PnP, MS Graph and Mockup data.

![Alt Text](./EmployeePerformanceApp_Demo.gif)

## Prerequisites

- [Set up development environment](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment?view=sp-typescript-latest)

## Features

This web part illustrates the following concepts on top of the SharePoint Framework:

- Using React for building SharePoint Framework client-side webparts
- Using Office UI Fabric React styles for building user experience consistent with SharePoint and Office
- Communicating with the Microsoft Graph using its REST API
- Passing webpart properties to React components

### Solution configuration

- [Lint](https://joelfmrodrigues.wordpress.com/2017/12/06/tslint-spfx/)
- precommit hooks

### Configure Webpart

- Update Manifest EmployeePerformanceAppWebPart.manifest.json:
  - [Change webpart icon](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/configure-web-part-icon)
  - [Configure webpart group](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/simplify-adding-web-parts-with-preconfigured-entries)
- Update package solution config/package-solution.json
  - Sharepoint folder assets
  - [Configure webpart logo](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/notes-on-solution-packaging)
  - [Provisioning list assets needed for the webpart](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/provision-sp-assets-from-package)
- [Localization](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/localize-web-parts?view=sp-typescript-latest)
- Property pane
- [CDN](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/hosting-webpart-from-office-365-cdn)

### Development

- React Developer Tool
- TypeScript Interfaces
- Scaffolding
  - Models
  - Data providers - Mockup Data
    - [SP REST](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service?view=sp-typescript-latest) - [PnP](https://pnp.github.io/pnpjs/) - MSGraph - https://github.com/microsoftgraph/msgraph-training-spfx - https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-msgraph
      Styles global and specific
  - Themes
    - https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-theme-colors-in-your-customizations?view=sp-typescript-latest
    - https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-themes
  - https://github.com/StfBauer/spfx-uifabric-themes/blob/master/docs/css-variables.md
- [EnvironmentType](https://docs.microsoft.com/en-us/javascript/api/sp-core-library/environmenttype?view=sp-typescript-latest)
- [Debugging](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/debug-in-vscode?view=sp-typescript-latest)

### Deployment

- [Setup](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/notes-on-solution-packaging?view=sp-typescript-latest)
- [Analyze package](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/toolchain/optimize-builds-for-production?view=sp-typescript-latest)
  - `npm install webpack-bundle-analyzer --save-dev`
- [Deploy](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page?view=sp-typescript-latest)

## Getting started

### Prerequisites

- Office 365 subscription with SharePoint Online

### Adding the WebPart to your page

To add this webpart to your site page you have two options :

- Either clone this repository, build the project yourself and connect it to SharePoint (see [officedev documentation](https://dev.office.com/sharepoint/docs/spfx/web-parts/get-started/connect-to-sharepoint))
- Or download the `[webpart-name].sppkg` file available in the `sharepoint/solution` folder of the repository and add it directly in your app catalog in order to be able to use it in your site.

Note: The second method will only work for Office 365 sites since the **.ppkg** file points to an Office 365 public CDN url which expects the referer to come from a valid https://**\*.sharepoint.com\*** url.

### Configuring the WebPart

Open the property pane to select one data provider to fetch the information, then click on "Apply" button.

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

#### Useful Gulp tasks

- `gulp trust-dev-cert` : Command to install the developer certificate for building </ br> your custom solutions easily with HTTPS endpoint.
- `gulp clean` : Command to clear the temporary build folders and files created in the solution. Some of the folders cleaned up during the process are `temp/` and `dist/`.
- `gulp serve` : This command executes a series of gulp tasks to create a local, node-based HTTPS server on `localhost:4321` and launches your default browser to preview web parts from your local dev environment. Note: if you see issues with the certificate in the browser, please run `gulp trust-dev-cert` command. The minified assets can be found under the `temp\deploy` directory.
- `gulp bundle` : Command to build a bundle of your solution.
- `gulp bundle --ship` : This builds the minified assets required to upload to the CDN provider. The `--ship` indicates the build tool to build for distribution.
- `gulp package-solution` : This command packages one or more client-side component manifests, such as web parts, along with the feature XML files referenced in the `package-solution.json` configuration file.
- `gulp package-solution --ship` : Same as the previous command but with `--ship` flag to package minified versions of your components.
- `gulp serve --locale=es-es` : To specify the locale to be used by the local SharePoint workbench. [More info](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/localize-web-parts)

---

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
