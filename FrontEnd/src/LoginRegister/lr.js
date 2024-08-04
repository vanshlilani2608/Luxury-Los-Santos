import React, { useState } from "react";
import './regis.module.css';
import './index.module.css';
import { Login } from "./Login";
import { Register } from "./Register";
import BgVideo from './BgVideo'
function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
      <BgVideo/>
    </div>
  );
}
export default App;
