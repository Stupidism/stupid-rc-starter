import cloneDeep from 'lodash.clonedeep';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import omitProps from './omitProps';

const SET_THIS = 'setThis';
const THIS_NAME = 'self';

export default (initialThis = {}, thisName = THIS_NAME) => compose(
  withState(thisName, SET_THIS, typeof initialThis === 'object' ? cloneDeep(initialThis) : initialThis),
  omitProps(SET_THIS),
);
