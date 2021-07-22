import React, {useEffect} from "react";
import styles from "./App.module.css";
import { HomePage, RegisterPage, 
  SignInPage, DetailPage,
  SearchPage, PlaceOrderPage} from "./pages";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect} from "react-router-dom";
import { useSelector } from "./redux/hooks";
import { ShoppingCartPage} from "./pages/shoppingCart";
import { useDispatch } from "react-redux";
import { getShoppingCart} from "./redux/shoppingCart/slice";


const PrivateRoute = ({component, isAuthenticated, ...rest}) =>{
  const routeComponent = (props) => {
    return isAuthenticated ? React.createElement(component,props)
      : <Redirect to={{pathname : "/signIn"}}/>
  }
  return <Route render={routeComponent} {...rest}/>
}

function App() {
  const jwt = useSelector((state)=>state.user.token);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(jwt){
      dispatch(getShoppingCart(jwt));
    }
  },[jwt]);

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={HomePage}/>
          <Route path="/signIn" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/detail/:touristRouteId" component={DetailPage}/>
          <Route path="/search/:touristRouteId" component={SearchPage} />
          <PrivateRoute 
          isAuthenticated = {jwt!=null}
          path="/shoppingCart" component = {ShoppingCartPage}
          />
          <PrivateRoute 
          isAuthenticated = {jwt!=null}
          path="/placeOrder" component = {PlaceOrderPage}
          />
          <Route component={() => (<h1>404 NOT FOUND</h1>)}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
