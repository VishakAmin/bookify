import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Books from './components/Books';
import ConfirmSignUp from './components/ConfirmSignUp';
import Navbar from './components/UI/Navbar';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>  
        <Route path="/signin">
          <SignIn/>
        </Route>
        <Route path="/signup">
          <SignUp/>
        </Route>
        <Route path="/confirm-signup">
          <ConfirmSignUp/>
        </Route>
         <Route path="/">
          <Books />
        </Route>
      </Switch>
     </Router>
  );
}

export default App;
