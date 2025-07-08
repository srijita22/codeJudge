import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/Homepage';
import ProblemsPage from "./pages/ProblemsPage";

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/problems" element={<ProblemsPage />} />
    </Routes>
    <h1>hello</h1>
    </>
  );
}
