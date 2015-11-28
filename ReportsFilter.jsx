class ReportsFilter extends React.Component{
  constructor(props){
    super(props);
    this.submitFilter = this.submitFilter.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }
  submitFilter(e){
    e.preventDefault();
    this.props.handleFilter({
      month: React.findDOMNode(this.refs.month).value || 'All',
      year: React.findDOMNode(this.refs.year).value || 'All',
      type: React.findDOMNode(this.refs.type).value || 'All'
    });
  }
  clearFilters(e){
    e.preventDefault();
    $(React.findDOMNode(this.refs.filterForm))[0].reset();
    this.props.handleFilter({
      month: React.findDOMNode(this.refs.month).value || 'All',
      year: React.findDOMNode(this.refs.year).value || 'All',
      type: React.findDOMNode(this.refs.type).value || 'All'
    });
  }
  render(){
    let yearOptions = this.props.years.map(yearFilter => {
      return(
        <option key={yearFilter}>{yearFilter}</option>
      );
    });
    let types = this.props.types.map(incidentType => {
      return(
        <option key={incidentType}>{incidentType}</option>
      );
    });
    return(
        <form ref="filterForm" className="form-inline pull-right" onSubmit={this.submitFilter}>
          <div className="form-group">
            <label>Year</label>
            <select defaultValue={this.props.selectedFilters.year} ref="year" name="year" className="">
              <option>All</option>
              {yearOptions}
            </select>
            <label>Month</label>
            <select ref="month" name="month" className="" defaultValue={this.props.selectedFilters.month}>
              <option>All</option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
            <label>Type</label>
            <select ref="type" name="type" className="" defaultValue={this.props.selectedFilters.type}>
              <option>All</option>
              {types}
            </select>
            <button onClick={this.clearFilters}>Clear</button>
            <button type="submit">Sort</button>
          </div>
        </form>
    );
  }
}
