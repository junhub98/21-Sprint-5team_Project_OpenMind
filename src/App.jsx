import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';

import SubjectsListPage from './pages/SubjectsListPage';


import SubjectsPostPage from './pages/SubjectsPostPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/">

          <Route index element={<MainPage />} />
          <Route path="list" element={<SubjectsListPage />} />

          <Route path="/post/answer" element={<SubjectsPostPage />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;