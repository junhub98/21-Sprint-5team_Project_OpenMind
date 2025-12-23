import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import FeedPage from './pages/FeedPage';
import CreateQuestion from './pages/CreateQuestion';

import SubjectsListPage from './pages/SubjectsListPage';

import SubjectsPostPage from './pages/SubjectsPostPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />
          <Route path="list" element={<SubjectsListPage />} />
          <Route path="/FeedPage" element={<FeedPage />} />
          <Route path="/post/:subjectId" element={<CreateQuestion />} />
          <Route path="/post/:subjectId/answer" element={<SubjectsPostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
