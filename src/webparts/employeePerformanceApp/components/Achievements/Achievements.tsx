import * as React from 'react';
import { IAchievementsProps } from './IAchievementsProps';
import { IAchievementsState } from './IAchievementsState';
import styles from './styles.module.scss';
import {
  FocusZone,
  FocusZoneDirection,
} from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { List } from 'office-ui-fabric-react/lib/List';
import Achievement from '../Common/Achievement';
import Indicator1 from './Indicator1';
import Indicator2 from './Indicator2';
import Indicator3 from './Indicator3';
import Placeholder from '../Common/Placeholder';

export default class Achievements extends React.Component<
  IAchievementsProps,
  IAchievementsState
> {
  constructor(props: IAchievementsProps) {
    super(props);

    this.onFilterChanged = this.onFilterChanged.bind(this);

    this.state = {
      filterText: '',
      filteredAchievements: this.props.achievements,
    };
  }

  private onFilterChanged(text: string) {
    const { achievements } = this.props;

    this.setState({
      filterText: text,
      filteredAchievements: text
        ? achievements.filter(
            item =>
              item.title.toLowerCase().indexOf(text.toLowerCase()) >= 0 ||
              item.description.toLowerCase().indexOf(text.toLowerCase()) >= 0,
          )
        : achievements,
    });
  }

  private _filterAchievementsContainer() {
    const { achievements: originalItems } = this.props;
    const { filteredAchievements } = this.state;
    const resultCountText =
      filteredAchievements.length === originalItems.length
        ? ''
        : ` (${filteredAchievements.length} of ${originalItems.length} shown)`;

    return (
      <FocusZone
        className={styles.allAchievements}
        direction={FocusZoneDirection.vertical}
      >
        <div className={`${styles.title} ms-font-m`}>All Achievements</div>
        <div>
          <TextField
            placeholder="Type to filter achievements"
            onBeforeChange={this.onFilterChanged}
            description={resultCountText}
          />
          <List
            items={filteredAchievements}
            onRenderCell={(item, index) => (
              <Achievement key={item.id} achievement={item} />
            )}
          />
        </div>
      </FocusZone>
    );
  }

  public render(): React.ReactElement<IAchievementsProps> {
    const { achievements, earnedAchievements, users } = this.props;
    return (
      <div>
        {achievements.length === 0 ? (
          <div className="ms-Grid-row ms-u-slideDownIn20">
            <div className="ms-Grid-col ms-u-sm12">
              <Placeholder icon="Trophy" title="No achievements found..." />
            </div>
          </div>
        ) : (
          <div className={styles.achievements}>
            <div className="ms-Grid-row ms-u-slideDownIn20">
              <div className={`${styles.container} ms-Grid-col ms-u-sm12`}>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-u-sm12 ms-u-md4">
                    {
                      <Indicator1
                        achievements={achievements}
                        earnedAchievements={earnedAchievements}
                      />
                    }
                  </div>
                  <div className="ms-Grid-col ms-u-sm12 ms-u-md4">
                    {
                      <Indicator2
                        achievements={achievements}
                        earnedAchievements={earnedAchievements}
                      />
                    }
                  </div>
                  <div className="ms-Grid-col ms-u-sm12 ms-u-md4">
                    {
                      <Indicator3
                        achievements={achievements}
                        earnedAchievements={earnedAchievements}
                        users={users}
                      />
                    }
                  </div>
                </div>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-u-sm12">
                    {this._filterAchievementsContainer()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
