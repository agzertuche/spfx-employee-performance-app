import { IWebPartContext } from '@microsoft/sp-webpart-base';
import IDataProvider from '../../dataProviders/IDataProvider';
import IAchievement from '../../models/IAchievement';
import IEmployeeInformation from '../../models/IEmployeeInformation';
import IPerformanceSkills from '../../models/IPerformanceSkills';
import IUser from '../../models/IUser';
import { Achievements } from './Achievements';
import { EarnedAchievements } from './EarnedAchievements';
import { EmployeeInformation } from './EmployeeInformation';
import { PerformanceSkills } from './PerformanceSkills';
import { Users } from './Users';

export class MockDataProvider implements IDataProvider {
  private wpContext: IWebPartContext;
  private msTimeout = 500;

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

  private _getUsers(): Promise<IUser[]> {
    return new Promise<IUser[]>(resolve => {
      return setTimeout(() => resolve(Users), this.msTimeout);
    }).catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
  }

  private _getEmployeeInformation(): Promise<IEmployeeInformation[]> {
    return new Promise<IEmployeeInformation[]>(resolve => {
      return setTimeout(() => resolve(EmployeeInformation), this.msTimeout);
    }).catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
  }

  private _getAchievements(): Promise<IAchievement[]> {
    return new Promise<IAchievement[]>(resolve => {
      return setTimeout(() => resolve(Achievements), this.msTimeout);
    }).catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
  }

  private _getEarnedAchievements(): Promise<any[]> {
    return new Promise<any[]>(resolve => {
      return setTimeout(() => resolve(EarnedAchievements), this.msTimeout);
    }).catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
  }

  private _getPerformanceSkills(): Promise<IPerformanceSkills[]> {
    return new Promise<any[]>(resolve => {
      return setTimeout(() => resolve(PerformanceSkills), this.msTimeout);
    }).catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
  }

  public set webPartContext(value: IWebPartContext) {
    this.wpContext = value;
  }

  public get webPartContext(): IWebPartContext {
    return this.wpContext;
  }
}
