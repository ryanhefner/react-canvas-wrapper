# 🖼 react-canvas-wrapper

React component that wraps a canvas element and offers a clean API for drawing.

## Install

Via [NPM](https://npmjs.com/package/react-canvas-wrapper)

```sh
npm install --save react-canvas-wrapper
```

Via [Yarn](https://yarn.fyi/react-canvas-wrapper)

```sh
yarn add react-canvas-wrapper
```

## How to use

**Properties**

* `canvasRef:Function` - Function to set reference to `<canvas>` element. (Default: `(element) => { this.canvas = element; }`)
* `draw:Function` - Callback called when props change on the component. (Default: `(canvas) => {}`)
* `width:Number` - Width of the canvas @ 1x. (Default: `30`)
* `height:Number` - Height of the canvas @ 1x. (Default: `30`)
* `pixelRatioAware:Boolean` - Flag that triggers whether or not the `<canvas>` should be sized contextually based on the `devicePixelRatio`. (Default: `true`)

**Example - Canvas `ref`**

```js
import {Canvas} from 'react-indicators';

...

  componentWillReceiveProps(nextProps) {
    this.refreshCanvas();
  }

  refreshCanvas() {
    const canvas = ReactDOM.findDOMNode(this.canvas);
    const context = canvas.getContext('2d');

    /**
     * ...Perform canvas magic here...
     */
  }

  render() {
    return (
      <Canvas canvasRef={(element) => { this.canvas = element; }} />
    );
  }

```

**Example - Custom `draw` method**

```js
import {Canvas} from 'react-indicators';

...
  constructor(props) {
    super(props);

    this.draw = this.draw.bind(this);
  }

  draw(canvas) {
    const node = ReactDOM.findDOMNode(canvas);
    const context = node.getContext('2d');

    if (!context) {
      return;
    }

    const {
      progress,
    } = this.props;

    const pixelRatio = window.devicePixelRatio || 1;
    const width = 30 * pixelRatio;
    const height = 30 * pixelRatio;
    const backgroundColor = 'grey';
    const color = 'black';

    context.clearRect(0, 0, width, height);
    context.fillStyle = backgroundColor;
    context.beginPath();
    context.arc(
      (width / 2),
      (height / 2),
      (width / 2),
      0,
      Math.PI * 2
    );
    context.fill();

    context.fillStyle = color;
    context.beginPath();
    context.arc(
      (width / 2),
      (height / 2),
      ((width * progress) / 2),
      0,
      Math.PI * 2
    );
    context.fill();
  }

  render() {
    return (
      <Canvas draw={this.draw} />
    );
  }

...

```

## Responsive Canvas

This component recognizes the `devicePixelRatio` of the device/browser they are running
in, so the canvas is properly sized in order to keep the graphics crisp and clean, assuming that you haven’t set the `pixelRatioAware` to `false`.
So, feel free to set the size or dimensions based on a `1x` scale and the component
will adjust those accordingly.

Although, keep in mind that if you decide to pass in your own custom `draw` function
you’ll have to account for the `devicePixelRatio` within your drawing commands.

## License

[MIT](LICENSE) © [Ryan Hefner](https://www.ryanhefner.com)
