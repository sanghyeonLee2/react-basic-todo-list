import { useState } from "react";
import { useRef } from "react"; //Dom에 직접 접근하기 위해 사용,  리렌더링X. 컴포넌트의 속성만 조회&수정
import "./App.css";

function App() {
  const [createTodo, setCreateTodo] = useState([]);
  const [updateMode, setUpdateMode] = useState();
  const inputRef = useRef(null);

  const deleteTodo = (idx) => {
    console.log(idx);
    console.log(createTodo);
    createTodo.splice(idx, 1);
    setCreateTodo([...createTodo]);
  };

  const submitTodo = (e) => {
    e.preventDefault();
    const newTodo = e.target.firstChild.value;
    setCreateTodo([...createTodo, newTodo]);
    resetHandler();
  };

  const resetHandler = () => {
    inputRef.current.value = "";
  };

  const updateTodo = (idx) => {
    setUpdateMode(idx);
  };

  const updateComplete = (e, idx) => {
    e.preventDefault();
    const updateTodoValue = e.target.firstChild.value;
    createTodo[idx] = updateTodoValue;
    console.log(createTodo);
    setUpdateMode(false);
  };

  return (
    <div className="App">
      <h1>Todo-List</h1>
      <form onSubmit={submitTodo}>
        <input
          type="text"
          placeholder="할일을 입력하세요"
          ref={inputRef}
          required
        />
        <button type="submit">추가</button>
      </form>
      <>
        <ul>
          {createTodo.map((todo, idx) => {
            return (
              <li key={idx}>
                {idx === updateMode ? (
                  <>
                    <form onSubmit={(e) => updateComplete(e, idx)}>
                      <input
                        type="text"
                        placeholder="할일을 입력하세요"
                        defaultValue={todo}
                        required
                      />
                      <button type="submit">수정완료</button>
                    </form>
                  </>
                ) : (
                  <>
                    {todo}
                    <button type="button" onClick={() => updateTodo(idx)}>
                      수정
                    </button>
                  </>
                )}
                <>
                  <button type="button" onClick={() => deleteTodo(idx)}>
                    삭제
                  </button>
                </>
              </li>
            );
          })}
        </ul>
      </>
    </div>
  );
}

export default App;
