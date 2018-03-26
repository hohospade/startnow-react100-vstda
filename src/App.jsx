import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      priority: '',
      todos: []
    }
    this.count = 0;
    this.selectOnChange = this.selectOnChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.saveTodos = this.saveTodos.bind(this);
    this.deleteTodos = this.deleteTodos.bind(this);
  }

  selectOnChange(event) {
    this.setState({ priority: event.target.value });
  }

  handleChange(event) {
    this.setState({ description: event.target.value })
  }

  handleClick(event) {
    event.preventDefault();
    if (this.state.description == '') {
      return false

    }

    const newTodo = {
      id: this.count++,
      description: this.state.description,
      priority: this.state.priority,
      isEditing: false
    }

    let allTodos = this.state.todos;

    allTodos.push(newTodo);

    this.setState({ todos: allTodos });

  }

  changeStatus(id) {

    const index = this.state.todos.findIndex((todo) => todo.id === id);
    const allTodos = this.state.todos;

    allTodos[index].isEditing = true;

    this.setState({ todos: allTodos });
  }

  deleteTodos(id) {
    const index = this.state.todos.findIndex((todo) => todo.id === id);
    const allTodos = this.state.todos;
    allTodos.splice(index, 1);
    this.setState({ todos: allTodos });

  }

  saveTodos(description, priority, id) {
    const index = this.state.todos.findIndex((todo) => todo.id === id);
    const todoLi = this.state.todos;
    todoLi[index].isEditing = false;
    todoLi[index].description = description;
    todoLi[index].priority = priority;
    this.setState({ todos: todoLi });

  }
  //This renders the left side for the initial input area
  render() {

    return (
      <div>
        <div className='container'>
          <h1 className="text-white">Very Simple Cat Todo App</h1>
          <h5 className="text-white">Track all of the things</h5>
          <hr className="bg-white" ></hr>
          <div className="row">
            <div className="col-md-4">
              <div className="card" >
                <div className="card-header">Add New Cat Todo</div>
                <div className="card-body">


                  <label className="textArea"><strong>I want meow....</strong></label>
                  <textarea onChange={this.handleChange} className="create-todo-text" id="Textarea1" rows="3"></textarea>
                  <p className="card-text"><strong> How much of a priority is this?</strong></p>
                  <select className="form-control mb-5 create-todo-priority" onChange={this.selectOnChange}>
                    <option value={''}>Select a Priority</option>
                    <option value={3} >High</option>
                    <option value={2} >Medium</option>
                    <option value={1} >Low</option>
                  </select>


                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary btn-block create-todo" value='submit' onClick={this.handleClick}>
                      Add Meow
                </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card w-100" >
                <div className="card-header" >
                  View Cat Todos</div>

                <div className="card-body"><strong>Welcome to my cat todo app!!!</strong>
                  <p>Your daily cat todos will display here</p>
                </div>
                <ul id="list">
                  {
                    this.state.todos.map(todo => (
                      <TodoList key={todo.id} onEdit={this.changeStatus} saveTodos={this.saveTodos} deleteTodos={this.deleteTodos} todo={todo} />
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//This renders the edit area in the right section which the background card is populate in the first component
export default App;

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.selectOnChange = this.selectOnChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editTodos = this.editTodos.bind(this);
    this.deleteTodos = this.deleteTodos.bind(this);
    this.saveTodos = this.saveTodos.bind(this);

    this.state = {
      description: '',
      priority: ''
    }
  }
  selectOnChange(event) {
    this.setState({ priority: event.target.value });
  }
  handleChange(event) {
    this.setState({ description: event.target.value });
  }
  editTodos() {
    this.setState({ description: this.props.todo.description });
    this.props.onEdit(this.props.todo.id);
  }

  //delete button for existing todos
  deleteTodos() {
    this.props.deleteTodos(this.props.todo.id);
  }

  //save button for existing todos
  saveTodos() {

    this.props.saveTodos(this.state.description, this.state.priority, this.props.todo.id);
  }
  //Medium is alert warning for yellow background. High is alert danger for red background. Low is default which is green
  render() {
    if (this.props.todo.priority == 2) {
      var priority = 'alert-warning';
    } else if (this.props.todo.priority == 3) {
      var priority = 'alert-danger';
    } else {
      var priority = 'alert-success';
    }
    if (this.props.todo.isEditing === true) {
      return (
        <div className="alert alert-success mb-0 clearfix" >

          <textarea className="form-control update-todo-text" defaultValue={this.props.todo.description} id="Textarea1" rows="1" onChange={this.handleChange}></textarea>
          <h6 className="font-weight-bold mt-3 update-todo-priority">Priority</h6>
          <select className="form-control" defaultValue={this.props.todo.priority} onChange={this.selectOnChange}>
            <option value={''}>Select a Priority</option>
            <option value="3">High</option>
            <option value="2">Medium</option>
            <option value="1">Low</option>
          </select>
          <button type="button" className="btn btn-success pull-right mr-3 update-todo " onClick={this.saveTodos}>Save Meow</button>
        </div>)
    } else {
      return (
        <li className={`alert ${priority}`}>
          <input className="form-check-input m3-2" type="checkbox" id="checkbox2" />
          {this.props.todo.description}
          <button className="btn btn-primary pull-right mr-2 delete-todo" onClick={this.deleteTodos}>
            Delete Meow
          </button>
          <button className="btn btn-primary pull-right mr-3 edit-todo" onClick={this.editTodos}>
            Edit Meow
          </button>
        </li>);
    }
  }
}