import React from "react";
import ReactDOM from "react-dom/client";
import Body from "./components/Body";

function App() {
    return (
      <div className="App">
        <Body/>
      </div>
    );
  }
  
  export default App;
  const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App/>);
