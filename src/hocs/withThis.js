import _ from 'lodash';
import { compose, withState } from 'recompose';
import omitProps from './omitProps';

const SET_THIS = 'setThis';
const THIS_NAME = 'self';

export default (initialThis = {}, thisName = THIS_NAME) => compose(
  withState(thisName, SET_THIS, typeof initialThis === 'object' ? _.cloneDeep(initialThis) : initialThis),
  omitProps(SET_THIS),
);
