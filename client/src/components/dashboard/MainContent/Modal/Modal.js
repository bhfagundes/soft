import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  createProject,
  updateProject,
  deleteProject
} from "../../../../actions/projectsActions";
import "./Modal.scss";
class Modal extends Component {
  state = {
    projectName: "",
    department: "",
    status: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit) {
      this.setState({
        projectName: nextProps.name,
        status: nextProps.status,
        department: nextProps.department
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  createProject = () => {
    let project = {
      projectName: this.state.projectName,
      members: this.state.members,
      status: this.state.status,
      department: this.state.department
    };

    this.props.createProject(project);
    this.onClose();
  };

  updateProject = async id => {
    let project = {
      id: this.props.id,
      department: this.state.department,
      status: this.state.status,
      projectName: this.state.projectName,
      members: this.state.members
    };

    await this.props.updateProject(project);

    this.onClose();
    window.location.reload();
  };

  deleteProject = id => {
    this.props.deleteProject(id, this.props.history);
    this.onClose();
  };

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
    this.setState({
      projectName: "",
      department: "",
      status: ""
    });
  };

  onSelectChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    if (!this.props.modal) {
      return null;
    }
    // Edit project modal
    else if (this.props.edit) {
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Editar projeto</h1>

          <div className="form-group">
            <label>
              <div className="form-label">Nome do projeto (obrigatório)</div>
              <input
                onChange={this.onChange}
                value={this.state.projectName}
                id="projectName"
                type="text"
                placeholder={"Meu projeto"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Setor</div>
              <select
                onChange={this.onChange}
                value={this.state.department}
                id="department"
                type="text"
                placeholder="Selecione um status"
                className="form-input"
              >
                <option id="1"> Financeiro </option>
                <option id="2">Suporte</option>
                <option id="3">RH</option>
                <option id="4">Desenvolvimento</option>
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Status</div>
              <select
                onChange={this.onChange}
                value={this.state.status}
                id="status"
                type="text"
                placeholder="Selecione um status"
                className="form-input"
              >
                <option id="1"> Aberto</option>
                <option id="2">Em atendimento</option>
                <option id="3">Fechado</option>
                <option id="4">Cancelado</option>
              </select>
            </label>
          </div>

          <div>
            <button
              className="main-btn update-project"
              onClick={this.updateProject.bind(this, this.props.id)}
            >
              Atualizar Projeto
            </button>
            <button
              className="main-btn delete-project"
              onClick={this.deleteProject.bind(this, this.props.id)}
            >
              Remover Projeto
            </button>
          </div>
        </div>
      );
    }

    // Create project modal
    else
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Criar Projeto</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Nome do projeto (obrigatório)</div>
              <input
                onChange={this.onChange}
                value={this.state.projectName}
                id="projectName"
                type="text"
                placeholder="Meu projeto"
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Setor</div>
              <select
                onChange={this.onChange}
                value={this.state.department}
                id="department"
                type="text"
                placeholder="Selecione um status"
                className="form-input"
              >
                <option id="1">Financeiro </option>
                <option id="2">Suporte</option>
                <option id="3">RH</option>
                <option id="4">Desenvolvimento</option>
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Status</div>
              <select
                onChange={this.onChange}
                value={this.state.status}
                id="status"
                type="text"
                placeholder="Selecione um status"
                className="form-input"
              >
                <option id="1">Aberto</option>
                <option id="2">Em atendimento</option>
                <option id="3">Fechado</option>
                <option id="4">Cancelado</option>
              </select>
            </label>
          </div>

          <div>
            <button
              className="main-btn create-project"
              onClick={this.createProject}
            >
              Criar Projeto
            </button>
          </div>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  projects: state.projects
});

export default connect(
  mapStateToProps,
  {
    createProject,
    updateProject,
    deleteProject
  }
)(withRouter(Modal));
