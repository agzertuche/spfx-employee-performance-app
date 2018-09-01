import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  Version,
  Environment,
  EnvironmentType,
} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
} from '@microsoft/sp-webpart-base';
import * as strings from 'EmployeePerformanceAppWebPartStrings';
import App, { IAppProps } from './components/App';
import IDataProvider from './models/IDataProvider';
import {
  SPRestDataProvider,
  MSGraphDataProvider,
  SPPnPDataProvider,
  MockDataProvider,
} from './api';
import { IEmployeePerformanceAppProps } from './IEmployeePerformanceAppProps';
import { DataProvider } from './models/Enums';

export default class EmployeePerformanceAppWebPart extends BaseClientSideWebPart<
  IEmployeePerformanceAppProps
> {
  private _dataProvider: IDataProvider;

  protected onInit(): Promise<void> {
    return super.onInit().then(() => {
      /*
      Create the appropriate data provider depending on where the web part is running.
      The DEBUG flag will ensure the mock data provider is not bundled with the web part
      when you package the so lution for distribution, that is,
      using the --ship flag with the package-solution gulp command.
    */
      debugger;
      if (DEBUG && Environment.type === EnvironmentType.Local) {
        this._dataProvider = new MockDataProvider();
      } else {
        switch (this.properties.dataProvider) {
          case DataProvider.MSGraph:
            this._dataProvider = new MSGraphDataProvider(this.context);
            break;
          case DataProvider.PnP:
            this._dataProvider = new SPPnPDataProvider(this.context);
            break;
          case DataProvider.REST:
            this._dataProvider = new SPRestDataProvider();
            break;
          case DataProvider.MockData:
          default:
            this._dataProvider = new MockDataProvider();
            break;
        }
      }
      this._dataProvider.webPartContext = this.context;
      this.context.propertyPane.refresh();
    });
  }

  public render(): void {
    const element: React.ReactElement<IAppProps> = React.createElement(App, {
      dataProvider: this._dataProvider,
    });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  // Override this method to disable reactive property pane
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('dataProvider', {
                  label: strings.DataProviderFieldLabel,
                  options: [
                    { key: DataProvider.MockData, text: 'Mock Data' },
                    { key: DataProvider.MSGraph, text: 'MS Graph' },
                    { key: DataProvider.PnP, text: 'PnP API' },
                    { key: DataProvider.REST, text: 'SP REST Service' },
                  ],
                  selectedKey: DataProvider.MockData,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
