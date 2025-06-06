import LogInPage from "./login"
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ColourPage from './ColourMainPage';



function App() {
  
  function logOut(){
    localStorage.removeItem('token');
    
  }

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/colour" element={<ColourPage/>}/>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
      </Routes>
    </BrowserRouter>
    </>

  )
}
export default App
