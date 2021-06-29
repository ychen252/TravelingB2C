import React from "react";
import styles from "./App.module.css";
import { HomePage, RegisterPage, SignInPage, DetailPage } from "./pages";
import { BrowserRouter, Route, Switch } from "react-router-dom";


function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={HomePage}/>
          <Route path="/signIn" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/detail/:touristRouteId" component={DetailPage}/>
          <Route component={() => (<h1>Sorry, 404 NOT FOUND</h1>)}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
