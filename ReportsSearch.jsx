class ReportsSearch extends React.Component{
  constructor(props){
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.buildObject = this.buildObject.bind(this);
    this.incidentNumberSearch = this.incidentNumberSearch.bind(this);
  }
  handleDateChange(date, name){
    this.setState({[name]: date});
  }
  clearForm(e){
    e.preventDefault();
    $(React.findDOMNode(this.refs.mainForm))[0].reset();
    this.setState({start_date: '', end_date: ''});
  }
  incidentNumberSearch(e){
    e.preventDefault();
    let data = {};
    data.incident_number = React.findDOMNode(this.refs.incident_number).value;
    data.user_id = this.props.id;
    this.props.incidentSearch(data);
  }
  buildObject(e){
    e.preventDefault();
    $(React.findDOMNode(this.refs.incidentNumber))[0].reset();
    let dateType = $('ul.nav-tabs li.active').find('a').attr('name');
    let data = {};
    data.street = React.findDOMNode(this.refs.street).value;
    data.city = React.findDOMNode(this.refs.city).value;
    data.state = React.findDOMNode(this.refs.state).value;
    data.zip = React.findDOMNode(this.refs.zip).value;
    data.workflow_state = React.findDOMNode(this.refs.deleted).checked ? 'deleted' : 'active';
    data[dateType] = this.state;
    data.user_id = this.props.id;
    this.props.incidentSearch(data);
  }

  render(){
    let stateOptions = this.props.reportStates.map(state => {
      return(<option key={state}>{state}</option>);
    });
    return(
       <div className='panel panel-default'>
         <div className='panel-heading'>
           <h3 className='text-center'>Search</h3>
         </div>
         <div className='panel-body'>
           <div className="well">
             <form ref="incidentNumber" className="form" onSubmit={this.incidentNumberSearch}>
               <div className="input-group">
                 <input ref="incident_number" type="text" placeholder="Incident #" className="form-control" name='name'></input>
                 <span className="input-group-btn">
                   <button className="button button-sm" type="submit">Find</button>
                  </span>
               </div>
             </form>
           </div>
           <div className="well">
             <form ref="mainForm" className="form" onSubmit={this.buildObject}>
               <div className="form-group">
                 <label className="control-label">Address</label>
                 <input onChange={this.props.handleSearchChange} type="text" placeholder="Street" className="form-control" name='street' ref="street"></input>
                 <input onChange={this.props.handleSearchChange} type="text" placeholder="City" className="form-control" name='city' ref="city"></input>
                 <select ref="state" className="form-control"  onChange={this.props.handleSearchChange} name="state">
                   <option></option>
                   {stateOptions}
                 </select>
                 <input type="text" ref="zip" placeholder="Zip" className="form-control" name='zip' onChange={this.props.handleSearchChange}></input>
               </div>
               <div className="form-group">
                 <ul className="nav nav-tabs" ref="date_selector">
                   <li className="active"><a href="#" name="incident_started" data-toggle="tab">Incident Started</a></li>
                   <li><a href="#" name="incident_cleared" data-toggle="tab">Incident Cleared</a></li>
                 </ul>
                 <Datepicker key="start" yearEnd={0} maxDate="0" refName="start_date" onDateChange={this.handleDateChange} />
                 <Datepicker key="end" yearEnd={0} maxDate="0" refName="end_date" onDateChange={this.handleDateChange} />
               </div>
               <div className="checkbox">
                 <label>
                   <input type="checkbox" ref="deleted" /> Deleted Reports
                 </label>
               </div>

               <div className="form-group" style={{textAlign: 'right'}}>
                 <button onClick={this.clearForm} className="button button-sm button-default" type="reset">Reset</button>
                 <button className="button button-sm" type="submit">Search</button>
               </div>
             </form>
           </div>
         </div>
       </div>
    );
  }
}
