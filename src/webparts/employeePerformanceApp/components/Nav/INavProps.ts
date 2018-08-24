import { MenuItem } from '../../models/Enums';

export interface INavProps {
  onNavegationItemChange: any;
}

export const MenuItems = [
  {
    itemKey: MenuItem.Cards,
    linkText: 'Cards',
    itemIcon: 'ContactCard',
  },
  {
    itemKey: MenuItem.Information,
    linkText: 'Information',
    itemIcon: 'ThumbnailView',
  },
  {
    itemKey: MenuItem.Achievements,
    linkText: 'Achievements',
    itemIcon: 'Trophy',
  },
  {
    itemKey: MenuItem.Performance,
    linkText: 'Performance',
    itemIcon: 'BarChart4',
  },
];
