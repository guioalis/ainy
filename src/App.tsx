import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { ChatPage } from './components/ChatPage';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}

export default App;
