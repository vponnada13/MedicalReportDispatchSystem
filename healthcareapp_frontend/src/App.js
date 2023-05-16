import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import PublicRoute from './routes/publicRoute';
import PrivateRoute from './routes/privateRoute';

import { Login } from './pages/login/Login';
import { Dashboard, DoctorDashboard } from './pages/doctorDashboard/DoctorDashboard';
import { LabDashboard } from './pages/labDashboard/LabDashboard';
import { CompletedList } from './pages/completedList/CompletedList';
import { Register } from './pages/register/Register';

function App() {
  return (
    <Router>
        <Switch>
          {/* <Redirect from="/" to="/login" /> */}
           <PrivateRoute path="/dashboard" component={DoctorDashboard} />
           <PrivateRoute path="/labDashboard" component={LabDashboard} />
           <PrivateRoute path="/completedlist" component={CompletedList} />
           {/* <PrivateRoute path="/drive/my-drive" component={MyDrive} /> */}
           {/* <Route path="/folder/:id" component={Folder} /> */}
           <PublicRoute path="/register" component={Register} />
           <PublicRoute path="/login" restricted={true} component={Login} exact/>
           {/* <PrivateRoute path="/addUsers" component={addUsers} /> */}
        </Switch>
      </Router>
  );
}

export default App;
