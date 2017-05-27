import React from 'react';
import Markdown from 'react-markdown';
import CodeBlock from './CodeBlock';

const renderers = {
  ...Markdown.Renderers,
  CodeBlock,
};

export default source => <Markdown source={source} renderers={renderers} />;
