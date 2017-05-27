# react-render-counter
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

- [documentations](https://stupidism.github.io/clarity-components/)
- [online demo](https://stupidism.github.io/clarity-components/storybook)
- [code examples](https://github.com/stupidism/clarity-components/blob/master/stories/Image/Image.story.js)

## Starter

Below is the content of the starter, delete them or try not to change them for convenience of merge.

---

[![Build Status](https://travis-ci.org/Stupidism/stupid-rc-starter.svg?branch=master)](https://travis-ci.org/Stupidism/stupid-rc-starter) [![bitHound Score](https://www.bithound.io/github/Stupidism/stupid-rc-starter/badges/score.svg)](https://www.bithound.io/github/Stupidism/stupid-rc-starter) [![codecov](https://codecov.io/gh/Stupidism/stupid-rc-starter/branch/master/graph/badge.svg)](https://codecov.io/gh/Stupidism/stupid-rc-starter) [![Greenkeeper badge](https://badges.greenkeeper.io/stupidism/stupid-rc-starter.svg)](https://greenkeeper.io/) [![Dependency Status](https://david-dm.org/Stupidism/stupid-rc-starter.svg)](https://david-dm.org/Stupidism/stupid-rc-starter) [![devDependencies Status](https://david-dm.org/Stupidism/stupid-rc-starter/dev-status.svg)](https://david-dm.org/Stupidism/stupid-rc-starter?type=dev)

# stupid-rc-starter 
> Starter for React.js components  
> This is forked from [react-component-boilerplate](https://github.com/survivejs/react-component-boilerplate)

This is a stupid starter makes it stupid enough to develop and test React components and small projects.
With [storybook](https://github.com/storybooks/storybook) integrated, components can be tested on [gh-pages](https://stupidism.github.io/stupid-rc-starter/storybook) by non-developers directly.

## Get Started

### Quick start
```
$ git clone -o starter -b master --single-branch \
      https://github.com/Stupidism/stupid-rc-starter.git my-component
$ cd my-component
```

### Clean history
To get started with fresh history, do this:

1. `cd my-component`
2. `rm -rf .git` - Remove Git database
3. `git init` - Initialize a new Git repository
4. `git add .` - Add all files to staging
5. `git commit -am "Initial commit"` - Commit the files

After this you should push the project to some remote.

### Update

If you need to keep your project up to date with the recent changes made to stupid-rc-starter,
you can always fetch and merge them from [this repo](https://github.com/Stupidism/stupid-rc-starter)
back into your own project by running:

```shell
$ git checkout master
$ git fetch starter master
$ git merge starter/master
$ yarn install
```

## Tasks
### Developing
* Developing stories - **npm start** or **npm run start:storybook**
  - Runs the development server at *localhost:8080* and use Hot Module Replacement.
  - You can override the default host and port through env (`HOST`, `PORT`).
* Developing docs - **npm start:docs**
  - Runs the development server at *localhost:8080* and use Hot Module Replacement. You can override the default host and port through env (`HOST`, `PORT`).

### Testing

The test setup is based on Jest. Code coverage report is generated to `coverage/`. The coverage information is also uploaded to codecov.io after a successful Travis build.

* Running tests once - **npm test**
* Running tests continuously - **npm run test:watch**
* Running individual tests - **npm test -- <pattern>** - Works with `test:watch` too.
* Running automatically - pre-push hook when **git push** is executed

### Linting
* Linting - **npm run lint** - Runs both **npm run lint:js** and **npm run lint:css**.
* Linting js only - **npm run lint:js** - Runs ESLint.
* Linting css only - **npm run lint:css** - Runs stylelint.
* Linting & fixing staged files only - **npm run lint:staged** - Runs lint-staged.
* Linting & fixing automatically - pre-commit hook when **git commit** is executed

### Distributing
* Distributing a single file - **npm run dist**
* Distributing minified file & map - **npm run dist:min**
* Distributing multiple files - **npm run dist:modules**
* Distributing meta files - **npm run dist:meta destDir**

### Building
* Building a single module - **npm run build:single**
* Building multiple modules - **npm run build:modules**

### Publishing
* Creating a version - **npm version <x.y.z>**
  - Updates *package.json* with the new version and create a version tag to Git.
* Publishing whole repo - **npm publish**
  - NOT RECOMMENDED: Pushes whole repo as a new version to npm and updates the project site.
* Publishing single module - **npm publish:single**
  - Runs `npm run build:single`
  - Pushes files inside `dist` as a new version to npm 
  - Updates the project site.
* Publishing multiple modules - **npm publish:modules**
  - Runs `npm run build:modules`
  - Pushes files inside `dist-modules` as a new version to npm
  - Updates the project site.

### Documentation Site

The starter includes a [GitHub Pages](https://pages.github.com/) specific portion for setting up a documentation site for the component. The main commands handle with the details for you. Sometimes you might want to generate and deploy it by hand, or just investigate the generated bundle.

* Building - **npm run gh-pages** - Builds the documentation into `./gh-pages` directory.
* Deploying - **npm run gh-pages:deploy** - Deploys the contents of `./gh-pages` to the `gh-pages` branch. GitHub will pick this up automatically. Your site will be available through *<user name>.github.io/<project name>`.
* Generating stats - **npm run gh-pages:stats** - Generates stats that can be passed to [webpack analyse tool](https://webpack.github.io/analyse/). This is useful for investigating what the build consists of.

## License

Copyright © 2017, [Stupidism](https://github.com/stupidism). Released under the [MIT license](LICENSE).
