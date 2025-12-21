import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SubjectsListPage from './pages/SubjectsListPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/">
          <Route index element={<MainPage />} />
          <Route path="list" element={<SubjectsListPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
