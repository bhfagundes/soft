import React, { Component } from "react";
import "./MainContent.scss";
import "./Dashboard.scss";

import { connect } from "react-redux";

import Modal from "./Modal/Modal";

class Dashboard extends Component {
  state = {
    modal: false,
    edit: false,
    name: "",
    members: [],
    id: "",
    status: "",
    department: "",
    owner: {}
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal, edit: false });
  };

  toggleEditModal = (name, members, id, owner, status, department, e) => {
    e.stopPropagation();

    this.setState({
      modal: !this.state.modal,
      edit: !this.state.edit,
      name: name,
      members: members,
      status: status,
      department: department,
      id: id,
      owner: owner
    });
  };

  render() {
    const { projects } = this.props.projects;

    let content;
    let projectData = "";
    if (projects) {
      projectData = projects.sort().map(project => (
        <div
          key={project._id}
          className="project-icon"
          onClick={this.toggleEditModal.bind(
            this,
            project.name,
            project.status,
            project.department,
            project.teamMembers,
            project._id,
            project.owner
          )}
        >
          <div className="project-name">{project.name}</div>
          <div
            className="project-info-button"
            onClick={this.toggleEditModal.bind(
              this,
              project.name,
              project.teamMembers,
              project._id,
              project.status,
              project.department,
              project.owner
            )}
          >
            Editar Projeto
          </div>
        </div>
      ));
    }
    if (projects != null && projects.length > 0) {
      // At least one project
      content = (
        <>
          <button className="main-btn" onClick={this.toggleModal}>
            Criar outro projeto
          </button>
          <div className="modal-wrapper">
            <Modal
              onClose={this.toggleModal}
              modal={this.state.modal}
              edit={this.state.edit}
              name={this.state.name}
              department={this.state.department}
              status={this.state.department}
              members={this.state.members}
              id={this.state.id}
              owner={this.state.owner}
            />
          </div>
          <div className="projects-wrapper">{projectData}</div>
        </>
      );
    } else {
      // No projects
      content = (
        <>
          <div className="projects">
            <div className="no-projects">
              <h1 className="header">Não há projetos cadastrados</h1>
              <button className="main-btn" onClick={this.toggleModal}>
                Criar projeto
              </button>
              <div className="modal-wrapper">
                <Modal onClose={this.toggleModal} modal={this.state.modal} />
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="main-content">
        <h1 className="header">Your Projects</h1>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
