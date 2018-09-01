import { IWebPartContext } from '@microsoft/sp-webpart-base';
import IUser from './IUser';
import IEmployeeInformation from './IEmployeeInformation';
import IAchievement from './IAchievement';
import IPerformanceSkills from './IPerformanceSkills';

interface IDataProvider {
  webPartContext: IWebPartContext;
  getUsers(): Promise<IUser[]>;
  getEmployeeInformation(): Promise<IEmployeeInformation[]>;
  getAchievements(): Promise<IAchievement[]>;
  getPerformanceSkills(): Promise<IPerformanceSkills[]>;
  getEarnedAchievements(): Promise<any[]>;
}

export default IDataProvider;
