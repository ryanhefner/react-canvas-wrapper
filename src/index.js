import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cleanProps from 'clean-react-props';

class Canvas extends Component {
  componentDidMount() {
    this.draw(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.draw(nextProps);
  }

  shouldComponentUpdate() {
    return false;
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
    } = this.props;

    const pixelRatio = pixelRatioAware
      ? window.devicePixelRatio || 1
      : 1;

    const ref = canvasRef
      ? canvasRef
      : (element) => { this.canvas = element; };

    return (
      <canvas
        ref={ref}
        width={width * pixelRatio}
        height={height * pixelRatio}
        style={{width, height}}
        {...cleanProps(this.props)}
      />
    );
  }
}

Canvas.propTypes = {
  canvasRef: PropTypes.func,
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
