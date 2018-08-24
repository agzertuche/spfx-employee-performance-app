import * as React from 'react';
import { IListProps } from './IListProps';
import styles from './styles.module.scss';
import Placeholder from '../../Common/Placeholder';

const List: React.StatelessComponent<IListProps> = props => {
  const { items, title, maxItems } = props;

  List.defaultProps = {
    title: '',
    items: [],
    maxItems: 3,
  };

  return (
    <div className={styles.list}>
      <div className={`${styles.title} ms-font-m`}>{title}</div>
      <div className={`${styles.container} ms-Grid-row`}>
        {items.length === 0 ? (
          <Placeholder icon="DocumentSearch" description="Data not found..." />
        ) : (
          items.slice(0, maxItems)
        )}
      </div>
    </div>
  );
};

export default List;
