import React, { Component } from 'react';
import Slider from 'rc-slider';
import { resetZoom } from '../Map/index';
import { startAlgorithm, pauseAlgirithm, stopAlgorithm } from '../helpers/district-designer';
import 'rc-slider/assets/index.css';

class ToolModal extends Component {

  constructor(props) {
    super(props);
    this.weights = [];
  }

  componentDidMount() {
    this.props.weights.map((item) => (this.updateWeight(item.id, this.props.sliderMax/2)));
  }

  onStart = () => {
    startAlgorithm(this.weights, null, null);
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

  updateWeight = (sliderId, newWeight) => {
    console.log('updating weight for weight # ' + sliderId + ' from ' + this.weights[sliderId] + ' to ' + newWeight);
    this.weights[sliderId] = (newWeight / this.props.sliderMax).toFixed(2);
    let weightLabel = document.getElementById('weightLabel' + sliderId);
    weightLabel.innerHTML = this.weights[sliderId];
  }

  render() {
    return (
      <div className="Modal ToolModal">
        <button onClick={() => this.zoomOut()}>← Return to State Select</button>
        {
          this.props.weights.map((item) => (
              <div>
                <label name={"weightTitle"}>{item.label}</label>
                <div class="weightContainer">
                  <Slider id={"weightSlider"+item.id} min={0} max={this.props.sliderMax} defaultValue={this.props.sliderMax/2} onAfterChange={(value) => {this.updateWeight(item.id, value)}}></Slider>
                  <label id={"weightLabel"+item.id}>-1</label>
                </div>
              </div>
          ))
        }
        <button onClick={() => this.onStart()}>Start</button>
        <button onClick={() => this.onPause()}>Pause</button>
        <button onClick={() => this.onStop()}>Stop</button>
      </div>
    );
  }
}

ToolModal.defaultProps = {
  weights: [
    {
      id: '0',
      label: 'Compactness',
      value: 'COMPACTNESS',
    },
    {
      id: '1',
      label: 'Weight 2',
      value: 'WEIGHT_2',
    },
    {
      id: '2',
      label: 'Weight 3',
      value: 'WEIGHT_3',
    },
  ],
  sliderMax: 20,
};

export default ToolModal;
