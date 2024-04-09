import { ReactElement, useContext, useState } from "react";
import { TodoDispatchContext, useTodoDispatch } from "../App";

interface Props {
    children : ReactElement;
}


export default function Editor (props : Props){

  const dispatch = useTodoDispatch();

  const [text, setText] = useState("");

  // 이벤트 핸들러 사용 -미리 정의된 이벤트 객체 타입 불러오기
  const onChangeInput = (e : React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const onClickButton = () => {
    dispatch.onClickAdd(text);
    setText("");
  };

    return <div>
            <input 
                value={text} 
                onChange={onChangeInput}
            />
            <button onClick={onClickButton}>추가</button>
        </div>
}