import styles from "./app.module.css"; // 파일명에 - 입력시 적용되지 않음
import { useState, useEffect } from "react";
import { func } from "prop-types";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [showing, setShowing] = useState(false);

  // useEffect
  const onChange = (e) => {
    setKeyword(e.target.value);
  };

  const onClick = () => {
    setValue((prev) => prev + 1);
  };
  useEffect(() => {
    console.log(`I run only once`);
  }, []);
  // [] 아무것도 체크하지 않는다. => 한번만 실행되고 다시 실행되지 않는다. 아무것도 체크하는 부분이 없기 때문에.

  useEffect(() => {
    if (keyword !== "" && keyword.length > 4) {
      console.log(
        "I run when `keyword` changes.(and when keyword length when greater then 4)"
      );
    }
  }, [keyword]);
  // keyword 값을 체크한다. keyword 값에 변화가 있을 때 마다 callback이 실행된다.

  useEffect(() => {
    console.log("I run when `counter` changes.");
  }, [counter]);
  // counter 값을 체크한다. 위에 keyword 체크 useEffect와 마찬가지로 counter 값이 변할 때 마다 callback 실행.

  // CleanUp
  const showClick = () => {
    setShowing((prev) => !prev);
  };

  function Hello() {
    function destoryedFn() {
      console.log("destoryed :(");
    }
    function effectFn() {
      console.log("created :)");
      return destoryedFn;
      // cleanUp Func.
    }
    useEffect(effectFn, []);

    useEffect(() => {
      console.log("Hi :)");
      return () => console.log("Bye :(");
      // return callback함수를 cleanup function 이라고 한다.
    });
    return <h1>Hello</h1>;
  }

  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search..."
      />
      <h1 className={styles.title}>{counter}</h1>
      <button onClick={onClick}>Click Me</button>
      <buntton onClick={showClick} className={styles.btnShowHide}>
        {showing ? "Hide" : "Show"}
      </buntton>
      {showing ? <Hello /> : null}
    </div>
  );
}

export default App;
