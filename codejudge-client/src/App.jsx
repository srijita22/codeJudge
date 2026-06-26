import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Homepage from './pages/Homepage';
import ProblemsPage from "./pages/ProblemsPage";
import MySubmissions from './pages/MySubmissions';
import "./index.css";
import Home from './pages/Home';
import SubmissionDetails from './pages/SubmissionDetails';
import ProblemPage from './pages/Problempage';
export default function App() {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/problems" element={<ProblemsPage />} />
      <Route path="/problems/:id" element={<ProblemPage />} />
      <Route path="/my-submissions" element={<MySubmissions />}/>
      <Route path="/submissions/:submissionId" element={<SubmissionDetails />}/>

    </Routes>
    
    </>
  );
}
