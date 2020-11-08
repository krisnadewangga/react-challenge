import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInitPeopleData, getPeopleData } from '../../redux/action/swapiAction';
import CustomPagination from './../CustomPagination/CustomPagination'
import CustomNavigation from './../CustomNavigation/CustomNavigation'
import Plot from 'react-plotly.js';
import './DataVisualComponent.css'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class DataVisualComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data: [],
    };
      
  }

  componentDidMount() {
    this.props.getInitPeopleData();
  }

  handleNext = () => {
    const next = this.props.data.people.next
    const page = next && next.split('=')
    if(next){
        this.props.getPeopleData(next);
        this.props.history.push(`/data-visual/?page=${page[1]}`)
    }
  }

  handleBack = () => {
      const prev = this.props.data.people.previous
      const page = prev && prev.split('=')
      if(prev){
          this.props.getPeopleData(prev);
          this.props.history.push(`/data-visual/?page=${page[1]}`)
      }
  }

  changeMyVariable = () => {
    if(this.props.data.people.results){
      let data = this.props.data.people.results
      let tempName = [];
      let tempMass = [];
      let tempHeight = [];
      data.forEach(element => {
        tempName.push(element.name)
        tempMass.push(element.mass)
        tempHeight.push(element.height)
      });
      return {tempName, tempMass, tempHeight}
    } else {
      return null
    }
  }

  handleCheckCurrentPage = () => {
    const page = this.props.data.people

    if(page.previous === null){
      return 1;
    } else if (page.next === null) {
      return 9;
    } else {
      if(page.next){
        const next = this.props.data.people.next
        const page = next && next.split('=')
        let currentPage = parseInt(page[1]) - 1
        return currentPage;
      } else {
        return null;
      }
    }
  }

  render() {
    const myVariable = this.changeMyVariable();
    const currentPage = this.handleCheckCurrentPage();
    return ( 
      <div className='p-center'>
        <h1>Data Visual</h1>
        <Plot data={[{
          x: myVariable !== null && myVariable.tempName,
          y: myVariable !== null && myVariable.tempMass,
          name: 'Mass',
          type: 'bar'
        }, {
          x: myVariable !== null && myVariable.tempName,
          y: myVariable !== null && myVariable.tempHeight,
          name: 'Height',
          type: 'bar'
        }]} />;
        <CustomPagination data={this.props.data.people} page={currentPage} handleNext={this.handleNext} handleBack={this.handleBack}/>
        <CustomNavigation place="data-visual"/>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      data: state.people,
  }
}

export default connect(mapStateToProps, {
  getInitPeopleData,
  getPeopleData,
})(DataVisualComponent);