import './App.css';
import Timer from './Timer';

function App() {
  return (
    <div className="App">
      <Timer workMinutes = {5} breakMinutes = {5}></Timer>
    </div>
  );
}

export default App;
