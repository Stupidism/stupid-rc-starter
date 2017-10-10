import React from 'react';
import { shallow } from 'enzyme';
import enzymeToJson from 'enzyme-to-json';

const snapshotPropsMapperHoc = (hoc, inputProps) => {
  // This Component can't render deeply, must work with shallow renderer.
  const PropsDisplayer = outputProps => (
    <div name="props-displayer">
      <input-props {...inputProps} />
      <output-props {...outputProps} />
    </div>
  );
  const NewComponent = hoc(PropsDisplayer);
  const wrapper = shallow(<NewComponent {...inputProps} />);
  expect(enzymeToJson(wrapper.until(PropsDisplayer))).toMatchSnapshot();
};

export default snapshotPropsMapperHoc;
