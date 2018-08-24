// /// <reference types="mocha" />
// /// <reference types="sinon" />

// import * as React from 'react';
// import * as TestUtils from 'react-addons-test-utils';
// import { assert, expect } from 'chai';
// import { shallow } from 'enzyme';
// //import Main from './Main';
// import IconComponent from '../Common/IconComponent';
// import { MockDataProvider } from '../../dataProviders';

// declare const sinon;

// describe('Main', () => {
//   // let props;
//   // let mountedMain;

//   // const main = () => {
//   //   if(!mountedMain){
//   //     mountedMain = mount(
//   //       <Main {...props} />
//   //     );
//   //   }

//   //   return mountedMain;
//   // };

//   // beforeEach(() => {
//   //   props = {
//   //     dataProvider: new MockDataProvider()
//   //   };
//   //   mountedMain = undefined;
//   // });
//   let renderedElement;
//   let dataProvider;

//   // before(() => {
//   //   dataProvider = new MockDataProvider()
//   //   //renderedElement = mount(<Main dataProvider={dataProvider} />);
//   //   //title, description, iconName, size
//   //   renderedElement = mount(<IconComponent
//   //     title='title'
//   //     description='asd'
//   //     iconName='Error'
//   //   />);
//   // });

//   it('Should exists', () => {
//     //expect(main).to.exist;
//     // let provider = new MockDataProvider();
//     // let main = TestUtils.renderIntoDocument(<Main dataProvider={provider} /> );
//     // expect(main).to.exist;
//     expect(true).ok;
//   });

//   it('<Main /> should render something', () => {
//     // let main = TestUtils.renderIntoDocument(<IconComponent
//     //   title='title'
//     //   description='asd'
//     //   iconName='Error'
//     //   /> );
//     const main = shallow(<IconComponent
//       title='title'
//       description='asd'
//       iconName='Error'
//     />);

//     expect(main).to.exist;
//     //expect(renderedElement.find('div')).to.be.exist;
//   });

//   // it('Should render something', () => {
//   //   const divs = main().find('div');
//   //   expect(divs.length).to.be.greaterThan(0);
//   // });
// });
