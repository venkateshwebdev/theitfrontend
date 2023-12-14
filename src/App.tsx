import "./App.css";
import DarkLightIcon from "./components/DarkLightIcon";

function App() {
  return (
    <div className="flex align-middle justify-end gap-4 p-4">
      <DarkLightIcon />
      <button className="btn btn-primary rounded-full">+ Add row</button>
      <button className="btn btn-primary rounded-full">Send rows</button>
    </div>
  );
}

export default App;
