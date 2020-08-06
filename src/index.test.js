import React from 'react';
import Enzyme, { mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Canvas from './index';

Enzyme.configure({
  adapter: new Adapter(),
});

describe('<Canvas />', () => {
  const mockDraw = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    global.devicePixelRatio = 1;
  });

  test('renders at default width', () => {
    const component = render(<Canvas />);
    expect(component.prop('width')).toEqual('30');
  });

  test('renders at default height', () => {
    const component = render(<Canvas />);
    expect(component.prop('height')).toEqual('30');
  });

  test('renders at passed width', () => {
    const component = render(<Canvas width={45} />);
    expect(component.prop('width')).toEqual('45');
  });

  test('renders at passed height', () => {
    const component = render(<Canvas height={45} />);
    expect(component.prop('height')).toEqual('45');
  });

  test('calls draw on mount', () => {
    mount(<Canvas draw={mockDraw} />);
    expect(mockDraw).toHaveBeenCalledTimes(1);
  });

  test('calls draw on prop change', () => {
    const component = mount(<Canvas draw={mockDraw} height={45} />);
    component.setProps({ height: 90 });
    expect(mockDraw).toHaveBeenCalledTimes(2);
  });

  describe('devicePixelRatio tests', () => {
    test('width values render based on devicePixelRatio', () => {
      global.devicePixelRatio = 2;
      const wrapper = mount(<Canvas width={45} />);
      expect(wrapper.getDOMNode()).toHaveProperty('width', 90);
      expect(wrapper.getDOMNode()).toHaveProperty('height', 60);
    });

    test('height values based on devicePixelRatio', () => {
      global.devicePixelRatio = 2;
      const wrapper = mount(<Canvas height={45} />);
      expect(wrapper.getDOMNode()).toHaveProperty('width', 60);
      expect(wrapper.getDOMNode()).toHaveProperty('height', 90);
    });

    test('width values respect pixelRatioAware prop', () => {
      global.devicePixelRatio = 2;
      const wrapper = mount(<Canvas width={45} pixelRatioAware={false} />);
      expect(wrapper.getDOMNode()).toHaveProperty('width', 45);
      expect(wrapper.getDOMNode()).toHaveProperty('height', 30);
    });

    test('width values respect pixelRatioAware prop', () => {
      global.devicePixelRatio = 2;
      const wrapper = mount(<Canvas height={45} pixelRatioAware={false} />);
      expect(wrapper.getDOMNode()).toHaveProperty('width', 30);
      expect(wrapper.getDOMNode()).toHaveProperty('height', 45);
    });
  });
});
