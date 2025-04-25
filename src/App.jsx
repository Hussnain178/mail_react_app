import './App.css';
import LoginForm from './components/Login';
import Home from './Home';
import CreateUser from './components/CreateUser';
import DeleteUser from './components/DeleteUser';
import ChangePasssword from './components/ChangePassword';
import AccountInfo from './components/AccountInfo';
import UserAccountinfo from './components/UserAccountinfo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import UserPanel from './components/UserPanel';
import UserChangepasssword from './components/UserChangepassword';
import EditUserInfo from './components/EditUserInfo';
import UserEditUserinfo from './components/UserEditinfo';
import LogoutButton from './components/logoutButton';
import PrivateRoute from "./components/PrivateRoute";
import CompanyDataform from './components/CompanyDataform';
import CompanyTable from './components/CompanyTable';
import DeleteCompanyFormData from './components/DeleteCompanyFormData';

function App() {
  return (
   
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        
        <Route path="/create-user" element={<PrivateRoute><CreateUser /></PrivateRoute>} />
        <Route path="/add-package" element={<PrivateRoute><CompanyDataform /></PrivateRoute>} />
        <Route path="/delete-package" element={<PrivateRoute><DeleteCompanyFormData /></PrivateRoute>} />
        <Route path="/show-company" element={<PrivateRoute><CompanyTable /></PrivateRoute>} />
        <Route path="/delete-user" element={<PrivateRoute><DeleteUser /></PrivateRoute>} />
        <Route path="/change-password" element={<PrivateRoute><ChangePasssword /></PrivateRoute>} />
        <Route path="/userchange-password" element={<PrivateRoute><UserChangepasssword /></PrivateRoute>} />
        <Route path='/Account-Info' element={<PrivateRoute><AccountInfo /></PrivateRoute>} />
        <Route path='/userAccount-Info' element={<PrivateRoute><UserAccountinfo /></PrivateRoute>} />
        <Route path='/edit-user' element={<PrivateRoute><EditUserInfo /></PrivateRoute>} />
        <Route path='/useredit-user' element={<PrivateRoute><UserEditUserinfo /></PrivateRoute>} />
        <Route path='/logout' element={<PrivateRoute><LogoutButton /></PrivateRoute>} />
      </Routes>
  
  );
}

export default App;
