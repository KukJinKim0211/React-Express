import { useState, useEffect } from 'react';

function App() {
  const [todoList, setTodoList] = useState(null);
  const fetchData = () => {
    fetch('http://localhost:4000/api/todo')
      .then((response) => response.json())
      .then((data) => setTodoList(data));
  }
  // 데이터를 요청하기 위해서는 Server Address, HTTP Methods가 필요하다.
  /* fetch version */
  // 렌더링 될 때 딱 한번만 실행
  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const done = e.target.done.checked;
    console.log(text, done);
    fetch('http://localhost:4000/api/todo', {
      method: 'POST',
      // JSON 형태를 보냈다고 알려줘야 함
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        done,
      }),
    }).then(() => fetchData());
  };

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
