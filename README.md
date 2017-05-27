<blockquote>
  <a href="./docs/starter.md">README of starter</a>
</blockquote>

# Example component: react-render-counter
> RenderCounter is a tool component can be used in dev environment. It can tell you how many times each part of your component has been rendered.  
> This is composed with a HOC and a pure component to count render times  
> HOC is also useful when you want to track render times for your component.

## Installation
```
yarn add --dev react-render-counter
```
or
```
npm install --save-dev react-render-counter
```

## Usage
1. `RenderCounter` - withRenderCount(Counter)

  ```js
  import RenderCounter from 'react-render-counter';
  
  <AnyComponent>
    <RenderCounter />
  </AnyComponent>
  ```

2. `withRenderCount` - High order component to provide data and logic

  ```js
  import { withRenderCount } from 'react-render-counter';
  
  const MyCounter = ({ count }) => <div>{count + 1}</div>;
  
  export default withRenderCount(MyCounter);
  ```
  
3. `Counter` - Pure component to render count

  ```js
  import { Counter } from 'react-render-counter';
  
  <div>
    <Counter count={1} /> 
  </div>
  ```

## Documentation

- [documentations](https://stupidism.github.io/stupid-rc-starter/)
- [online demo](https://stupidism.github.io/stupid-rc-starter/storybook)
- [code examples](https://github.com/stupidism/stupid-rc-starter/blob/master/stories/Image/Image.story.js)
