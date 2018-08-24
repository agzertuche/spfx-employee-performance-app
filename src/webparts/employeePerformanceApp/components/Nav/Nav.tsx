import * as React from 'react';
import styles from './styles.module.scss';
import { INavProps, MenuItems } from './INavProps';
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize,
  IPivotItemProps,
} from 'office-ui-fabric-react/lib/Pivot';
import { Icon } from 'office-ui-fabric-react';

const Nav: React.StatelessComponent<INavProps> = props => {
  const { onNavegationItemChange } = props;

  const onMenuItemClick = item => {
    onNavegationItemChange(item);
  };

  const customRenderer = (link: IPivotItemProps) => {
    return (
      <span className={styles.menuItem}>
        <Icon iconName={link.itemIcon} />
        <span className={'ms-u-hiddenMdDown'}>{link.linkText}</span>
      </span>
    );
  };

  const pivotItems = MenuItems.map(item => {
    return (
      <PivotItem
        itemKey={item.itemKey.toString()}
        key={item.itemKey.toString()}
        itemIcon={item.itemIcon}
        linkText={item.linkText}
        onRenderItemLink={customRenderer}
      />
    );
  });

  return (
    <div className={styles.nav}>
      <Pivot
        linkFormat={PivotLinkFormat.tabs}
        linkSize={PivotLinkSize.large}
        headersOnly
        onLinkClick={onMenuItemClick}
      >
        {pivotItems}
      </Pivot>
    </div>
  );
};

export default Nav;
