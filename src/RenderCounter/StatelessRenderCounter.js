import React from 'react';
import withRenderCount from './withRenderCount';
import Counter from './Counter';

const RenderCounter = props => <Counter {...props} />;

export default withRenderCount(RenderCounter);
