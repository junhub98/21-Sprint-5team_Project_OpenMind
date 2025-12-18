import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import FeedPage from './pages/FeedPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/FeedPage" element={<FeedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
