import './App.css';
import LoginForm from './components/Login';
import Home from './Home';
import CreateUser from './components/CreateUser';
import DeleteUser from './components/DeleteUser';
import ChangePasssword from './components/ChangePassword';
import AccountInfo from './components/AccountInfo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPanel from './components/UserPanel';
import UserChangepasssword from './components/UserChangepassword';

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/home" element={<UserPanel/>} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/delete-user" element={<DeleteUser />} />
        <Route path="/change-password" element={<ChangePasssword />} />
        <Route path="/userchange-password" element={<UserChangepasssword />} />
        <Route path='/Account-Info' element={<AccountInfo />} />
      </Routes>
  
  );
}

export default App;
