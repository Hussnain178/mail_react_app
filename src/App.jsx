import './App.css';
import LoginForm from './components/Login';
import Home from './Home';
import CreateUser from './components/CreateUser';
import DeleteUser from './components/DeleteUser';
import ChangePasssword from './components/ChangePassword';
import AccountInfo from './components/AccountInfo';
// import UserAccountinfo from './components/UserAccountinfo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import UserChangepasssword from './components/UserChangepassword';
import EditUserInfo from './components/EditUserInfo';

import LogoutButton from './components/logoutButton';
import PrivateRoute from "./components/PrivateRoute";
import CompanyDataform from './components/CompanyDataform';
import CompanyTable from './components/CompanyTable';
import DeleteCompanyFormData from './components/DeleteCompanyFormData';
import SentDetailPage from './components/SentDetailPage';
import AgentFormData from './components/AgentFormData';
import SuperAdminPassword from './components/SuperAdminPassword';
import ShowUserTable from './components/ShowUserTable';
import Smtp2go from './components/Smtp2go';

function App() {
  return (
   
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        
        <Route path="/home" element={<PrivateRoute allowedRoles={["admin","agent"]}><Home /></PrivateRoute>} />
        
        <Route path="/create-user" element={<PrivateRoute allowedRoles={["admin"]} ><CreateUser /></PrivateRoute>} />
        <Route path="/add-package" element={<PrivateRoute allowedRoles={["admin"]}><CompanyDataform /></PrivateRoute>} />
        <Route path="/delete-package" element={<PrivateRoute allowedRoles={["admin"]}><DeleteCompanyFormData /></PrivateRoute>} />
        <Route path="/show-company" element={<PrivateRoute allowedRoles={["admin", "agent"]}><CompanyTable /></PrivateRoute>} />
        <Route path="/delete-user" element={<PrivateRoute allowedRoles={["admin"]}><DeleteUser /></PrivateRoute>} />
        <Route path="/AgentForm" element={<PrivateRoute allowedRoles={["agent"]}><AgentFormData /></PrivateRoute>} />
        <Route path="/change-password" element={<PrivateRoute allowedRoles={["admin"]}><ChangePasssword /></PrivateRoute>} />
        {/* <Route path="/userchange-password" element={<PrivateRoute allowedRoles={["agent"]}><UserChangepasssword /></PrivateRoute>} /> */}
        <Route path='/Account-Info' element={<PrivateRoute allowedRoles={["admin","agent"]}><AccountInfo /></PrivateRoute>} />
        <Route path='/Smtp2go' element={<PrivateRoute allowedRoles={["admin","agent"]}><Smtp2go /></PrivateRoute>} />

        {/* <Route path='/userAccount-Info' element={<PrivateRoute allowedRoles={["agent"]}><UserAccountinfo /></PrivateRoute>} /> */}
        <Route path='/edit-user' element={<PrivateRoute allowedRoles={["admin","agent"]}><EditUserInfo /></PrivateRoute>} />
        {/* <Route path='/useredit-user' element={<PrivateRoute allowedRoles={["agent"]}><UserEditUserinfo /></PrivateRoute>} /> */}
        <Route path='/logout' element={<PrivateRoute><LogoutButton /></PrivateRoute>} />
        <Route path='/details' element={<PrivateRoute allowedRoles={["admin","agent"]} ><SentDetailPage /></PrivateRoute>} />
        <Route path='/staff-changepassword' element={<PrivateRoute allowedRoles={["admin"]} ><SuperAdminPassword /></PrivateRoute>} />
        <Route path='/staff-directory' element={<PrivateRoute allowedRoles={["admin"]} ><ShowUserTable /></PrivateRoute>} />
        
        
      </Routes>
  
  );
}

export default App;
