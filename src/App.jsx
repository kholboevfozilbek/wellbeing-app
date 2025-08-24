import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import AddArticleForm from './components/AddArticleForm';
import ArticleList from './components/ArticleList';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import { useAuth } from './contexts/AuthContext';
import { auth } from './firebase';
import './App.css';

function Header({ currentUser }) {
  return (
    <header className="mb-6 py-4 border-b flex flex-col sm:flex-row justify-between items-center px-4">
      <Link to="/" className="font-bold text-2xl text-blue-600 mb-2 sm:mb-0">Wellbeing App</Link>
      <nav>
        {currentUser ? (
          <>
            <Link to="/admin" className="mr-4">Admin Panel</Link>
            <span className="text-green-600 font-semibold">Admin</span>
          </>
        ) : (
          <Link to="/login" className="bg-blue-500 text-white px-3 py-1 rounded">Login</Link>
        )}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-8 py-4 border-t text-center text-gray-500 text-sm px-4">
      &copy; {new Date().getFullYear()} Wellbeing App. All rights reserved.
    </footer>
  );
}

function AdminPanel() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
      </div>
      <AddArticleForm />
      <ArticleList />
    </div>
  );
}

function App() {
  const { currentUser } = useAuth();
  return (
    <BrowserRouter>
      <div className="max-w-2xl w-full mx-auto min-h-screen flex flex-col bg-white shadow-lg rounded-lg p-2 sm:p-6">
        <Header currentUser={currentUser} />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            } />
            <Route path="/" element={
              <>
                {currentUser ? <AddArticleForm /> : null}
                <ArticleList />
              </>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
