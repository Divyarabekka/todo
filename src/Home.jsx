// App.js File
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import './style.css'

class App extends Component {
	constructor(props) {
		super(props);

		// Setting up state
		this.state= {todo:"",list: []};
	}

	// Set a user input value
	updateInput(value) 
	{
		this.setState({todo: value});	
	}
	
	
	// Add item if user input in not empty
	addItem() {
		if (this.state.todo!== "")
		 {
			const todo = {
				id: Math.random(),
				value: this.state.todo,
			}
			
			// Update list
			const list = [...this.state.list];
			list.push(todo);

			// reset state
			this.setState({
				list,todo: "",
			});
		}
		
	}
	

	// Function to delete item from list use id to delete
	deleteItem(key) {
		const list = [...this.state.list];
		const updateList = list.filter((item) => item.id !== key);
		this.setState({list: updateList,});
	}

	editItem = (index) => {
	const todos = [...this.state.list];
	const editedTodo = prompt('Edit the todo:');
	if (editedTodo !== null && editedTodo.trim() !== '')
	 {
		let updatedTodos = [...todos]
		updatedTodos[index].value= editedTodo
		this.setState({
		list: updatedTodos,
	});
	}
	}

	render() {
		return (
            <>
			<Container>
				<Row>
					<h1>TODO</h1>
				</Row>

				<hr />
				<Row>
					<Col md={{ span: 6, }}>
						<InputGroup className="mb-4">
							<FormControl
								placeholder="add ToDo . . . "
								size="lg"
								value={this.state.todo}
								onChange={(item) =>this.updateInput(item.target.value)}
								aria-label="add something"
								aria-describedby="basic-addon2"
							/><br></br>
							<InputGroup>
								<Button
									variant="dark"
									className="mt-2"
									onClick={() => this.addItem()}> ADD TODO </Button>
                                </InputGroup>
							</InputGroup>
					</Col>
				</Row><h3>ToDo List</h3>
				
				<Row>
					<Col md={{ span: 6, offset: 8}}>
						<ListGroup style={{display:"flex",gap:"20px",margin:"-25px 200px 10px -200px"}}>
							{/* map over and print items */}
							{this.state.list.map((item, index) => {
								return (
								<div key = {index} >
									<ListGroup.Item
										variant="white"
										action
										style={{display:"flex",
												justifyContent:'space-between'}}>
										{item.value}
										<span>
										<Button style={{marginRight:"40px"}}
										variant = "primary"
										onClick={() => this.deleteItem(item.id)}>
										Delete
										</Button><br></br>
										<Button variant = "primary"
										onClick={() => this.editItem(index)}>
										Edit
										</Button><br></br>
										</span>
									</ListGroup.Item>
								</div>
								);
							})}
						</ListGroup>
					</Col>
				</Row>
				</Container>
			</>
		);
	}
}

export default App;
