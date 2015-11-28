class ReportsTable extends React.Component{
  constructor(props){
    super(props);
    this.downloadReportClick = this.downloadReportClick.bind(this);
    this.deleteReportClick = this.deleteReportClick.bind(this);
    this.hardDelete = this.hardDelete.bind(this);
    this.restoreReport = this.restoreReport.bind(this);
  }
  downloadReportClick(e){
    e.preventDefault();
    let id = e.currentTarget.name;
    $.ajax({
      url: `/reports/${id}/download`,
      method: 'GET',
      dataType: 'JSON',
      data: { id: id }
    }).done(result => {
      bootbox.dialog({
        title: "Download Confirmation",
        message: 'Your report is being generated. Please check your email in a few moments.',
        buttons: {
          danger: {
            label: "Ok",
            className: "btn-danger"
          }
        }
      });
    }).fail(error => {
      console.log(error);
      bootbox.dialog({
        title: "Download Error",
        message: 'Download failed. Please try again or contact support.',
        buttons: {
          danger: {
            label: "Ok",
            className: "btn-danger"
          }
        }
      });
    });
  }
  deleteReportClick(e){
    e.preventDefault();
    let id = e.currentTarget.name;
    bootbox.confirm({
      title: 'Delete Report',
      message: 'Delete this report?',
      buttons: {
        'confirm': {
          className: 'btn-danger'}},
      callback: (choice) => {
        if(choice){
          this.props.deleteReport(id);
        }
      }
    });
  }
  hardDelete(e){
    e.preventDefault();
    let id = e.currentTarget.name;
    bootbox.confirm({
      title: 'Delete Report',
      message: 'Delete this report? This action cannot be reversed.',
      buttons: {
        'confirm': {
          className: 'btn-danger'}},
      callback: (choice) => {
        if(choice){
          this.props.hardDeleteReport(id);
        }
      }
    });
  }
  restoreReport(e){
    e.preventDefault();
    let id = e.currentTarget.name;
    this.props.restoreReport(id);
  }
  render(){
    let tableData = this.props.reports.map(item => {
      let reportPath = '/reports/' + item.id;
      let editReportPath = '/incident_information/' + item.id + '/edit';
      let downloadReportPath = reportPath + '/download';
      let deleteReport = reportPath;

      let actions = item.workflow_state === 'active' ? (
        <span className="report-action-items">
          <a href={reportPath}><i className='fa fa-file-text-o pointer show_tool_tips' data-toggle='tooltip' title='Show'></i></a>
          <a href={editReportPath}><i className='fa fa-pencil show_tool_tips' data-toggle='tooltip' title='Edit'></i></a>
          <a href={downloadReportPath} onClick={this.downloadReportClick} name={item.id}><i className='fa fa-download pointer show_tool_tips' data-toggle='tooltip' title='Download'></i></a>
          <a href='' onClick={this.deleteReportClick} name={item.id} data-toggle='tooltip' title='Delete' className='destroy button-to-link show_tool_tips'>
            <i className='fa fa-times'></i>
          </a>
        </span>
      ) : (
        <span className="report-action-items">
          <a name={item.id} onClick={this.restoreReport} href=''>Restore</a> |
          <a name={item.id} onClick={this.hardDelete} href=''>&nbsp;Delete</a>
        </span>
      );

      return(
        <tr>
          <td className={this.props.loading ? 'loading' : ''}><a href={`/reports/${item.id}`}>{item.number}</a></td>
          <td className={this.props.loading ? 'loading' : ''}>{item.date}</td>
          <td className={this.props.loading ? 'loading' : ''}>{item.type}</td>
          <td className={this.props.loading ? 'loading' : ''}>{item.address}</td>
          <td className={this.props.loading ? 'loading' : ''}>
            {actions}
          </td>
        </tr>
      );
    });
    let pagination = this.props.total_pages > 1 ? (<Paginator key={this.props.total_pages} max={this.props.total_pages} current={this.props.current_page} handleChange={this.props.handlePageChange} />) : '';
    let searchState = this.props.activeSearch ? (<span className="pull-left">Showing search results... <a href="" onClick={this.props.clearSearch}>clear</a></span>) : '';
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>Reports List</h3>
        </div>
        <div className="panel-body">
          {searchState}
          <ReportsFilter
            types={this.props.types}
            handleFilter={this.props.submitFilter}
            years={this.props.years}
            selectedFilters={this.props.selectedFilters} />
          <div className="clearfix"></div>
          <table className="table table-hover table-responsive">
            <thead>
              <th>Incident #</th>
              <th>Date</th>
              <th>Type</th>
              <th>Location</th>
              <th>Actions</th>
            </thead>
            <tbody>
              {tableData}
            </tbody>
          </table>
          <div className="pull-right">
            {pagination}
          </div>
        </div>
      </div>
    );
  }
}
