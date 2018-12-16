import DisplayModal from './DisplayModal';
import Modal from 'react-modal';
import React, { Component } from 'react';
import ToolModal from './ToolModal';
import { startAlgorithm, toggleAlgorithm, stopAlgorithm, getConstitution } from '../helpers/district-designer';
import { createMap, loadState, unloadState } from '../helpers/mapGeneration';
import ConstitutionModal from './ConstitutionModal';
import { MODAL } from '../config/constants';
import InfoModal from './InfoModal';
import StateSelector from './StateSelector';

let map;

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      zoomed: false,
      displayPane: MODAL.STATE_MODAL,
      selectedState: 'none',
      terminalUpdates: [],
      showingDistricts: false,
      constitution: {
        isActive: false,
        text: "",
      }
    };
  }

  componentDidMount() {
    map = createMap();
  }

  appendText(text) {
    const outputText = this.state.terminalUpdates.concat(text);
    this.setState({ terminalUpdates: outputText });
  }

  clearOutput = () => {
    this.setState({ terminalUpdates: [] });
  }

  onToggleAlgorithm = () => {
    toggleAlgorithm(false);
    this.appendText('Algorithm Paused');
  }

  onStart = (weights, algorithm) => {
    let weightMap = {};
    weights.map((w) => (weightMap[w.id] = w.value));
    const result = startAlgorithm(algorithm, this.state.selectedState.shortName, weightMap);
    this.appendText((result)?"Algorithm Started: Weights: " + weights.map((w) => w.id + ": " + w.value) + " State: " + this.state.selectedState.shortName + " Algorithm Type: " + algorithm:"ERROR");
    return result;
  }

  onStop = () => {
    stopAlgorithm();
    this.appendText('Algorithm Stopped');
  }

  resetZoom = () => {
    unloadState(map, this.state.selectedState.shortName);
    this.setState({
      zoomed: false,
      displayPane: MODAL.STATE_MODAL,
      selectedState: 'none',
    });
    map.flyTo({center: [-95.7, 39], zoom: 3.75});
  }

  showAlgorithm = () => {
    this.setState({
      displayPane: MODAL.TOOL_MODAL,
    });
  }

  hideAlgorithm = () => {
    this.setState({
      displayPane: MODAL.INFO_MODAL,
    });
  }

  stateZoom = (usstate) => {
    this.setState({
      zoomed: true,
      displayPane: MODAL.INFO_MODAL,
      selectedState: usstate
    });
    loadState(map, usstate.shortName, usstate.id);
    map.flyTo(usstate.boundingBox);
  }

  toggleConstitutionView = () => {
    const constitutionText = getConstitution(this.state.selectedState.shortName);
    this.setState({
      constitution: {
        isActive: !this.state.constitution.isActive,
        text: constitutionText,
      }
    });
  }

  toggleDistrictView = (show) => {
    this.setState({ showingDistricts: !show});
    map.setPaintProperty(this.state.selectedState.shortName+'Borders', 'line-opacity', (!show)?1.0:0.0);
    map.setPaintProperty(this.state.selectedState.shortName+'Fill', 'fill-opacity', (!show)?1.0:0.0);
    map.setPaintProperty('districtBorders', 'line-opacity', (!show)?0.0:1.0)
    map.setPaintProperty('districtFill', 'fill-opacity', (!show)?0.0:1.0)
  }

  render() {
    return (
      <div>
        <div id='map'></div>
        <DisplayModal
          zoomed={this.state.zoomed}
          terminalUpdates={this.state.terminalUpdates}
          clearOutput={this.clearOutput}
        />
        {
          (this.state.displayPane === MODAL.TOOL_MODAL)?
          <ToolModal
          zoomed={this.state.zoomed}
          stateZoom={this.stateZoom}
          resetZoom={this.hideAlgorithm}
          selectedState={this.state.selectedState}
          onStart={this.onStart}
          onToggle={this.onToggleAlgorithm}
          onStop={this.onStop}
          updateSettings={this.updateSettings}
          />:<div/>
        }
        {
          (this.state.displayPane === MODAL.INFO_MODAL)?
          <InfoModal
          resetZoom={this.resetZoom}
          showAlgorithm={this.showAlgorithm}
          toggleDistrictView={this.toggleDistrictView}
          toggleConstitutionView={this.toggleConstitutionView}
          />:<div/>
        }
        {
          (this.state.displayPane === MODAL.STATE_MODAL)?
          <div className="Modal ToolModal">
          <StateSelector
          stateZoom={this.stateZoom}
          resetZoom={this.resetZoom}
          />
          </div>:<div/>
        }
        <Modal
          className="Popup ConstitutionModal"
          overlayClassName="PopupOverlay"
          isOpen={this.state.constitution.isActive}
          onRequestClose={() => this.toggleConstitutionView()}
        >
          <ConstitutionModal constitution={this.state.constitution.text} />
        </Modal>
      </div>
    );
  }
}

export default Map;


