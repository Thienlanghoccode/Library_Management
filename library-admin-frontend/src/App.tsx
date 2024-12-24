import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BorrowAndReturnBook } from './pages/borrowAndReturnBook/BorrowAndReturnBook';
import './App.css';
import { BookManager } from './pages/bookManager/BookManager';
import { StaticTab } from './pages/statistics/tabStatic';
import Login from './pages/login/login';
import { AuthProvider } from './pages/login/authContext';
import PrivateRoute from './pages/login/privateRoute';
import { UserManager } from './pages/bookManager/UserManager';
import './utils/setupFetch'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Navigate to="/book" />} />
            <Route path="/borrowreturn" element={<BorrowAndReturnBook />} />
            <Route path="/book" element={<BookManager />} />
            <Route path="/statistical" element={<StaticTab />} />
            <Route path='/user-management' element={<UserManager />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
