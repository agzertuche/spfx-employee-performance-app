import IUser from '../../models/IUser';
import IEmployeeInformation from '../../models/IEmployeeInformation';
import IAchievement from '../../models/IAchievement';
import IPerformanceSkills from '../../models/IPerformanceSkills';

export interface ICardsProps {
  users: IUser[];
  employeeInformation: IEmployeeInformation[];
  earnedAchievements: any[];
  achievements: IAchievement[];
  performanceSkills: IPerformanceSkills[];
}
