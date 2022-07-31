import { useEffect, useState } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:4000/api/todo';

const App = () => {
  const [todoList, setTodoList] = useState(null);

  // promise
  /*
  const fetchData = () => {
    axios.get('http://localhost:4000/api/todo').then((response) => {
      setTodoList(response.data);
    })
  };
  */

  // async await
  const fetchData = async () => {
    const response = await axios.get(SERVER_URL);
    setTodoList(response.data);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const done = e.target.done.checked;
    // 직렬화 부분 생략 가능
    await axios.post(SERVER_URL, { text, done });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='App'>
      <h1>Todo List</h1>
      <form onSubmit={onSubmitHandler}>
        <input name="text" />
        <input name="done" type='checkbox' />
        <input type='submit' value='추가' />
      </form>
      {/* optional chaining 으로 null일 경우 렌더링되지 않도록 */}
      {todoList?.map((todo) => (
        <div key={todo.id} style={{ display: 'flex' }}>
          <div>{todo.id}.</div>
          <div>{todo.text}</div>
          <div>{todo.done}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
