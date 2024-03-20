import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Welcome from './pages/get-started';
import UploadImage from './pages/upload-image';
import HistoryPage from './pages/history-page';
import Profile from "./pages/profile";
import About from "./pages/about";
import FeedbackPage from "./pages/feedback-page";
import Resources from "./pages/resources";

import ProtectedRoutes from "./components/ProtectedRoute";
import PublicRoutes from "./components/PublicRoute";


const App = () => {
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<PublicRoutes><Welcome /></PublicRoutes>} />
          <Route path="/upload-image-and-pred" element={<ProtectedRoutes><UploadImage /></ProtectedRoutes>} />
          <Route path="/history-page" element={<ProtectedRoutes><HistoryPage /></ProtectedRoutes>} />
          <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
          <Route path="/about-us" element={<ProtectedRoutes><About /></ProtectedRoutes>} />
          <Route path="/feedback-page" element={<ProtectedRoutes><FeedbackPage /></ProtectedRoutes>} />
          <Route path="/resources" element={<ProtectedRoutes><Resources /></ProtectedRoutes>} />
          
        </Routes>

        <ToastContainer />

      </BrowserRouter>
    </>
  )
}

export default App;