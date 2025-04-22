import './App.css';
import LoginForm from './components/Login';
import Home from './Home';
import CreateUser from './components/CreateUser';
import DeleteUser from './components/DeleteUser';
import ChangePasssword from './components/ChangePassword';
import AccountInfo from './components/AccountInfo';
import UserAccountinfo from './components/UserAccountinfo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPanel from './components/UserPanel';
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
        <Route path="/home" element={
           <PrivateRoute>
          <Home/>
          </PrivateRoute>
          } />
        <Route path="/userpanel" element={
          <PrivateRoute>
          <UserPanel/>
          </PrivateRoute>
          } />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/add-package" element={<CompanyDataform />} />
        <Route path="/delete-package" element={<DeleteCompanyFormData />} />
        <Route path="/show-company" element={<CompanyTable />} />
        <Route path="/delete-user" element={<DeleteUser />} />
        <Route path="/change-password" element={<ChangePasssword />} />
        <Route path="/userchange-password" element={<UserChangepasssword />} />
        <Route path='/Account-Info' element={<AccountInfo />} />
        <Route path='/userAccount-Info' element={<UserAccountinfo />} />
        <Route path='/edit-user' element={<EditUserInfo />} />
        <Route path='/useredit-user' element={<UserEditUserinfo />} />
        <Route path='/logout' element={<LogoutButton />} />
      </Routes>
  
  );
}

export default App;
