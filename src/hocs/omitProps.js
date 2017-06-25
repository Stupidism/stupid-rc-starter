import mapProps from 'recompose/mapProps';
import _ from 'lodash';

export default paths => mapProps(props => _.omit(props, paths));
