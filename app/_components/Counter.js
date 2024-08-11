"use client";

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      {/* <h1>there is {user.length} user </h1> */}
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
}

export default Counter;
