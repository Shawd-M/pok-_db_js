import React from "react";
import Home from "./pages/Home/index.js";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'antd/dist/antd.css';
import Header from "./components/Header.js";
import Container from "./components/Container.js";
import Pokemon from "./pages/pokemon/index.js";



const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/pokemon/:id">
            <Pokemon />
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}
export default App;