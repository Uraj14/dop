import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state= {
      tableData : [
        { name : "Ujjawal", type : "double" , value: "10.000" , editable: true},
        { name : "New" , type: "bool" ,value: false, editable: true},
        { name : "something" , type: "string", value: "hello", editable: true}
      ],
      activeEdits: 0,
      isSaveAvail : false,
      currentName: null,
      currentType: null,
      currentValue: null,
      validName: true,
      validType: true,
      validValue: true,
      errMsg: "",
      newTableData: [],
      newName : null,
      newValue : null,
      newType: null,
    }
  }

  editClick = (rIndex) => {
    if(this.state.activeEdits === 0 ){
      var tableData = this.state.tableData;
      tableData.map((item,index) => {
      if(index === rIndex ){
        item.editable = false;
      }
    })
    this.setState((prevState) => ({ activeEdits : prevState.activeEdits + 1 }))
    this.setState({tableData : tableData})
    }else{
      alert("Please complete the on-going edit operation")
    }
  }

  saveClick = (rIndex) => {
    let errMsg = this.state.errMsg
    if(errMsg && errMsg.length > 3 ){
      
    }else{
      let newName = this.state.currentName
      let newType = this.state.currentType
      let newValue = this.state.currentValue
      let tableData = JSON.parse(JSON.stringify(this.state.tableData));
      tableData.map((item,index) => {
        if(index === rIndex ){
          newName !== null ? item.name = newName : null
          newType !== null ? item.type = newType : null
          newValue !== null ? item.value = newValue : null
          item.editable = true;
        }
      })
      this.setState({newTableData : tableData})
      this.setState({ activeEdits : 0})
      var popUp = document.getElementById('pop')
      popUp.style.display = "block"
    }
  }

  nameChange = () => {
    var newName = event.target.value;
    var newNameLength = newName.split(" ").length-1;
    if(newName.length < 32 && newName.length > 0 && newNameLength === 0 ){
      this.setState({ currentName : event.target.value})
    }else{
      this.setState({ currentName : null})
    }
  }

  valueChange = (type,index) => {
    let newType = this.state.currentType;
    let thisType = newType !== null ? newType : type
    let value = new String(event.target.value).valueOf();
    let validity = false;
    if(thisType === "bool"){
      validity = this.isBool(value)
      if(validity === true){
        let newValue = value.length ? (value === "true") : (value ==="false")
        this.setState({ currentValue : newValue})
      }else{
        this.setState({ currentValue : null})
        this.setState({ errMsg : "boolean"})
      }
    }
    else if(thisType === "double"){
      validity = this.isDouble(value)
      if(validity){
        this.setState({ currentValue : parseFloat(value).toFixed(2)})
      }else{
        this.setState({ currentValue : null })
        this.setState({ errMsg : "double"})
      }
    }
    else if(thisType === "string"){
      validity =  this.isString(value)
      if(validity){
        this.setState({ currentValue : value})
      }else{
        this.setState({ currentValue : null })
        this.setState({ errMsg : "string"})
      }
    }

    
  }

  isBool = (value) => {
    if(value === "false" || value === "true" ){
      return true;
      
    }else {
      return false;
    }
  }

  isDouble = (value) => {
    var exclude = /[ `!@#$%^&*()=\[\]{};':"\\|,<>\/?~a-zA-Z]/;
    var result = exclude.test(value);
    if(result === false && value.length < 16){
      return true
    }else{
      return false
    }
  }

  isString = (value) => {
    var exclude = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    var result = exclude.test(value);
    if(result === false && value.length < 16 ){
      return true;
    }else{
      return false;
    }
  }

  typeChange = () => {
    this.setState({ currentType : event.target.value})
  }

  back = () => {
    let popUp = document.getElementById('pop')
    popUp.style.display = "none"
  }

  confirm = () => {
    var Data = JSON.parse(JSON.stringify(this.state.newTableData));
    this.setState({ tableData : Data })
    this.setState({ newTableData : []})
    let popUp = document.getElementById('pop')
    popUp.style.display = "none"
    
  }

  addButton= () => {
    let x = document.getElementById('newInput');
    let y = document.getElementById('add')
    x.style.display = "block";
    y.style.display = "none";

  }

  addNewName = () => {
    var newName = event.target.value;
    var newNameLength = newName.split(" ").length-1;
    if(newName.length < 32 && newName.length > 0 && newNameLength === 0 ){
      this.setState({ newName : event.target.value})
    }else{
      this.setState({ newName : null})
    }

  }

  addNewType =() => {
    var value = event.target.value;
    this.setState({newType : value})
  }

  addNewValue = () => {
    let value = new String(event.target.value).valueOf();
    var thisType = this.state.newType;
    let validity = false;
    if(thisType === "bool"){
      validity = this.isBool(value)
      if(validity === true){
        let newValue = value.length ? (value === "true") : (value ==="false")
        this.setState({ newValue : newValue})
      }else{
        this.setState({ newValue : null})
        this.setState({ errMsg : "boolean"})
      }
    }
    else if(thisType === "double"){
      validity = this.isDouble(value)
      if(validity){
        this.setState({ newValue : parseFloat(value).toFixed(2)})
      }else{
        this.setState({ newValue : null })
        this.setState({ errMsg : "double"})
      }
    }
    else if(thisType === "string"){
      validity =  this.isString(value)
      if(validity){
        this.setState({ newValue : value})
      }else{
        this.setState({ newValue : null })
        this.setState({ errMsg : "string"})
      }
    }


  }
  addRow = () => {
    let {newName, newType, newValue } = { ... this.state}
    let tableDataEntry = {
      name: newName,
      type: newType,
      value: newValue,
      editable: true
    }
    let tableData = JSON.parse(JSON.stringify(this.state.tableData))
    tableData.push(tableDataEntry)
    this.setState({tableData: tableData})
    let x = document.getElementById('newInput');
    let y = document.getElementById('add')
    x.style.display = "none";
    y.style.display = "block";

  }




  render() {
    return (
      <div>
        <div id="pop" className="pop">
          <div className="modal-content">
              {
                this.state.currentName !== null && this.state.currentName.length > 0 ? 
                  <span> <p> New Name : {this.state.currentName} </p></span>
                :
                null
              }
              {
                this.state.currentType !== null && this.state.currentType.length > 0 ? 
                  <span> <p> New Type : {this.state.currentType} </p></span>
                :
                null
              }
              {
                this.state.currentValue !== null && this.state.currentValue.length > 0 ? 
                  <span> <p> New Value : {this.state.currentValue} </p></span>
                :
                null
              }
              <button onClick={this.confirm}>Confirm</button>
              {/* <button onClick={this.back}>Go Back</button> */}
          </div>
        </div>


        <table className="Table">
                    <tbody>
                        <tr>
                            <th>
                               <p> Name </p>
                            </th>
                            <th>
                               <p> Type </p>
                            </th>
                            <th>
                                <p> Value </p>
                            </th>
                            <th>
                                <p> Action </p>
                            </th>
                        </tr>
                        {
                          this.state.tableData && this.state.tableData.length ?
                          this.state.tableData.map((item,index) => {
                            return(
                              item.editable ?
                              <tr key={index}>
                                <td>
                                  {item.name}
                                </td>
                                <td>
                                  {item.type}
                                </td>
                                <td>
                                  {item.value !== null ? item.value.toString() : null}
                                </td>
                                <td>
                                  <button onClick={() => {this.editClick(index)}}> Edit  </button>
                                </td>
                              </tr>
                              :
                              <tr key={index}>
                                <td>
                                  <input type="text" id="name" name="name" onChange={this.nameChange} placeholder={item.name} />
                                </td>
                                <td>
                                  <select name="type" id="type" onChange={this.typeChange}>
                                    <option selected disabled>{item.type}</option>
                                    <option value="double">double</option>
                                    <option value="string">string</option>
                                    <option value="bool">bool</option>
                                  </select>
                                </td>
                                <td>
                                  <input type="text" id="name" name="name" onChange={() => {this.valueChange(item.type,index)}} placeholder={item.value}/>
                                </td>
                                <td>
                                  <button onClick={() => this.saveClick(index)}> Save  </button>
                                </td>
                              </tr>
                            )
                            
                          })
                          :
                          null
                        }
                        
                    </tbody>
                    
                </table>
                <div className="newRow"> 
                  <div className="newInput" id="newInput">
                    <label> </label> <input type="text" id="name" name="name" placeholder=" Enter Name" onChange={this.addNewName}/>
                     <label> </label>
                      <select name="type" id="type" onChange={this.addNewType}>
                        <option selected disabled>  Select Type </option>
                        <option value="double">double</option>
                        <option value="string">string</option>
                        <option value="bool">bool</option>
                      </select>
                    
                    <span><input type="text" id="name" name="name" placeholder="Enter Value" onChange={this.addNewValue}/></span>
                    <br></br><button className="new" id="new" onClick={this.addRow}> Add Rows </button>
                  </div>
                  <button className="add" id="add" onClick={this.addButton}> Add Rows </button>
                </div>

      </div>
    );
  }
}

export default App;
