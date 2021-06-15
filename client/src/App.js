import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import TextEditor from './component/TextEditor';
import './style.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to={`/docuements/${uuidv4()}`} />
        </Route>
        <Route path="/docuements/:id" exact>
          <TextEditor />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
