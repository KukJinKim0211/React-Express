const express = require('express');
const app = express();
const cors = require('cors');

// CORS 에러 방지. 어떠한 origin도 가능
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let id = 2;
const todoList = [{
  id: 1,
  text: '리액트 공부하기',
  done: false,
}];


app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/api/todo', (req, res) => {
  res.json(todoList);
});

app.post('/api/todo', (req, res) => {
  const { text, done } = req.body;
  console.log(req.body);
  console.log(text, done);
  todoList.push({
    id: id++,
    text,
    done
  });
  return res.send('sucess');
});

app.listen(4000, () => {
  console.log('server start!!');
});