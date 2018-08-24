import { IWebPartContext } from '@microsoft/sp-webpart-base';
import IUser from '../models/IUser';
import IEmployeeInformation from '../models/IEmployeeInformation';
import IAchievement from '../models/IAchievement';
import IPerformanceSkills from '../models/IPerformanceSkills';

interface IDataProvider {
  webPartContext: IWebPartContext;
  getUsers(): Promise<IUser[]>;
  getEmployeeInformation(): Promise<IEmployeeInformation[]>;
  getAchievements(): Promise<IAchievement[]>;
  getPerformanceSkills(): Promise<IPerformanceSkills[]>;
  getEarnedAchievements(): Promise<any[]>;
}

export default IDataProvider;
