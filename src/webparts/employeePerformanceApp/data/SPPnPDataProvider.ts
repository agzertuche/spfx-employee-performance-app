import { sp } from '@pnp/sp';
import IDataProvider from '../models/IDataProvider';
import IUser from '../models/IUser';
import IEmployeeInformation from '../models/IEmployeeInformation';
import IAchievement from '../models/IAchievement';
import IPerformanceSkills from '../models/IPerformanceSkills';
import { List } from '../models/Enums';

export default class SPPnPDataProvider implements IDataProvider {
  constructor(context) {
    sp.setup({
      spfxContext: context,
    });
  }

  private _getUsers(): Promise<IUser[]> {
    return new Promise<IUser[]>((resolve, reject) => {
      sp.site.rootWeb.siteUsers
        .filter(`substringof('membership',LoginName) eq true`)
        .get()
        .then(results => {
          resolve(
            results.map(
              (r: any): IUser => {
                return {
                  ...r,
                  id: r.Id,
                  displayName: r.Title,
                  imageUrl: r.PictureUrl,
                  mail: r.Email,
                  userPrincipalName: r.LoginName.replace(
                    'i:0#.f|membership|',
                    '',
                  ),
                };
              },
            ),
          );
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
    });
  }

  private _getEmployeeInformation(): Promise<IEmployeeInformation[]> {
    return sp.web.lists.getByTitle(List.Employees).items.getAll();
  }

  private _getAchievements(): Promise<IAchievement[]> {
    return sp.web.lists
      .getByTitle(List.Achievements)
      .items.getAll()
      .then(results => {
        return results.map(x => {
          return {
            ...x,
            id: x.ID,
            title: x.Title,
          };
        });
      });
  }

  private _getEarnedAchievements(): Promise<any[]> {
    return sp.web.lists
      .getByTitle(List.EarnedAchievements)
      .items.getAll()
      .then(results => {
        return results.map(x => {
          return {
            ...x,
            id: x.ID,
          };
        });
      });
  }

  private _getPerformanceSkills(): Promise<IPerformanceSkills[]> {
    return sp.web.lists.getByTitle(List.PerformanceSkills).items.getAll();
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
