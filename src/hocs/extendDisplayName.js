import { setDisplayName, getDisplayName, wrapDisplayName } from 'recompose';

export default nameOrOptions => (Component) => {
  const options = typeof nameOrOptions !== 'object' ? { name: nameOrOptions } : nameOrOptions;
  const { name, operation = 'wrap' } = options;

  let newDisplayName;
  switch (operation) {
    case 'wrap': {
      newDisplayName = wrapDisplayName(Component, name);
      break;
    }
    case 'replace': {
      newDisplayName = name;
      break;
    }
    default: {
      newDisplayName = getDisplayName(Component);
    }
  }
  return setDisplayName(newDisplayName)(Component);
};
