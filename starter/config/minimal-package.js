import _ from 'lodash';
import pkg from '../../package.json';

const minPkg = _.pick(pkg, [
  'name',
  'author',
  'version',
  'description',
  'keywords',
  'repository',
  'license',
  'bugs',
  'homepage',
  'peerDependencies',
  'dependencies',
]);

/* Begin: starter code */
if (minPkg.name === 'stupid-rc-starter') {
  minPkg.name = 'react-render-counter';
}
/* End: starter code */

export default minPkg;
