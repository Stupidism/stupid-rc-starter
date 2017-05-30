import mapProps from 'recompose/mapProps';
import omit from 'lodash.omit';

export default paths => mapProps(props => omit(props, paths));
