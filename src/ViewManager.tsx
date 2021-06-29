import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import App from './App'
import Login from './Components/Login/Login';


class ViewManager extends Component {

  static Views() {
    return {
      main: <App/>,
      login: <Login/>
    }
  }

  static View(props : any) {
    let name = props.location.search.substr(1);

    //@ts-ignore
    let view : any = ViewManager.Views()[name];
    if(view == null) 
      throw new Error("View '" + name + "' is undefined");
    return view;
  }
  
  render() {
    return (
      <Router>
        <div>
          <Route path='/' component={ViewManager.View}/>
        </div>
      </Router>
    );
  }
}

export default ViewManager