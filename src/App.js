import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Books from './components/Books';
import ConfirmSignUp from './components/ConfirmSignUp';
import Navbar from './components/UI/Navbar';
import { AuthProvider } from './components/contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import MyBooks from './components/MyBooks';

function App() {
  return (
    <AuthProvider>
    <Router>
    <Navbar/>
    <ToastContainer/>
      <Switch>  
         <PrivateRoute exact path="/" component={Books}/> 
         <PrivateRoute exact path="/mybooks" component={MyBooks} /> 
        <Route exact path="/signin">
          <SignIn/>
        </Route>
        <Route exact path="/signup">
          <SignUp/>
        </Route>
        <Route exact path="/confirm-signup">
          <ConfirmSignUp/>
        </Route>
        </Switch>
     </Router>
     </AuthProvider>
  );
}

export default App;
