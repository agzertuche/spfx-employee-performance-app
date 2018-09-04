import * as React from 'react';
import { IAppProps } from './IAppProps';
import { IAppState } from './IAppState';
import { ComponentStatus, MenuItem, DataProvider } from '../../models/Enums';
import { Fabric, Button } from 'office-ui-fabric-react';
import IUser from '../../models/IUser';
import IEmployeeInformation from '../../models/IEmployeeInformation';
import IAchievement from '../../models/IAchievement';
import IPerformanceSkills from '../../models/IPerformanceSkills';
import styles from './styles.module.scss';
import Nav from '../Nav';
import Placeholder from '../Common/Placeholder';
import Cards from '../Cards';
import Achievements from '../Achievements';
import Performance from '../Performance';
import Information from '../Information';
import IDataProvider from '../../models/IDataProvider';
import {
  SPRestDataProvider,
  MSGraphDataProvider,
  SPPnPDataProvider,
  MockDataProvider,
} from '../../data';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

export default class App extends React.Component<IAppProps, IAppState> {
  private _dataProvider: IDataProvider;

  constructor(props: IAppProps) {
    super(props);

    this._updateSelectedComponent = this._updateSelectedComponent.bind(this);

    this.state = {
      users: [],
      componentStatus: ComponentStatus.MissingConfiguration,
      selectedComponent: MenuItem.Cards,
    };

    this._initiateDataProvider(props);
  }

  public componentWillReceiveProps(nextProps: IAppProps): void {
    this._initiateDataProvider(nextProps);
  }

  public componentDidMount() {
    this._initiateDataProvider(this.props);
  }

  private _initiateDataProvider(props) {
    /*
      Create the appropriate data provider depending on where the web part is running.
      The DEBUG flag will ensure the mock data provider is not bundled with the web part
      when you package the so lution for distribution, that is,
      using the --ship flag with the package-solution gulp command.
    */
    if (DEBUG && Environment.type === EnvironmentType.Local) {
      this._dataProvider = new MockDataProvider();
    } else {
      switch (props.dataProviderType) {
        case DataProvider.MSGraph:
          this._dataProvider = new MSGraphDataProvider(this.props.context);
          break;
        case DataProvider.PnP:
          this._dataProvider = new SPPnPDataProvider(this.props.context);
          break;
        case DataProvider.REST:
          this._dataProvider = new SPRestDataProvider(this.props.context);
          break;
        case DataProvider.MockData:
        default:
          this._dataProvider = new MockDataProvider();
          break;
      }
    }

    this.setState({
      componentStatus: ComponentStatus.Loading,
    });
    this._loadAllData();
  }

  private _loadAllData() {
    const users = this._dataProvider.getUsers().then((usersArray: IUser[]) => {
      this.setState({
        users: usersArray,
      });
    });

    const empInfo = this._dataProvider
      .getEmployeeInformation()
      .then((empInfoArray: IEmployeeInformation[]) => {
        this.setState({
          employeeInformation: empInfoArray,
        });
      });

    const achievements = this._dataProvider
      .getAchievements()
      .then((achievementsArray: IAchievement[]) => {
        this.setState({
          achievements: achievementsArray,
        });
      });

    const earnedAchievements = this._dataProvider
      .getEarnedAchievements()
      .then((items: any[]) => {
        this.setState({
          earnedAchievements: items,
        });
      });

    const performanceSkills = this._dataProvider
      .getPerformanceSkills()
      .then((skills: IPerformanceSkills[]) => {
        this.setState({
          performanceSkills: skills,
        });
      });
    const promises = [
      users,
      empInfo,
      achievements,
      earnedAchievements,
      performanceSkills,
    ];

    return Promise.all(promises)
      .then(() => {
        this.setState({
          componentStatus: ComponentStatus.Completed,
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          componentStatus: ComponentStatus.Error,
        });
      });
  }

  private _handleRenderMode() {
    switch (this.state.componentStatus) {
      case ComponentStatus.MissingConfiguration:
        return this._renderMissingConfiguration();
      case ComponentStatus.Loading:
        return this._renderLoading();
      case ComponentStatus.Completed:
        return this._renderApp();
      case ComponentStatus.Error:
      default:
        return this._renderError();
    }
  }

  private _renderMissingConfiguration() {
    return (
      <Placeholder
        title="Please configure your web part"
        description="Missing configuration for the web part data provider..."
        icon="Error"
      >
        <Button
          text="Configure"
          primary
          onClick={() => this.props.context.propertyPane.open()}
        />
      </Placeholder>
    );
  }

  private _renderLoading() {
    return (
      <Placeholder
        displaySpinner
        spinnerText={'Loading employees data... please wait.'}
      />
    );
  }

  private _renderError() {
    return (
      <Placeholder
        title={'Ooops! something went wrong...'}
        description={
          'We could not start the app. Please try starting it again.'
        }
      />
    );
  }

  private _updateSelectedComponent(item) {
    this.setState({
      selectedComponent: parseInt(item.props.itemKey, 10),
    });
  }

  private _renderSelectedComponent() {
    const {
      selectedComponent,
      users,
      achievements,
      earnedAchievements,
      performanceSkills,
      employeeInformation,
    } = this.state;
    switch (selectedComponent) {
      case MenuItem.Information:
        return <Information users={users} />;
      case MenuItem.Achievements:
        return (
          <Achievements
            achievements={achievements}
            earnedAchievements={earnedAchievements}
            users={users}
          />
        );
      case MenuItem.Performance:
        return (
          <Performance
            performanceSkills={performanceSkills}
            usersCount={users.length}
          />
        );
      default:
      case MenuItem.Cards:
        return (
          <Cards
            users={users}
            employeeInformation={employeeInformation}
            earnedAchievements={earnedAchievements}
            achievements={achievements}
            performanceSkills={performanceSkills}
          />
        );
    }
  }

  private _renderApp() {
    return (
      <div>
        <div>
          <Nav onNavegationItemChange={this._updateSelectedComponent} />
        </div>
        <div className={styles.componentSection}>
          {this._renderSelectedComponent()}
        </div>
      </div>
    );
  }

  public render(): React.ReactElement<IAppProps> {
    return (
      <Fabric className={styles.app}>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm12">
              {this._handleRenderMode()}
            </div>
          </div>
        </div>
      </Fabric>
    );
  }
}
