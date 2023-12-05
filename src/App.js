import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import Home from './Pages/Home';
import { UserProvider } from './userContext';
import AdminPage from './Pages/AdminPage';
import InstructorPage from './Pages/InstructorPage';
import CoursePage from './Pages/CoursePage';


function App() {
  return (
    <UserProvider>
    <div className="App bg-slate-950 h-full">
      
      <Router>

      <Routes>


        
        <Route path="/" element={<Home/>} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/adminpanel" element={<AdminPage />}/>
        <Route path="/instructorpanel/:id" element={<InstructorPage />}/>
        <Route path="/adminpanel/course/:id" element={<CoursePage />} />
        
    </Routes>
      
      </Router>
    </div>
    </UserProvider>
  );
}

export default App;
