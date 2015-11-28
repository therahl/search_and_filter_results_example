class ReportsContainer extends React.Component{
  constructor(props){
    super(props);
    this.incidentSearch = this.incidentSearch.bind(this);
    this.filterResults = this.filterResults.bind(this);
    this.handleDeleteReport = this.handleDeleteReport.bind(this);
    this.hardDelete = this.hardDelete.bind(this);
    this.restoreReport = this.restoreReport.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
    this.pageUpdate = this.pageUpdate.bind(this);
    this.state = {activeSearch: false, filters: {month: 'all', year: 'all', type: 'all'}, search: {}, loading: true};
  }
  componentWillMount(){
    $.ajax({
      url: `/reports`,
      method: 'GET',
      dataType: 'JSON',
    }).done(result => {
      this.setState({ ...result, loading: false });
    });
  }
  filterResults(data){
    this.setState({filters: data}, () => {
      this.incidentSearch();
    });
  }
  handleDeleteReport(id){
    $.ajax({
      url: `/reports/${id}`,
      method: 'DELETE',
      dataType: 'JSON',
      data: {id: id}
    }).done(result => {
      this.incidentSearch();
    });
  }
  hardDelete(id){
    $.ajax({
      url: `/hard_destroy_report`,
      method: 'DELETE',
      dataType: 'JSON',
      data: {id: id}
    }).done(result => {
      this.incidentSearch();
    });
  }
  restoreReport(id){
    $.ajax({
      url: `/restore_report`,
      method: 'PUT',
      dataType: 'JSON',
      data: {id: id}
    }).done(result => {
      this.incidentSearch();
    });
  }
  pageUpdate(page){
    let data = Object.assign(this.state, { filter: this.state.filters, page: page });
    this.setState({loading: true}, () => {
      $.ajax({
        url: `/reports`,
        method: 'GET',
        dataType: 'JSON',
        data: data
      }).done(result => {
        this.setState({ ...result, loading: false });
      });
    })
  }
  handleClearSearch(e){
    e.preventDefault();
    this.setState({search: '', activeSearch: false}, () => {
      this.incidentSearch();
    });
  }
  incidentSearch(data){
    if(data){
      this.setState({ search: data, loading: true }, () => {
        $.ajax({
          url: `/reports`,
          method: 'GET',
          dataType: 'JSON',
          data: { search: this.state.search, filter: this.state.filters }
        }).done(result => {
          this.setState({ ...result, loading: false, activeSearch: true });
        });
      });
    } else {
      this.setState({loading: true}, () => {
        $.ajax({
          url: `/reports`,
          method: 'GET',
          dataType: 'JSON',
          data: {search: this.state.search, filter: this.state.filters}
        }).done(result => {
          this.setState({ ...result, loading: false });
        });
      });
    }
  }
  render(){
    if(!this.state || !this.state.reports){
      return(<div></div>);
    }
    return(
      <div className="all-reports-container">
        <div className='col-xs-12 col-md-4'>
          <ReportsSearch
            id={this.props.id}
            handleIncidentNumber={this.incidentNumberChange}
            incidentSearch={this.incidentSearch}
            handleSearchChange={this.handleSearchChange}
            reportStates={this.state.user_states}
            handleDateChange={this.handleDateChange} />
        </div>
        <div className='col-xs-12 col-md-8'>
          <ReportsTable key={this.state.reports}
            hardDeleteReport={this.hardDelete}
            restoreReport={this.restoreReport}
            deleteReport={this.handleDeleteReport}
            activeSearch={this.state.activeSearch}
            clearSearch={this.handleClearSearch}
            loading={this.state.loading}
            types={this.props.types}
            submitFilter={this.filterResults}
            handlePageChange={this.pageUpdate}
            reports={this.state.reports}
            months={this.state.months}
            years={this.state.years}
            selectedFilters={this.state.filters}
            {...this.state}/>
        </div>
      </div>
    );
  }
}
