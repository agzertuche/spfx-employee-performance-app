// import { GraphHttpClient, GraphClientResponse } from '@microsoft/sp-http';
// import { IWebPartContext } from '@microsoft/sp-webpart-base';
// import IDataProvider from '../dataProviders/IDataProvider';
// import IUser from '../models/IUser';
// import IEmployee from '../models/IEmployee';

// export default class SharePointDataProvider implements IDataProvider {
//   private _webPartContext: IWebPartContext;

//   public set webPartContext(value: IWebPartContext) {
//     this._webPartContext = value;
//   }

//   public get webPartContext(): IWebPartContext {
//     return this._webPartContext;
//   }

//   public getUsers(): Promise<IUser[]> {
//     return this._getUsers(this.webPartContext.graphHttpClient);
//   }

//   // to get photo: https://graph.microsoft.com/v1.0/users/admin@agzertuche.onmicrosoft.com/photo/$value
//   // use /_api/SP.OAuth.Token/Acquire to get token
//   //https://graph.microsoft.com/beta/users?$select=displayName,mail,mobilePhone,jobTitle,officeLocation,department
//   private _getUsers(requester: GraphHttpClient): Promise<IUser[]> {
//     const queryString: string = `?$select=displayName,mail,mobilePhone,jobTitle,officeLocation,department`;
//     //const queryUrl: string = "beta/users" + queryString;
//     const queryUrl: string = "beta/groups"

//     //https://dev.office.com/sharepoint/docs/spfx/call-microsoft-graph-using-graphhttpclient
//     return requester.get(queryUrl, GraphHttpClient.configurations.v1)
//       .then((response: GraphClientResponse): Promise<any> => {
//         if (response.ok) {
//           console.info(response.json());
//           return response.json();
//         } else {
//           console.warn(response.statusText);
//         }
//       })
//       .then((data: any) => {
//         return data.value.map((user: IUser) => {
//           return user;
//         });
//       });
//   }
// }
