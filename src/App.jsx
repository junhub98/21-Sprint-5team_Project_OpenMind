import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import FeedPage from './pages/FeedPage';
import CreateQuestion from './pages/CreateQuestion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/FeedPage" element={<FeedPage />} />
        <Route path="/CreateQuestion" element={<CreateQuestion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
