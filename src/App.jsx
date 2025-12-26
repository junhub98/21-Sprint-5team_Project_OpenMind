import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import FeedPage from './pages/FeedPage';
import SubjectsListPage from './pages/SubjectsListPage';
import SubjectsPostPage from './pages/SubjectsPostPage';

if (window.Kakao && !window.Kakao.isInitialized()) {
  console.log('Kakao JS Key:', import.meta.env.VITE_KAKAO_JS_KEY);
  window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
  console.log('Kakao SDK initialized');
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />
          <Route path="list" element={<SubjectsListPage />} />

          <Route path="/post/:subjectId" element={<FeedPage />} />
          <Route path="/post/:subjectId/answer" element={<SubjectsPostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
