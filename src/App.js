import "./App.css";
import InputSection from "./components/InputSection";

function App() {
  return (
    <div className="bg-warning vh-100 vw-100">
      <div className="title position-absolute">
        <h1 className="p-3 text-white text-center">GoUrl</h1>
      </div>
      <InputSection />
    </div>
  );
}

export default App;
