import React, { useState } from "react";

const Test = (props) => {
  const [count, setCount] = useState(0);

  const handleAlertClick = () => {
    setTimeout(() => {
      alert("You clicked on: " + count);
    }, 3000);
  };

  console.info("------");
  return (
    <div>
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        点击
      </button>

      <br />
      <br />
      <br />
      <button onClick={handleAlertClick}>点击二</button>
    </div>
  );
};

export default React.memo(Test);
