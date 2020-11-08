import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInitPeopleData, getPeopleData } from '../../redux/action/swapiAction';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CustomPagination from './../CustomPagination/CustomPagination'
import CustomNavigation from './../CustomNavigation/CustomNavigation'
import './DataTableComp.css'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class DataTableComp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
        
        //name, height, mass, hair_color, skin_color 
        this.columns = [
            {field: 'name', header: 'Name'},
            {field: 'height', header: 'Height'},
            {field: 'mass', header: 'Mass'},
            {field: 'hair_color', header: 'Hair_color'},
            {field: 'skin_color', header: 'Skin_color'},
        ];
    }

    componentDidMount() {
        this.props.getInitPeopleData();
    }

    handleNext = () => {
        const next = this.props.data.people.next
        const page = next && next.split('=')
        if(next){
            this.props.getPeopleData(next);
            this.props.history.push(`/data-table/?page=${page[1]}`)
        }
    }

    handleBack = () => {
        const prev = this.props.data.people.previous
        const page = prev && prev.split('=')
        if(prev){
            this.props.getPeopleData(prev);
            this.props.history.push(`/data-table/?page=${page[1]}`)
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
        const currentPage = this.handleCheckCurrentPage();
        const dynamicColumns = this.columns.map((col,i) => {
            return <Column key={col.field} field={col.field} header={col.header} />;
        });
        return ( 
            <div className='p-center'>
                <h1>Data Table</h1>
                <DataTable value={this.props.data.people.results}>
                    {dynamicColumns}
                </DataTable>
                <CustomPagination data={this.props.data.people} page={currentPage} handleNext={this.handleNext} handleBack={this.handleBack}/>
                <CustomNavigation place="data-table"/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.people
    }
}

export default connect(mapStateToProps, {
    getInitPeopleData,
    getPeopleData,
  })(DataTableComp);