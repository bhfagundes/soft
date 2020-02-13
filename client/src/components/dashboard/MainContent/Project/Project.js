import React, { Component } from "react";
import { connect } from "react-redux";
import { getProject } from "../../../../actions/projectsActions";

import "../MainContent.scss";
import "./Project.scss";

class Project extends Component {
  state = {
    modal: false,
    edit: false,
    name: "",
    id: ""
  };

  toggleModal = e => {
    this.setState({
      modal: !this.state.modal,
      edit: false
    });
  };

  toggleEditModal = (name, status, id, department, e) => {
    this.setState({
      modal: !this.state.modal,
      edit: !this.state.edit,
      name: name,
      status: status,
      department: department,
      id: id
    });
  };

  componentDidMount() {
    this.props.getProject(this.props.match.params.project);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.project !== prevProps.match.params.project) {
      this.props.getProject(this.props.match.params.project);
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  project: state.projects.project,
  projects: state.projects
});

export default connect(
  mapStateToProps,
  { getProject }
)(Project);
