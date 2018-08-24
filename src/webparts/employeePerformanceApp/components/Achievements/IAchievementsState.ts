import IAchievement from '../../models/IAchievement';

export interface IAchievementsState {
  filterText?: string;
  filteredAchievements?: IAchievement[];
}
