import IAchievement from './IAchievement';
import IEmployeeInformation from './IEmployeeInformation';
import IPerformanceSkills from './IPerformanceSkills';
import IUser from './IUser';

interface IEmployee extends IUser, IEmployeeInformation {
  achievements?: IAchievement[];
  performanceSkills?: IPerformanceSkills[];
}

export default IEmployee;
