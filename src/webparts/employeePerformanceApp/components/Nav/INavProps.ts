import { MenuItem } from '../../models/Enums';
import * as strings from 'EmployeePerformanceAppWebPartStrings';
export interface INavProps {
  onNavegationItemChange: any;
}

export const MenuItems = [
  {
    itemKey: MenuItem.Cards,
    linkText: strings.CardsMenuLabel,
    itemIcon: 'ContactCard',
  },
  {
    itemKey: MenuItem.Information,
    linkText: strings.InformationMenuLabel,
    itemIcon: 'ThumbnailView',
  },
  {
    itemKey: MenuItem.Achievements,
    linkText: strings.AchievementsMenuLabel,
    itemIcon: 'Trophy',
  },
  {
    itemKey: MenuItem.Performance,
    linkText: strings.PerformanceMenuLabel,
    itemIcon: 'BarChart4',
  },
];
