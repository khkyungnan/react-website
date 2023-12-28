import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [count, setCount] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTodo, setEditTodo] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    setCount(todos.length);
    document.title = `할일 갯수 : ${count}`;
  }, [todos, count]);

  const addTodo = () => {
    setTodos([...todos, newTodo]);
    setNewTodo('');
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const startEditing = (index, todo) => {
    setEditingIndex(index);
    setEditTodo(todo);
  };

  const saveEdit = () => {
    const updatedTodos = [...todos];
    updatedTodos[editingIndex] = editTodo;
    setTodos(updatedTodos);
    setEditingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditTodo('');
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="mt-4 mb-3">To Do List</h2>
          <Form className="mb-3">
            <Form.Group controlId="newTodo">
              <Form.Control
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="할 일 추가"
              />
            </Form.Group>
            <Button variant="primary" onClick={addTodo}>
              추가하기
            </Button>
          </Form>
          <ul>
            {todos.map((todo, index) => (
              <li key={index} className="mb-2">
                {editingIndex === index ? (
                  <div>
                    <Form.Group controlId="editTodo">
                      <Form.Control
                        type="text"
                        value={editTodo}
                        onChange={(e) => setEditTodo(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="success" onClick={saveEdit}>
                      저장
                    </Button>
                    <Button variant="danger" onClick={cancelEdit}>
                      취소
                    </Button>
                  </div>
                ) : (
                  <div>
                    {todo}
                    <Button
                      className="ml-2"
                      variant="info"
                      onClick={() => startEditing(index, todo)}
                    >
                      수정하기
                    </Button>
                    <Button
                      className="ml-2"
                      variant="danger"
                      onClick={() => removeTodo(index)}
                    >
                      삭제하기
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoList;
