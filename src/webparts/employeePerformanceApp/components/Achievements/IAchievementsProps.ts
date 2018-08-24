import IAchievement from '../../models/IAchievement';
import IUser from '../../models/IUser';

export interface IAchievementsProps {
  achievements: IAchievement[];
  earnedAchievements?: any[];
  users?: IUser[];
}
