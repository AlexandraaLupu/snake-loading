import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProgressBarLoader from './ProgressBarLoader';
import './App.css';
import NewContentPage from './NewContentPage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex items-center justify-center h-screen w-screen bg-gray-700">
        <Routes>
          <Route path="/" element={<ProgressBarLoader />} />
          <Route path="/new-content" element={<NewContentPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
