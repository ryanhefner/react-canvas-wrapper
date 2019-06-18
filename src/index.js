import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cleanProps from 'clean-react-props';
import nanoid from 'nanoid';


class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      instanceKey: nanoid(),
    };
  }

  componentDidMount() {
    this.draw(this.props);
  }

  componentDidUpdate() {
    this.draw(this.props);
  }

  draw(props) {
    if (!this.canvas) {
      return;
    }

    props.draw(this.canvas);
  }

  render() {
    const {
      canvasRef,
      width,
      height,
      pixelRatioAware,
      style,
    } = this.props;

    const {
      instanceKey,
    } = this.state;

    const pixelRatio = pixelRatioAware
      ? window.devicePixelRatio || 1
      : 1;

    const ref = canvasRef
      ? canvasRef
      : (element) => { this.canvas = element; };

    const styleProp = Object.assign({}, style, {
      width,
      height,
    });

    return (
      <canvas
        {...cleanProps(this.props, ['width', 'height'])}
        key={instanceKey}
        ref={ref}
        width={width * pixelRatio}
        height={height * pixelRatio}
        style={styleProp}
      />
    );
  }
}

Canvas.propTypes = {
  canvasRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  draw: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  pixelRatioAware: PropTypes.bool,
};

Canvas.defaultProps = {
  draw: () => {},
  width: 30,
  height: 30,
  pixelRatioAware: true,
};

export default Canvas;
