import "./App.css";
import { QRCodeCanvas } from "qrcode.react";

function App() {
  return (
    <div className="App">
      <QRCodeCanvas value="https://reactjs.org/" />
    </div>
  );
}

export default App;
