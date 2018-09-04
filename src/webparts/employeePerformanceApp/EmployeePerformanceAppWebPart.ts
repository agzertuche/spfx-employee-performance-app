import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-webpart-base';
import * as strings from 'EmployeePerformanceAppWebPartStrings';
import App, { IAppProps } from './components/App';
import { IEmployeePerformanceAppProps } from './IEmployeePerformanceAppProps';
import { DataProvider } from './models/Enums';

export default class EmployeePerformanceAppWebPart extends BaseClientSideWebPart<
  IEmployeePerformanceAppProps
> {
  public render(): void {
    const element: React.ReactElement<IAppProps> = React.createElement(App, {
      context: this.context,
      dataProviderType: this.properties.dataProvider || DataProvider.None
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
