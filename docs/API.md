# API for HOCs
## Higher-order components 

### `withHandlers()`
```js
withHandlers(
  handlersMapper: Object
): recompose.withHandlers(handlersMapper)

withHandlers(
  handlersMappers: Array<handlersMapper>
): compose(
  recompose.withHandlers(handlersMapper1),
  recompose.withHandlers(handlersMapper2),
)
```
Enhance recompose [`withHandlers`](https://github.com/acdlite/recompose/blob/master/docs/API.md#withhandlers).
Accept array of handlersMappers so that `handlersMapper2` can depends on `handlersMapper1`

### `embedHandler()`

```js
embedHandler(
  innerHandlerName: string |
    innerHandler: (props: Object) => InnerHandler: Function,
  outerHandlerName: string,
): HigherOrderComponent

HigherOrderComponent(BaseComponent): NewComponent

NewComponent(
  props: {
    [innerHandlerName]: InnerHandler: Function,
    [outerHandlerName]: (...args: Array [, next: Function]) => {...},
  }
): BaseComponent(
  props: {
    [outerHandlerName]: EmbeddedHandler: Function
  }
)
```
Embed InnerHandler inside OuterHandler, which means when EmbeddedHandler is called, 
both OuterHandler and InnerHandler will be called.  
In exception: when `OuterHandler.length > InnerHandler.length`, 
InnerHandler won't be called until you call `next()`.

### `embedHandlers()`
```js
embedHandlers(
  handlersMapper: {
    [outerHandlerName]: innerHandler | innerHandlerName,
  } |
  handlersMapper: Array<{
    [outerHandlerName]: innerHandler | innerHandlerName,
  }>
): HigherOrderComponent
```
Plural version of [embedHandler](#embedHandler).
Also combines [withHandlers](#withHandlers)

### `omitProps()`
```js
omitProps(
  keys: string | Array<string>
): HigherOrderComponent

HigherOrderComponent(BaseComponent): NewComponent
NewComponent(props):BaseComponent(propsWithoutKeys)
```
Omit some keys to keep props clean.

### `withThis()`
```js
withThis(
  initialThis: Object | (props: Object) => Object,
  name: string = 'self'
): HigherOrderComponent

HigherOrderComponent(BaseComponent): NewComponent
NewComponent(props):BaseComponent(propsWithoutKeys)
```
You can keep some variables in this `self` object just like `this` in a stateful Component.

## Static property helpers
### `copyStatics()`

```js
copyStatics(
  SrcComponent: Component
): HigherOrderComponent

HigherOrderComponent(DstComponent): DstComponent
```

Copy `displayName`, `propTypes` and `defaultProps` from SrcComponent to DstComponent

### `extendDefaultProps()`
```js
extendDefaultProps(
  overrides: Object
): HigherOrderComponent

HigherOrderComponent(BaseComponent): BaseComponent
```
Override BaseComponent's `defaultProps`

### `extendPropTypes()`
```js
extendPropTypes(
  overrides: Object
): HigherOrderComponent

HigherOrderComponent(BaseComponent): BaseComponent
```
Override BaseComponent's `propTypes`

### `extendDisplayName()`
```js
extendDisplayName(
  name: string |
  options: {
    name: string,
    operation: string = 'wrap' | 'replace'
  }
): HigherOrderComponent

HigherOrderComponent(BaseComponent): BaseComponent
```
Override BaseComponent's `displayName`, wrap or replace, default is wrap

### `extendPropTypes()`
```js
extendPropTypes(
  overrides: Object
): HigherOrderComponent

HigherOrderComponent(BaseComponent): BaseComponent
```
Override BaseComponent's `propTypes`

### `extendStatics()`
```js
extendPropTypes(
  overrides: {
    displayName: string | Object,
    propTypes: Object,
    defaultProps: Object,
  },
): HigherOrderComponent

HigherOrderComponent(BaseComponent): BaseComponent
```
Combination of above three HOCs, [extendPropTypes](#extendPropTypes),[extendDisplayName](#extendDisplayName) and [extendPropTypes](#extendPropTypes)

### `omitPropTypes()`
```js
omitPropTypes(
  keys: string | Array<string>
): HigherOrderComponent

HigherOrderComponent(
  BaseComponent: Component | Object({
    propTypes: Object,
    defaultProps: Object,
  })
): NewComponent: Component | Object({
    propTypesWithoutKeys: Object,
    defaultPropsWithoutKeys: Object,
  })
```
Omit some keys to keep propTypes and defaultProps clean.

## Utils
### `createEmbeddedFunction()`
```js
createEmbeddedFunction(
  innerFunc: Function,
  outerFunc: Function,
): embeddedFunc
```
Embed innerFunc inside outerFunc, which means when embeddedFunc is called, both innerFunc and outerFunc will be called.  
In exception: when `outerFunc.length > innerFunc.length`, innerFunc won't be called until you call `next()`.

### `createEmbeddedHandler()`

```js
createEmbeddedHandler(
  innerHandlerName: string |
    innerHandler: (props: Object) => InnerHandler: Function,
  outerHandlerName: string,
): embeddedHandler

```
Embed innerHandler inside outerHandler, which means when embeddedHandler is called, 
both outerHandler and innerHandler will be called.  
In exception: when `outerHandler.length > innerHandler.length`, 
innerHandler won't be called until you call `next()`.

## Test helpers

### `withPropsPeeker()`
```js
withPropsPeeker(
  props: Object
): HigherOrderComponent
```
Save props passed down to `BaseComponent` into `props` object, so you can peek props in test.
