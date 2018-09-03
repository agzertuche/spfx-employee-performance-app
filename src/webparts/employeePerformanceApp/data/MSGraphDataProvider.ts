import { MSGraphClient } from '@microsoft/sp-client-preview';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import IDataProvider from '../models/IDataProvider';
import IUser from '../models/IUser';
import IEmployeeInformation from '../models/IEmployeeInformation';
import IAchievement from '../models/IAchievement';
import IPerformanceSkills from '../models/IPerformanceSkills';

export default class MSGraphDataProvider implements IDataProvider {
  private _context;
  private _client: MSGraphClient;

  constructor(context: BaseComponentContext) {
    this._context = context;
    this._client = context.serviceScope.consume(MSGraphClient.serviceKey);
  }

  public getUsers(): Promise<IUser[]> {
    return this._getUsers();
  }

  private _getUsers(): Promise<any[]> {
    return new Promise<IUser[]>((resolve, reject) => {
      this._client
        .api('/users')
        .version('beta')
        .get((error, response) => {
          if (error) {
            reject(error);
          }

          resolve(response.value);
        });
    });
  }

  public getEmployeeInformation(): Promise<IEmployeeInformation[]> {
    return this._getEmployeeInformation();
  }

  public getAchievements(): Promise<IAchievement[]> {
    return this._getAchievements();
  }

  public getEarnedAchievements(): Promise<any[]> {
    return this._getEarnedAchievements();
  }

  public getPerformanceSkills(): Promise<IPerformanceSkills[]> {
    return this._getPerformanceSkills();
  }

  private _getEmployeeInformation(): Promise<IEmployeeInformation[]> {
    return this._context.spHttpClient
      .get(
        `${
          this._context.pageContext.web.absoluteUrl
        }/_api/lists/GetByTitle('Employees')/items`,
        SPHttpClient.configurations.v1,
        {},
      )
      .then(
        (
          response: SPHttpClientResponse,
        ): Promise<{ value: IEmployeeInformation[] }> => {
          return response.json();
        },
      )
      .then((response: { value: IEmployeeInformation[] }) => {
        return response.value;
      })
      .catch(error => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  private _getAchievements(): Promise<IAchievement[]> {
    return this._context.spHttpClient
      .get(
        `${
          this._context.pageContext.web.absoluteUrl
        }/_api/lists/GetByTitle('Achievements')/items`,
        SPHttpClient.configurations.v1,
        {},
      )
      .then(
        (
          response: SPHttpClientResponse,
        ): Promise<{ value: IAchievement[] }> => {
          return response.json();
        },
      )
      .then((response: { value: any[] }) => {
        return response.value.map(x => {
          return {
            ...x,
            id: x.ID,
            title: x.Title,
          };
        });
      })
      .catch(error => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  private _getEarnedAchievements(): Promise<any[]> {
    return this._context.spHttpClient
      .get(
        `${
          this._context.pageContext.web.absoluteUrl
        }/_api/lists/GetByTitle('Earned Achievements')/items`,
        SPHttpClient.configurations.v1,
        {},
      )
      .then(
        (response: SPHttpClientResponse): Promise<{ value: any[] }> => {
          return response.json();
        },
      )
      .then((response: { value: any[] }) => {
        return response.value.map(x => {
          return {
            ...x,
            id: x.ID,
          };
        });
      })
      .catch(error => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  private _getPerformanceSkills(): Promise<IPerformanceSkills[]> {
    return this._context.spHttpClient
      .get(
        `${
          this._context.pageContext.web.absoluteUrl
        }/_api/lists/GetByTitle('Performance Skills')/items`,
        SPHttpClient.configurations.v1,
        {},
      )
      .then(
        (
          response: SPHttpClientResponse,
        ): Promise<{ value: IPerformanceSkills[] }> => {
          return response.json();
        },
      )
      .then((response: { value: IPerformanceSkills[] }) => {
        return response.value.map(x => x);
      })
      .catch(error => {
        console.error(error);
        return Promise.reject(error);
      });
  }
}
