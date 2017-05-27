import React from 'react';
import T from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierCaveLight } from 'react-syntax-highlighter/dist/styles';

const CodeBlock = ({ literal, ...rest }) => (
  <SyntaxHighlighter {...rest}>{literal}</SyntaxHighlighter>
);

CodeBlock.propTypes = {
  literal: T.string,
};

CodeBlock.defaultProps = {
  language: 'javascript',
  style: atelierCaveLight,
  literal: '',
};

export default CodeBlock;
