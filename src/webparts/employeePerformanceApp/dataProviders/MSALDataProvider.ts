// import { HttpClient } from '@microsoft/sp-http';
// import { IWebPartContext } from '@microsoft/sp-webpart-base';
// import { UserAgentApplication } from 'msalx';
// import IDataProvider from '../dataProviders/IDataProvider';
// import IAchievement from '../models/IAchievement';
// import IEmployee from '../models/IEmployee';
// import IEmployeeInformation from '../models/IEmployeeInformation';
// import IPerformanceSkills from '../models/IPerformanceSkills';
// import IUser from '../models/IUser';

// // MSAL Config - Register your app here: https://apps.dev.microsoft.com/
// const msalconfig = {
//     clientID: '6fb66d9b-dbbc-4d93-98d3-6afe146ff1c4', // Azure AD Application
//     redirectUri: location.origin,
//     scopes: [
//       "User.Read",
//       "Sites.Read.All",
//     ],
// };

// export class MSALDataProvider implements IDataProvider {
//   private wpContext: IWebPartContext;
//   private users: IUser[];
//   private achievements: IAchievement[];
//   private employeeInformation: IEmployeeInformation[];
//   private earnedAchievements: any[];
//   private performanceSkills: IPerformanceSkills[];
//   private clientApplication: UserAgentApplication;

//   constructor() {
//     this.users = [];
//     this.achievements = [];
//     this.earnedAchievements = [];
//     this.performanceSkills = [];
//     this.employeeInformation = [];

//     // Initialize the user agent application for MSAL
//     if (!this.clientApplication) {
//       this.clientApplication = new UserAgentApplication(msalconfig.clientID,
//         null, (errorDesc, token, error, tokenType) => {
//         // Called after loginRedirect or acquireTokenPopup
//         console.error(
//           errorDesc,
//           token,
//           error,
//           tokenType
//         );
//       });

//       if (!this.clientApplication.getUser()) {
//         this.clientApplication.loginPopup(msalconfig.scopes);
//       }
//     }
//   }

//   private groupByArray(xs, key) {
//     return xs.reduce((rv, x) => {
//       const v = key instanceof Function ? key(x) : x[key]; const el = rv.find(r => r && r.key === v);
//       if (el) {
//         el.values.push(x);
//       } else {
//         rv.push({
//           key: v, values: [x] });
//         }
//       return rv;
//       },
//     []);
//   }

//   public set webPartContext(value: IWebPartContext) {
//     this.wpContext = value;
//   }

//   public get webPartContext(): IWebPartContext {
//     return this.wpContext;
//   }

//   private _getUsersPhotos(token, users) {
//     const promises = users.map(u => {
//       return this._tryGetUserPhoto(token, u);
//     });

//     return Promise.all(promises);
//   }

//   private _tryGetUserPhoto(token, user) {
//     return this.webPartContext.httpClient.get(
//       `https://graph.microsoft.com/beta/users/${user.userPrincipalName}/photo/$value`, HttpClient.configurations.v1, {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Photo not found for user: ");
//       }

//       return response.blob();
//     })
//     .then(image => {
//       user.imageUrl = window.URL.createObjectURL(image);
//       return user;
//     })
//     .catch(error => {
//       console.error(error, user.userPrincipalName);
//       return user;
//     });
//   }

//   public getEmployeeInformation(): Promise<IEmployeeInformation[]> {
//     return this._getEmployeeInformation();
//   }

//   private _getEmployeeInformation(): Promise<IEmployeeInformation[]> {
//     return new Promise<IEmployeeInformation[]>(resolve => {
//       return setTimeout(() => resolve([]), 500);
//     }).catch(error => {
//       console.error(error);
//       return Promise.reject(error);
//     });
//   }

//   public getUsers(): Promise<IUser[]> {
//     return this.clientApplication.acquireTokenSilent(msalconfig.scopes).then((token: string) => {
//       return this._getUsers(token);
//     }, error => {
//       // Interaction required
//       if (error) {
//         this.clientApplication.acquireTokenPopup(msalconfig.scopes).then((token: string) => {
//           return this._getUsers(token);
//         }, (err: string) => {
//           // Something went wrong
//           console.error(err);
//           return Promise.reject(err);
//         });
//       }
//     });
//   }

//   private _getUsers(token): Promise<IUser[]> {
//     // Call the Microsoft Graph
//     return this.webPartContext.httpClient.get('https://graph.microsoft.com/beta/users/', HttpClient.configurations.v1, {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw response.statusText;
//       }
//       return response.json();
//     })
//     .then(result => {
//       return this._getUsersPhotos(token, result.value);
//     })
//     .catch(err => {
//       console.error(err);
//       return Promise.reject(err);
//     });
//   }

//   private getUser(upn): IUser {
//     return this.users.filter(u => {
//       if (u.userPrincipalName === upn) {
//         return u;
//       }
//     }).pop();
//   }

//   public getEmployees(users: IUser[]): Promise<IEmployee[]> {
//     return this.clientApplication.acquireTokenSilent(msalconfig.scopes).then((token: string) => {
//       return this._getEmployeesInformation(token, users);
//     }, error => {
//       // Interaction required
//       if (error) {
//         this.clientApplication.acquireTokenPopup(msalconfig.scopes).then((token: string) => {
//           return this._getEmployeesInformation(token, users);
//         }, (err: string) => {
//           // Something went wrong
//           console.error(err);
//           return Promise.reject(err);
//         });
//       }
//     });
//   }

//   private _getEmployeesInformation(token, users): Promise<IEmployee[]> {
//     // Call the Microsoft Graph
//     // this._webPartContext.pageContext.site.id
//     // https://graph.microsoft.com/beta/sites/agzertuche.sharepoint.com:/teams/NewTeamSite:/lists/employees/items?$expand=fields & $filter=fields/userPrincipalName eq 'arturo@agzertuche.onmicrosoft.com' or fields/userPrincipalName eq 'asdf'
//     // https://graph.microsoft.com/beta/sites/{hostname},{spsite-id},{spweb-id}/
//     return this.webPartContext.httpClient.get(
//       `https://graph.microsoft.com/beta/sites/agzertuche.sharepoint.com:/teams/NewTeamSite:/lists/employees/items?expand=fields`,
//       HttpClient.configurations.v1, {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw response.statusText;
//       }
//       return response.json();
//     })
//     .then(result => {
//       if (result.value.length === 0) {
//         throw new Error(`Couldn't get employees information`);
//       }

//       return this._convertToEmployees(token, result.value, users);
//     })
//     .catch(err => {
//       console.error(err);
//       return Promise.reject(err);
//     });
//   }

//   private _convertToEmployees(token, employeesInformation, users) {
//     const promises = users.map(u => {
//       const ei = employeesInformation.find(x =>
//         x.fields.userPrincipalName.toUpperCase() === u.userPrincipalName.toUpperCase());

//       if (ei) {
//         return {
//           ...u,
//           ...ei,
//           achievements: this._getEmployeeAchievements(u.userPrincipalName),
//           performanceSkills: this._getEmployeePerformanceSkills(u.userPrincipalName),
//         };
//       }
//     });

//     return Promise.all(promises);
//   }

//   private _getEmployeePerformanceSkills(userPrincipalName: string): IPerformanceSkills[] {
//     return this.performanceSkills.filter(ps => ps.userPrincipalName === userPrincipalName);
//   }

//   private _getEmployeeAchievements(userPrincipalName: string): IAchievement[] {
//     const earnedAchievements = this.earnedAchievements.filter(a => a.userPrincipalName === userPrincipalName);

//     return this.achievements.filter(a => {
//       return earnedAchievements.some(x => x.id === a.id);
//     });
//   }

//   public getAchievements(): Promise<IAchievement[]> {
//     return this._getAchievements();
//   }

//   private _getAchievements(): Promise<IAchievement[]> {
//     return new Promise<IAchievement[]>(resolve => {
//       setTimeout(() => resolve(this.achievements), 500);
//     });
//   }

//   private _getAchievement(achievementId): IAchievement {
//     return this.achievements.filter(a => {
//       if (a.id === achievementId) {
//         return a;
//       }
//     }).pop();
//   }

//   public getMostCompletedAchievements(): Promise<IAchievement[]> {
//     const groupedAchievements = this.groupByArray(this.earnedAchievements, 'achievementId').sort((a, b) => {
//       return b.values.length - a.values.length;
//     });

//     const achievements: IAchievement[] = groupedAchievements.map(x => {
//       return this._getAchievement(x.key);
//     });

//     return new Promise<IAchievement[]>(resolve => {
//       setTimeout(() => resolve(achievements), 500);
//     });
//   }

//   public getTrendingAchievements(): Promise<IAchievement[]> {
//     const groupedAchievements = this.earnedAchievements.sort((a, b) => {
//       return b.id - a.id;
//     });

//     const achievements: IAchievement[] = groupedAchievements.map(x => {
//       return this._getAchievement(x.achievementId);
//     });

//     return new Promise<IAchievement[]>(resolve => {
//       setTimeout(() => resolve(achievements), 500);
//     });
//   }

//   public getTopAchievers(): Promise<IUser[]> {
//     const userAchievements = this.groupByArray(this.earnedAchievements, 'userPrincipalName').sort((a, b) => {
//       return b.values.length - a.values.length;
//     });

//     const users: IUser[] = userAchievements.map(x => {
//       return this.getUser(x.key);
//     });

//     return new Promise<IUser[]>(resolve => {
//       setTimeout(() => resolve(users), 500);
//     });
//   }

//   public getPerformanceSkills(): Promise<IPerformanceSkills[]> {
//     return this._getPerformanceSkills();
//   }

//   private _getPerformanceSkills(): Promise<IPerformanceSkills[]> {
//     return new Promise<IPerformanceSkills[]>(resolve => {
//       setTimeout(() => resolve(this.performanceSkills), 500);
//     });
//   }

//   public getEarnedAchievements(): Promise<any[]> {
//     return this._getEarnedAchievements();
//   }

//   private _getEarnedAchievements(): Promise<any[]> {
//     return new Promise<any[]>(resolve => {
//       setTimeout(() => resolve(this.earnedAchievements), 500);
//     });
//   }
// }
