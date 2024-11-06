import './App.css';
import WheelPage from './pages/WheelPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<WheelPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
