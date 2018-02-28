import React from 'react';
import T from 'prop-types';
import _ from 'lodash';
import SyntaxHighlighter from 'react-syntax-highlighter';
import atelierCaveLight from 'react-syntax-highlighter/dist/styles/hljs/atelier-cave-light';

const CodeBlock = ({ literal, ...rest }) => (
  <SyntaxHighlighter {..._.pick(rest, ['language', 'style'])}>{literal}</SyntaxHighlighter>
);

CodeBlock.propTypes = {
  language: T.string,
  style: T.objectOf(T.any),
  literal: T.string,
};

CodeBlock.defaultProps = {
  language: 'javascript',
  style: atelierCaveLight,
  literal: '',
};

export default CodeBlock;
