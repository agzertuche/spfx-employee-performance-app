// import axios from 'axios';
// import { IWebPartContext } from '@microsoft/sp-webpart-base';
// import IDataProvider from '../dataProviders/IDataProvider';
// import IUser from '../models/IUser';
// import IEmployee from '../models/IEmployee';
// import IAchievement from '../models/IAchievement';
// import IEmployeeInformation from '../models/IEmployeeInformation';
// import IPerformanceSkills from '../models/IPerformanceSkills';

// /**
//  * MSAL Config - Register your app here: https://apps.dev.microsoft.com/
//  */
// const axiosConfig = {
//     clientID: "6fb66d9b-dbbc-4d93-98d3-6afe146ff1c4", // Azure AD Application
//     redirectUri: location.origin,
//     scopes: ["User.Read", "Sites.Read.All"]
// };

// export class AxiosDataProvider implements IDataProvider {
//   private _users: IUser[];
//   private _achievements: IAchievement[];
//   private _employeeInformation: IEmployeeInformation[];
//   private _earnedAchievements: any[];
//   private _performanceSkills: IPerformanceSkills[];
//   private _webPartContext: IWebPartContext;

//   constructor() {
//     this._users = [];
//     this._achievements = [];
//     this._earnedAchievements = [];
//     this._performanceSkills = [];
//     this._employeeInformation = [];

//     //&redirect_uri=${axiosConfig.redirectUri}
//     //&state=1234
//     debugger;
//     const queryString: string = `?client_id=${axiosConfig.clientID}&response_type=code&scope=User.Read`;
//     const queryUrl: string = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize" + queryString;

//     let token = axios.get(queryUrl)
//     .then((response: any) => {
//       debugger;
//       return response.data.value.map((user: IUser) => {
//         return user;
//       });
//     })
//     .catch((error: any) => {
//       console.error(error);
//     });
//   }

//   private _groupByArray(xs, key) {
//     return xs.reduce((rv, x) => {
//       let v = key instanceof Function ? key(x) : x[key]; let el = rv.find((r) => r && r.key === v);
//       if (el) {
//         el.values.push(x);
//       } else {
//         rv.push({
//           key: v, values: [x] });
//         }
//         return rv;
//       },
//     []);
//   }

//   public set webPartContext(value: IWebPartContext) {
//     this._webPartContext = value;
//   }

//   public get webPartContext(): IWebPartContext {
//     return this._webPartContext;
//   }

//   private _getUsersPhotos(token, users){
//     let promises = users.map((u) => {
//       return this._tryGetUserPhoto(token, u);
//     });

//     return Promise.all(promises);
//   }

//   private _tryGetUserPhoto(token, user) {

//   }

//   //axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
//   //https://graph.microsoft.com/beta/users?$select=displayName,mail,mobilePhone,jobTitle,officeLocation,department
//   private _getUsers(): Promise<IUser[]> {
//     const queryString: string = `?$select=displayName,mail,mobilePhone,jobTitle,officeLocation,department`;
//     const queryUrl: string = "https://graph.microsoft.com/beta/users/" + queryString;

//     const token = "";

//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     return axios.get(queryUrl)
//     .then((response: any) => {
//       return response.data.value.map((user: IUser) => {
//         return user;
//       });
//     })
//     .catch((error: any) => {
//       console.error(error);
//       return error(() => {
//       });
//     });
//   }

//   public getUsers(): Promise<IUser[]> {
//     return this._getUsers();
//   }

//   private _getUser(upn): IUser{
//     return this._users.filter((u) => {
//       if(u.userPrincipalName === upn){
//         return u;
//       }
//     }).pop();
//   }

//   public getEmployees(users: IUser[]): Promise<IEmployee[]> {
//     return this._getEmployees(users);
//   }

//   private _getEmployees(users: IUser[]): Promise<IEmployee[]> {

//     const employees: IEmployee[] = users.map(user => {
//       let employeeInfo = this._employeeInformation.filter(e => user.userPrincipalName === e.userPrincipalName).pop();
//       if(employeeInfo){
//         return {
//           ...user,
//           ...employeeInfo,
//           achievements: this._getEmployeeAchievements(user.userPrincipalName),
//           performanceSkills: this._getEmployeePerformanceSkills(user.userPrincipalName)
//         };
//       }
//     });

//     return new Promise<IEmployee[]>((resolve) => {
//       setTimeout(() => resolve(employees), 500);
//     });
//   }

//   private _convertToEmployees(token, employeesInformation, users) {
//     let promises = users.map((u) => {
//       let ei = employeesInformation.find(x =>
//         x.fields.userPrincipalName.toUpperCase() === u.userPrincipalName.toUpperCase());

//       if(ei) {
//         return {
//           ...u,
//           ...ei,
//           achievements: [],
//           performanceSkills: []
//         };
//       }
//     });

//     return Promise.all(promises);
//   }

//   private _getEmployeePerformanceSkills(userPrincipalName: string): IPerformanceSkills[] {
//     return this._performanceSkills.filter(ps => ps.userPrincipalName === userPrincipalName);
//   }

//   private _getEmployeeAchievements(userPrincipalName: string): IAchievement[] {
//     const earnedAchievements = this._earnedAchievements.filter(a => a.userPrincipalName === userPrincipalName);

//     return this._achievements.filter((a) => {
//       return earnedAchievements.some(x => x.id === a.id);
//     });
//   }

//   public getAchievements(): Promise<IAchievement[]> {
//     return this._getAchievements();
//   }

//   private _getAchievements(): Promise<IAchievement[]> {
//     return new Promise<IAchievement[]>((resolve) => {
//       setTimeout(() => resolve(this._achievements), 500);
//     });
//   }

//   private _getAchievement(achievementId): IAchievement{
//     return this._achievements.filter((a) => {
//       if(a.id === achievementId){
//         return a;
//       }
//     }).pop();
//   }

//   public getMostCompletedAchievements(): Promise<IAchievement[]>{
//     let groupedBy = this._groupByArray(this._earnedAchievements, 'achievementId').sort((a,b) => {
//       return b.values.length - a.values.length;
//     });

//     let achievements: IAchievement[] = groupedBy.map((x) => {
//       return this._getAchievement(x.key);
//     });

//     return new Promise<IAchievement[]>((resolve) => {
//       setTimeout(() => resolve(achievements), 500);
//     });
//   }

//   public getTrendingAchievements(): Promise<IAchievement[]>{
//     let groupedBy = this._earnedAchievements.sort((a,b) => {
//       return b.id - a.id;
//     });

//     let achievements: IAchievement[] = groupedBy.map((x) => {
//       return this._getAchievement(x.achievementId);
//     });

//     return new Promise<IAchievement[]>((resolve) => {
//       setTimeout(() => resolve(achievements), 500);
//     });
//   }

//   public getTopAchievers(): Promise<IUser[]>{
//     let groupedBy = this._groupByArray(this._earnedAchievements, 'userPrincipalName').sort((a,b) => {
//       return b.values.length - a.values.length;
//     });

//     let users: IUser[] = groupedBy.map((x) => {
//       return this._getUser(x.key);
//     });

//     return new Promise<IUser[]>((resolve) => {
//       setTimeout(() => resolve(users), 500);
//     });
//   }

//   public getPerformanceSkills(): Promise<IPerformanceSkills[]>{
//     return this._getPerformanceSkills();
//   }

//   private _getPerformanceSkills(): Promise<IPerformanceSkills[]>{
//     return new Promise<IPerformanceSkills[]>((resolve) => {
//       setTimeout(() => resolve(this._performanceSkills), 500);
//     });
//   }

//   public getEarnedAchievements(): Promise<any[]> {
//     return this._getEarnedAchievements();
//   }

//   private _getEarnedAchievements(): Promise<any[]> {
//     return new Promise<any[]>((resolve) => {
//       setTimeout(() => resolve(this._earnedAchievements), 500);
//     });
//   }
// }
