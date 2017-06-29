import React from 'react';

import enzymeToJson from 'enzyme-to-json';
import { shallowWithUntil as shallow } from './until';

const snapshotPropsMapperHoc = (hoc, inputProps) => {
  // This Component can't render deeply, must work with shallow renderer.
  const PropsDisplayer = outputProps => (
    <div name="props-displayer">
      <input-props {...inputProps} />
      <output-props {...outputProps} />
    </div>
  );
  const NewComponent = hoc(PropsDisplayer);
  const wrapper = shallow(<NewComponent {...inputProps} />).until(PropsDisplayer);
  expect(enzymeToJson(wrapper)).toMatchSnapshot();
};

export default snapshotPropsMapperHoc;
