# Employee Performance WebPart

## Summary

Sample SPFx webpart built using React, also illustrating different scenarios to fetch data from SP REST, Axios, MS Graph and Mockup data.

TODO: add a gif to show the webpart functionality

## Features

Sample webpart in this solution illustrates the following concepts on top of the SharePoint Framework:

- Using React for building SharePoint Framework client-side webparts
- Using Office UI Fabric React styles for building user experience consistent with SharePoint and Office
- Communicating with the Microsoft Graph using its REST API
- Passing webpart properties to React components
- TODO: Pending features...

## Getting started

### Prerequisites

- Office 365 subscription with SharePoint Online

### Adding the WebPart to your page

To add this webpart to your site page you have two options :

- Either clone this repository, build the project yourself and connect it to SharePoint (see [officedev documentation](https://dev.office.com/sharepoint/docs/spfx/web-parts/get-started/connect-to-sharepoint))
- Or download the `[webpart-name].sppkg` file available in the `sharepoint/solution` folder of the repository and add it directly in your app catalog in order to be able to use it in your site.

Note: The second method will only work for Office 365 sites since the **.ppkg** file points to an Office 365 public CDN url which expects the referer to come from a valid https://**\*.sharepoint.com\*** url.

### Configuring the WebPart

Configuring the WebPart is quite straightforward:

- TODO: The `Property Name` property Dolor ad dolor aliqua ut culpa irure elit voluptate consequat ipsum enim est dolor dolore.

- TODO: The `Property Name` property Ea ad amet reprehenderit labore eiusmod laborum incididunt qui fugiat sint duis mollit reprehenderit.

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
- `gulp test` : TODO:
- `gulp serve` : This command executes a series of gulp tasks to create a local, node-based HTTPS server on `localhost:4321` and launches your default browser to preview web parts from your local dev environment. Note: if you see issues with the certificate in the browser, please run `gulp trust-dev-cert` command. The minified assets can be found under the `temp\deploy` directory.
- `gulp bundle` : Command to build a bundle of your solution.
- `gulp bundle --ship` : This builds the minified assets required to upload to the CDN provider. The `--ship` indicates the build tool to build for distribution.
- `gulp package-solution` : This command packages one or more client-side component manifests, such as web parts, along with the feature XML files referenced in the `package-solution.json` configuration file.
- `gulp package-solution --ship` : Same as the previous command but with `--ship` flag to package minified versions of your components.
- `gulp serve --locale=es-mx` : To specify the locale to be used by the local SharePoint workbench. [More info](https://github.com/waldekmastykarz/sp-dev-docs/blob/b91c3ecdca7c1f8b0786be365839881a7234b2dd/docs/spfx/web-parts/guidance/localize-web-parts.md)

---

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
