import React from 'react';
import { Component, styled } from '@semcore/core';
import createXYElement from './XYElement';
import { scaleOfBandwidth, getIndexFromData } from './utils';

import style from './style/hover.shadow.css';

class Hover extends Component {
  static style = style;

  state = {
    xIndex: null,
    yIndex: null,
  };

  componentDidMount() {
    const {
      eventEmitter,
      scale: [xScale, yScale],
      data,
      x,
      y,
    } = this.asProps;
    this.unsubscribeNearestXY = eventEmitter.subscribe('onNearestXY', ([pX, pY]) => {
      this.setState({
        xIndex: x === undefined || pX === undefined ? null : getIndexFromData(data, xScale, x, pX),
        yIndex: y === undefined || pY === undefined ? null : getIndexFromData(data, yScale, y, pY),
      });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeNearestXY) {
      this.unsubscribeNearestXY();
    }
  }
}

class HoverLineRoot extends Hover {
  static displayName = 'HoverLine';

  render() {
    const SHoverLine = this.Element;
    const { styles, x, y, data, scale } = this.asProps;
    const { xIndex, yIndex } = this.state;
    const [xScale, yScale] = scale;

    const xRange = xScale.range();
    const yRange = yScale.range();
    const x1 = xIndex !== null ? scaleOfBandwidth(xScale, data[xIndex][x]) : undefined;
    const y1 = yIndex !== null ? scaleOfBandwidth(yScale, data[yIndex][y]) : undefined;

    return styled(styles)(
      <>
        {xIndex !== null ? (
          <SHoverLine render="line" index={xIndex} x1={x1} y1={yRange[0]} x2={x1} y2={yRange[1]} />
        ) : null}
        {yIndex !== null ? (
          <SHoverLine render="line" index={yIndex} x1={xRange[0]} y1={y1} x2={xRange[1]} y2={y1} />
        ) : null}
      </>,
    );
  }
}

class HoverRectRoot extends Hover {
  static displayName = 'HoverRect';

  render() {
    const SHoverRect = this.Element;
    const { styles, x, y, data, scale } = this.asProps;
    const { xIndex, yIndex } = this.state;
    const [xScale, yScale] = scale;

    const xRange = xScale.range();
    const yRange = yScale.range();

    return styled(styles)(
      <>
        {xIndex !== null ? (
          <SHoverRect
            render="rect"
            index={xIndex}
            width={xScale.step() - xScale.paddingInner() / 2}
            height={yRange[0] - yRange[1]}
            x={xScale(data[xIndex][x]) - (xScale.step() * xScale.paddingInner()) / 2}
            y={yRange[1]}
          />
        ) : null}
        {yIndex !== null ? (
          <SHoverRect
            render="rect"
            index={yIndex}
            width={xRange[1] - xRange[0]}
            height={yScale.step() - yScale.paddingInner() / 2}
            x={xRange[0]}
            y={yScale(data[yIndex][y]) - (yScale.step() * yScale.paddingInner()) / 2}
          />
        ) : null}
      </>,
    );
  }
}

const HoverLine = createXYElement(HoverLineRoot);
const HoverRect = createXYElement(HoverRectRoot);

export { HoverLine, HoverRect };
