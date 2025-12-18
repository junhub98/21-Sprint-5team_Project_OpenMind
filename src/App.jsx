import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SubjectsPostPage from './pages/SubjectsPostPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<SubjectsPostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
