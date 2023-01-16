import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage';
import SharedLayout from './components/SharedLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/react-todolist' element={<SharedLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
