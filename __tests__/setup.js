import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ShallowWrapper from 'enzyme/ShallowWrapper';
import until from '../src/utils/testHelpers/until';

ShallowWrapper.prototype.until = until;

Enzyme.configure({ adapter: new Adapter() });
