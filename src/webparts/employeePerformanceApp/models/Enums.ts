export enum ComponentStatus {
  Loading,
  Completed,
  Error,
  MissingConfiguration,
}

export enum Size {
  XXSmall,
  XSmall,
  Small,
  Medium,
  Large,
  XLarge,
  XXLarge,
}

export enum MenuItem {
  Cards,
  Information,
  Achievements,
  Performance,
}

export enum DataProvider {
  None,
  MockData,
  REST,
  MSGraph,
  PnP,
}

export enum List {
  Achievements = 'Achievements',
  EarnedAchievements = 'Earned Achievements',
  Employees = 'Employees',
  PerformanceSkills = 'Performance Skills',
}
