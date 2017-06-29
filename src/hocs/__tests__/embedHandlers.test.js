/* eslint-env jest */

describe('embedHandlers(handlers):HOC', () => {
  jest.mock('../withHandlers', () => jest.fn());
  jest.mock('../embedHandler', () => ({
    createEmbeddedHandler: jest.fn(),
  }));

  /* eslint-disable global-require */
  const withHandlers = require('../withHandlers');
  const embedHandlers = require('../embedHandlers').default;
  const createEmbeddedHandler = require('../embedHandler').createEmbeddedHandler;
  /* eslint-enable global-require */

  beforeEach(() => {
    withHandlers.mockClear();
    createEmbeddedHandler.mockClear();
  });

  test('embedHandlers(Object<handler>)', () => {
    const innerBar = jest.fn();
    const handlers = {
      outerFoo: 'innerFoo',
      outerBar: innerBar, // [outerBar = 'innerBar']: innerBar
    };
    embedHandlers(handlers);
    expect(withHandlers).toHaveBeenCalledTimes(1);
    expect(createEmbeddedHandler).toHaveBeenCalledTimes(2);
    expect(createEmbeddedHandler).toHaveBeenCalledWith('innerFoo', 'outerFoo');
    expect(createEmbeddedHandler).toHaveBeenCalledWith(innerBar, 'outerBar');
  });

  it('embedHandlers(Array<Object<handler>>)', () => {
    const handlers = [{
      outerFoo: 'innerFoo',
    }, {
      outerBar: 'innerBar',
    }];
    embedHandlers(handlers);
    expect(withHandlers).toHaveBeenCalledTimes(1);
    expect(createEmbeddedHandler).toHaveBeenCalledTimes(2);
    expect(createEmbeddedHandler).toHaveBeenCalledWith('innerFoo', 'outerFoo');
    expect(createEmbeddedHandler).toHaveBeenCalledWith('innerBar', 'outerBar');
  });
});

