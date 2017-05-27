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
* Developing stories - **npm start**
  - Runs the development server at *localhost:6006* and use Hot Module Replacement.
  - Automatically open with default browser
  
### Testing

The test setup is based on Jest. Code coverage report is generated to `coverage/`. The coverage information is also uploaded to codecov.io after a successful Travis build.

* Once - **npm test**
* Continuously - **npm run test:watch**
* Individual tests - **npm test -- <pattern>** - Works with `test:watch` too.
* Automatically - pre-push hook when **git push** is executed

### Linting
* All - **npm run lint** - Runs both **npm run lint:js** and **npm run lint:css**.
* Js only - **npm run lint:js** - Runs ESLint.
* Css only - **npm run lint:css** - Runs stylelint.
* Staged files only - **npm run lint:staged** - Runs lint-staged.
* Automatically - pre-commit hook when **git commit** is executed

### Distributing
* Single file - **npm run dist**
* Minified file & map - **npm run dist:min**
* Multiple files - **npm run dist:modules**
* Meta files - **npm run dist:meta destDir**

### Building
* Single module - **npm run build:single**
* Multiple modules - **npm run build:modules**

### Publishing
* Whole repo - **npm publish**
  - NOT RECOMMENDED: Pushes whole repo as a new version to npm and updates the project site.
* Single module - **npm publish:single**
  - Runs `npm run build:single`
  - Pushes files inside `dist` as a new version to npm 
  - Updates the project site.
* Multiple modules - **npm publish:modules**
  - Runs `npm run build:modules`
  - Pushes files inside `dist-modules` as a new version to npm
  - Updates the project site.

### Documentation Site

The starter includes a [GitHub Pages](https://pages.github.com/) specific portion for setting up a documentation site for the component. The main commands handle with the details for you. Sometimes you might want to generate and deploy it by hand, or just investigate the generated bundle.

* Building - **npm run gh-pages** - Builds the documentation into `./gh-pages` directory.
* Deploying - **npm run gh-pages:deploy** - Deploys the contents of `./gh-pages` to the `gh-pages` branch. GitHub will pick this up automatically. Your site will be available through *<user name>.github.io/<project name>`.
* Previewing - **npm run gh-pages:opn** - Open `gh-pages/index.html` with default browser.

### Example Repositories
- [react-renderer-counter](https://github.com/stupidism/stupid-rc-starter)
- [clarity-components](https://github.com/ClarityMovement/clarity-components)

## License

Copyright © 2017, [Stupidism](https://github.com/stupidism). Released under the [MIT license](LICENSE).
