import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import './App.css';
import Editor from './components/editor';
import {Todo} from './types';
import TodoItem from './components/TodoItem';

type Action = 
  | {
    type : "CREATE",
    data : {
      id : number;
      content : string;
    }
  } 
  | { type : "DELETE",  id : number;};


function reducer (state: Todo[], action : Action){
  switch(action.type){
    case 'CREATE' : {
      return [...state, action.data]
    }
    case 'DELETE' : {
      return state.filter((it) => it.id !== action.id);
    }
  }
}

// Context 객체 생성
export const TodoStateContext = React.createContext<Todo[] | null>(null);
export const TodoDispatchContext = React.createContext<{
  onClickAdd: (text : string) => void;
  onClickDelete: (id : number) => void;
} | null>(null);

// custom Hook 생성
export function useTodoDispatch(){
  const dispatch = useContext(TodoDispatchContext);
  // Null 타입이면 throw
  if(!dispatch) throw new Error("TodoDispatchContext에 문제가 있다");
  return dispatch;
}


function App() {
  const [todos, dispatch] = useReducer(reducer, []);

  // 아이디 증가시켜주는 함수
  const idRef = useRef(0);  // 자동으로 number Type으로 추론

  // 새로운 Todo Item을 생성하는 함수
  const onClickAdd = (text : string) => {
    dispatch({
      type : "CREATE", 
      data : {
        id : idRef.current++, 
        content: text,
      }
    })
  };

  //  특정 Todo Item을 삭제하는 함수 
  const onClickDelete = (id : number) => {
    dispatch({
      type : "DELETE",
      id : id, 
    })
    // todos.filter((todo)=> todo.id!==id))
  }

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <div className="App">
      <h1>Todo</h1>
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider 
          value={{
            onClickAdd, 
            onClickDelete
          }}
        >
          <Editor >
            <div>child</div>
          </Editor>
          <div>
            {todos.map((todo) => (
              // <div key={todo.id}>
              //   {todo.content}
              // </div>
              <TodoItem key={todo.id} {...todo}/>
              ))}
          </div>
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
