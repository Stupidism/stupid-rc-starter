import withProps from 'recompose/withProps';

export default object => withProps(props => Object.assign(object, props));
