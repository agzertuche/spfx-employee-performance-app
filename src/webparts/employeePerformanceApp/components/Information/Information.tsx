import * as React from 'react';
import { IInformationProps } from './IInformationProps';
import { IInformationState } from './IInformationState';
import styles from './styles.module.scss';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import {
  DetailsList,
  buildColumns,
} from 'office-ui-fabric-react/lib/DetailsList';
import Placeholder from '../Common/Placeholder';

let rowItems: any[];

export default class Information extends React.Component<
  IInformationProps,
  IInformationState
> {
  constructor(props: IInformationProps) {
    super(props);

    rowItems = rowItems || this.props.users;

    this._onColumnClick = this._onColumnClick.bind(this);

    this.state = {
      sortedItems: rowItems,
      columns: _buildColumns(),
    };
  }

  private _onColumnClick(event, column) {
    const { sortedItems, columns } = this.state;
    let isSortedDescending = column.isSortedDescending;

    // If we've sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    const newSortedItems = sortedItems.concat([]).sort((a, b) => {
      const firstValue = a[column.fieldName];
      const secondValue = b[column.fieldName];

      if (isSortedDescending) {
        return firstValue > secondValue ? -1 : 1;
      } else {
        return firstValue > secondValue ? 1 : -1;
      }
    });

    // Reset the items and columns to match the state.
    this.setState({
      sortedItems: newSortedItems,
      columns: columns.map(col => {
        col.isSorted = col.key === column.key;

        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }

        return col;
      }),
    });
  }

  public render(): React.ReactElement<{}> {
    const { sortedItems, columns } = this.state;

    return (
      <div className={styles.information}>
        <div className="ms-Grid-row ms-u-slideDownIn20">
          <div className={`${styles.detailsList} ms-Grid-col ms-u-sm12`}>
            {sortedItems.length === 0 ? (
              <Placeholder
                icon="ThumbnailView"
                title="No employee information found..."
              />
            ) : (
              <div>
                <DetailsList
                  items={sortedItems}
                  columns={columns}
                  onRenderItemColumn={_renderItemColumn}
                  onColumnHeaderClick={this._onColumnClick}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function _buildColumns() {
  const columns = buildColumns(rowItems);
  const filteredColumns = columns.filter(c => {
    c.maxWidth = 100;
    switch (c.name) {
      case 'imageUrl':
        c.name = 'Thumbnail';
        return c;
      case 'displayName':
        c.name = 'Name';
        return c;
      case 'mail':
        c.name = 'e-Mail';
        return c;
      case 'department':
        c.name = 'Department';
        return c;
      case 'city':
        c.name = 'City';
        return c;
      case 'jobTitle':
        c.name = 'Job Title';
        return c;
      case 'country':
        c.name = 'Country';
        return c;
      default:
    }
  });

  return filteredColumns;
}

function _renderItemColumn(item, index, column) {
  const fieldContent = item[column.fieldName];

  switch (column.key) {
    case 'imageUrl':
      return (
        <Image
          src={fieldContent}
          width={50}
          height={50}
          imageFit={ImageFit.cover}
        />
      );
    case 'displayName':
      return <Link href="#">{fieldContent}</Link>;
    default:
      return <span>{fieldContent}</span>;
  }
}
