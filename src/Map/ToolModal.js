import React, { Component } from 'react';
import { startAlgorithm, pauseAlgirithm, stopAlgorithm } from '../helpers/district-designer';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { resetZoom } from '../Map/index';

const SLIDER_COUNT = 3;
const SLIDER_MAX = 20;

class ToolModal extends Component {

  constructor(props) {
    super(props);
    this.weights = [];
  }

  onStart = () => {
    startAlgorithm(this.normalizeWeights(this.weights), null, null);
  }

  onPause = () => {
    pauseAlgirithm();
  }

  onStop = () => {
    stopAlgorithm();
  }

  zoomOut = () => {
    resetZoom();
  }

  createSliders(sliderCount) {
    let sliders = [];
    for(let i = 0; i < sliderCount; i++) {
      sliders.push(
        <div>
          <label name={"weightLabel" + i}>weight{i}</label>
          <Slider id={"weightSlider" + i} min={0} max={SLIDER_MAX} defaultValue={SLIDER_MAX/2} onAfterChange={(value) => {this.updateWeight(i, value)}}></Slider>
        </div>
      );
      this.weights[i] = 5;
    }
    return sliders;
  }

  normalizeWeights(weights) {
    let normalWeights = [];
    let totalWeight = 0;
    for(let i = 0; i < weights.length; i++) {
      totalWeight += weights[i];
    }
    let scaleFactor = 1 / totalWeight;
    for(let i = 0; i < weights.length; i++) {
      normalWeights[i] = (weights[i] * scaleFactor).toFixed(3);
    }
    return normalWeights;
  }

  updateWeight = (sliderId, newWeight) => {
    console.log('updating weight for weight # ' + sliderId + ' from ' + this.weights[sliderId] + ' to ' + newWeight);
    this.weights[sliderId] = newWeight;
  }

  render() {
    return (
      <div className="Modal ToolModal">
        <button onClick={() => this.zoomOut()}>← Return to State Select</button>
        {this.createSliders(SLIDER_COUNT)}
        <button onClick={() => this.onStart()}>Start</button>
        <button onClick={() => this.onPause()}>Pause</button>
        <button onClick={() => this.onStop()}>Stop</button>
      </div>
    );
  }
}

export default ToolModal;
