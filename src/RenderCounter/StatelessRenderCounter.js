import React from 'react';
import withRenderCount from './withRenderCount';
import Counter from './Counter';

const StatelessRenderCounter = props => <Counter {...props} />;

StatelessRenderCounter.displayName = 'StatelessRenderCounter';

export default withRenderCount(StatelessRenderCounter);
