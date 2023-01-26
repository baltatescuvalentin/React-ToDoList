import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage';
import Signin from './components/Signin';
import SharedLayout from './components/SharedLayout';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';
import Wrapper from './components/TasksComponents/Wrapper';
import { AuthProvider } from './contexts/AuthContext';
import Error from './components/Error';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='react-todolist' element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route path='signup' element={<Signup />} />
            <Route path='signin' element={<Signin />} />
            <Route path='resetpassword' element={<ResetPassword />} />
            <Route path='tasks' element={<Wrapper />} />
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
