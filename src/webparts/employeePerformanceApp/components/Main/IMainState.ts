import IUser from '../../models/IUser';
import IEmployeeInformation from '../../models/IEmployeeInformation';
import IAchievement from '../../models/IAchievement';
import IPerformanceSkills from '../../models/IPerformanceSkills';
import { ComponentStatus, MenuItem } from '../../models/Enums';

export interface IMainState {
  // Data
  users?: IUser[];
  employeeInformation?: IEmployeeInformation[];
  achievements?: IAchievement[];
  performanceSkills?: IPerformanceSkills[];
  earnedAchievements?: any[];

  // Navigation
  selectedComponent?: MenuItem;
  componentStatus?: ComponentStatus;
}
