import React, { Component } from 'react';
import { Table, Navbar } from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Apps extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jsonList : [],
      selectedOption: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('http://www.json-generator.com/api/json/get/ceXEbnhzkO?indent=2', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        jsonList : json,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption : selectedOption });
		if (selectedOption) {
    	console.log(`Selected: ${selectedOption.label}`);
		}
  }

  render() {

    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Data Fetcher</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse> 
            <Navbar.Text pullRight>Have a great day!</Navbar.Text>
          </Navbar.Collapse>
        </Navbar>

        <div className='container'>
          <h1>Welcome to the Data fetcher</h1>
          <br />
            <div className="row">
              <div className="col-sm-3">
                <Select
                  name="form-field-name"
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={
                    this.state.jsonList.map(item => {
                      return (
                        { value : `${item.name}`, label : `${item.name}` }
                      )
                    })
                  }
                />
              </div>
          </div>
          <hr />
          <Table responsive hover bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Age</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {this.state.jsonList.map(item => {
                if(this.state.selectedOption === null || item.name === this.state.selectedOption.value) {
                  return (
                    <tr>
                      <td key={ item.name }>{ item.name }</td>
                      <td key={ item.address }>{ item.address }</td>
                      <td key={ item.age }>{ item.age }</td>
                      <td key={ item.comp }>{ item.company }</td>
                    </tr>
                  )
                }
                else
                  return (null);
              })}
              
            </tbody>
          </Table>
        </div>
      </div>
    );

  }
}

export default Apps;
