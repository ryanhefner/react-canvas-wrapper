import React from 'react';
import Enzyme, { render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Canvas from './index';

Enzyme.configure({
  adapter: new Adapter(),
});

describe('<Canvas />', () => {
  test('Component renders at default width', () => {
    const component = render(<Canvas />);
    expect(component.prop('width')).toEqual('30');
  });

  test('Component renders at default height', () => {
    const component = render(<Canvas />);
    expect(component.prop('height')).toEqual('30');
  });

  test('Component renders at passed width', () => {
    const component = render(<Canvas width={45} />);
    expect(component.prop('width')).toEqual('45');
  });

  test('Component renders at passed height', () => {
    const component = render(<Canvas height={45} />);
    expect(component.prop('height')).toEqual('45');
  });
});
