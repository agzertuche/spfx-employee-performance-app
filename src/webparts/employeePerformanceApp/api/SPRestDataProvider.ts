import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import IDataProvider from './IDataProvider';
import IUser from '../models/IUser';
import IEmployeeInformation from '../models/IEmployeeInformation';
import IAchievement from '../models/IAchievement';
import IPerformanceSkills from '../models/IPerformanceSkills';

export default class SPRestDataProvider implements IDataProvider {
  private _webPartContext: IWebPartContext;

  private _getUsers(): Promise<IUser[]> {
    return new Promise<any[]>((resolve, reject) => {
      this._webPartContext.spHttpClient
        .get(
          `${
            this._webPartContext.pageContext.web.absoluteUrl
          }/_api/lists/GetByTitle('Employees')/items`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              Accept: 'application/json;odata=nometadata',
              'odata-version': '',
            },
          },
        )
        .then(
          (response: SPHttpClientResponse): Promise<{ value: IUser[] }> => {
            return response.json();
          },
        )
        .then((response: { value: IUser[] }) => {
          resolve(response.value);
          // return response.value.map((user: IUser) => {
          //   return user;
          // });
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
    });
  }

  private _getEmployeeInformation(): Promise<IEmployeeInformation[]> {
    return this._webPartContext.spHttpClient
      .get(
        `${
          this._webPartContext.pageContext.web.absoluteUrl
        }/_api/lists/GetByTitle('Employees')/items`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: 'application/json;odata=nometadata',
            'odata-version': '',
          },
        },
      )
      .then(
        (response: SPHttpClientResponse): Promise<{ value: IUser[] }> => {
          return response.json();
        },
      )
      .then((response: { value: IUser[] }) => {
        Promise.resolve(response);
        // return response.value.map((user: IUser) => {
        //   return user;
        // });
      })
      .catch(error => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  private _getAchievements(): Promise<IAchievement[]> {
    return this._webPartContext.spHttpClient
      .get(
        `${
          this._webPartContext.pageContext.web.absoluteUrl
        }/_api/lists/GetByTitle('Employees')/items`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: 'application/json;odata=nometadata',
            'odata-version': '',
          },
        },
      )
      .then(
        (response: SPHttpClientResponse): Promise<{ value: IUser[] }> => {
          return response.json();
        },
      )
      .then((response: { value: IUser[] }) => {
        return response.value.map((user: IUser) => {
          return user;
        });
      })
      .catch(error => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  private _getEarnedAchievements(): Promise<any[]> {
    return this._webPartContext.spHttpClient
      .get(
        `${
          this._webPartContext.pageContext.web.absoluteUrl
        }/_api/lists/GetByTitle('Employees')/items`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: 'application/json;odata=nometadata',
            'odata-version': '',
          },
        },
      )
      .then(
        (response: SPHttpClientResponse): Promise<{ value: IUser[] }> => {
          return response.json();
        },
      )
      .then((response: { value: IUser[] }) => {
        return response.value.map((user: IUser) => {
          return user;
        });
      })
      .catch(error => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  private _getPerformanceSkills(): Promise<IPerformanceSkills[]> {
    return this._webPartContext.spHttpClient
      .get(
        `${
          this._webPartContext.pageContext.web.absoluteUrl
        }/_api/lists/GetByTitle('Employees')/items`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: 'application/json;odata=nometadata',
            'odata-version': '',
          },
        },
      )
      .then(
        (response: SPHttpClientResponse): Promise<{ value: IUser[] }> => {
          return response.json();
        },
      )
      .then((response: { value: IUser[] }) => {
        return response.value.map((user: IUser) => {
          return user;
        });
      })
      .catch(error => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  public set webPartContext(value: IWebPartContext) {
    this._webPartContext = value;
  }

  public get webPartContext(): IWebPartContext {
    return this._webPartContext;
  }

  public getUsers(): Promise<IUser[]> {
    return this._getUsers();
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
}
