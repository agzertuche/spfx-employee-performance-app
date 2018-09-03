import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import IDataProvider from '../models/IDataProvider';
import IUser from '../models/IUser';
import IEmployeeInformation from '../models/IEmployeeInformation';
import IAchievement from '../models/IAchievement';
import IPerformanceSkills from '../models/IPerformanceSkills';

export default class SPRestDataProvider implements IDataProvider {
  private _context: any;
  constructor(context) {
    this._context = context;
  }

  private _getUsers(): Promise<IUser[]> {
    return new Promise<any[]>((resolve, reject) => {
      this._context.spHttpClient
        .get(
          `
          ${this._context.pageContext.web.absoluteUrl}/_api/web/siteusers`,
          SPHttpClient.configurations.v1,
          {},
        )
        .then((response: SPHttpClientResponse) => {
          return response.json();
        })
        .then(response => {
          return response.value.filter(user =>
            user.LoginName.includes('membership'),
          );
        })
        .then(users => {
          const usersFromUPS = users.map(user => {
            return this._context.spHttpClient
              .get(
                `${
                  this._context.pageContext.web.absoluteUrl
                }/_api/SP.UserProfiles.PeopleManager/getpropertiesfor(@v)?@v='${encodeURIComponent(
                  user.LoginName,
                )}'`,
                SPHttpClient.configurations.v1,
                {},
              )
              .then(response => {
                return response.json();
              })
              .then(result => {
                return result;
              });
          });

          return Promise.all(usersFromUPS);
        })
        .then(results => {
          resolve(
            results.map((r: any) => {
              return {
                id: r.UserProfileProperties[0].Value, //GUID
                displayName: r.DisplayName,
                imageUrl: r.PictureUrl,
                mail: r.Email,
                mobilePhone: r.UserProfileProperties[10].Value,
                jobTitle: r.Title,
                officeLocation: r.UserProfileProperties[61].Value,
                department: r.UserProfileProperties[11].Value,
                userPrincipalName: r.UserProfileProperties[18].Value,
              };
            }),
          );
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
    });
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
