import _ from 'lodash';
import { withHandlers } from 'recompose';
import { createEmbeddedHandler } from '../../src/hocs/embedHandler';

const withNestHandlers = handlers => withHandlers(_.mapValues(handlers, createEmbeddedHandler));

export default withNestHandlers;
