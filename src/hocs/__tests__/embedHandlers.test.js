/* eslint-env jest */

describe('embedHandlers(handlers):HOC', () => {
  jest.mock('../withHandlers', () => jest.fn());
  jest.mock('../embedHandler', () => ({
    createEmbeddedHandler: jest.fn(),
    createEmbeddedName: jest.fn(),
  }));

  /* eslint-disable global-require */
  const withHandlers = require('../withHandlers');
  const embedHandlers = require('../embedHandlers').default;
  const {
    createEmbeddedHandler,
    createEmbeddedName,
  } = require('../embedHandler');
  /* eslint-enable global-require */

  const innerBar = jest.fn();

  beforeEach(() => {
    withHandlers.mockClear();
    createEmbeddedHandler.mockClear();
    createEmbeddedName.mockClear();
  });

  afterEach(() => {
    expect(withHandlers).toHaveBeenCalledTimes(1);
    expect(createEmbeddedName).toHaveBeenCalledTimes(2);
    expect(createEmbeddedName).toHaveBeenCalledWith('innerFoo', 'outerFoo');
    expect(createEmbeddedName).toHaveBeenCalledWith(innerBar, 'outerBar');
    expect(createEmbeddedHandler).toHaveBeenCalledTimes(2);
    expect(createEmbeddedHandler).toHaveBeenCalledWith('innerFoo', 'outerFoo');
    expect(createEmbeddedHandler).toHaveBeenCalledWith(innerBar, 'outerBar');
  });

  test('embedHandlers(Object<handler>)', () => {
    const handlers = {
      outerFoo: 'innerFoo',
      outerBar: innerBar,
    };
    embedHandlers(handlers);
  });

  it('embedHandlers(Array<Object<handler>>)', () => {
    const handlers = [{
      outerFoo: 'innerFoo',
    }, {
      outerBar: innerBar,
    }];
    embedHandlers(handlers);
  });
});

