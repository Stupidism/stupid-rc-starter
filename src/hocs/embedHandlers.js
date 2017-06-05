import mapValues from 'lodash.mapvalues';
import withHandlers from 'recompose/withHandlers';
import { createEmbeddedHandler } from './embedHandler';

export default handlers => withHandlers(mapValues(handlers, createEmbeddedHandler));
