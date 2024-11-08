import './App.css';
import WheelPage from './pages/WheelPage';
import QuestionPage from './pages/QuestionPage';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<WheelPage/>}/>
          <Route path="/:id" element={<QuestionPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
