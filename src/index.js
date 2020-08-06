import React, { forwardRef, useEffect, useMemo, useState, useRef } from 'react';
import cleanProps from 'clean-react-props';
import nanoid from 'nanoid';

const defaultProps = {
  draw: () => {},
  width: 30,
  height: 30,
  pixelRatioAware: true,
  style: {}
};

const Canvas = forwardRef((props, ref) => {
  const {
    draw,
    width,
    height,
    pixelRatioAware = true,
    style,
  } = useMemo(
    () => Object.assign({}, defaultProps, props),
    [JSON.stringify(props)]
  );

  const [instanceKey] = useState(nanoid());
  const internalRef = ref || useRef();

  useEffect(() => {
    draw(internalRef);
  }, [JSON.stringify(props)]);

  const styleProp = useMemo(() => {
    return Object.assign({}, style, { width, height });
  }, [JSON.stringify(style), width, height]);

  const pixelRatio = pixelRatioAware
    ? window.devicePixelRatio || 1
    : 1;

  return (
    <canvas
      {...cleanProps(props)}
      key={instanceKey}
      ref={internalRef}
      width={width * pixelRatio}
      height={height * pixelRatio}
      style={styleProp}
    />
  );
});

export default Canvas;
