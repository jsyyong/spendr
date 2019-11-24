import { connect } from "react-redux";
import React, { Component } from "react";

class unconnectedLogout extends Component {


 

    logoutHandler = async event => {
        let sessionId = this.props.sessionId;
        console.log('the sid to be deleted', sessionId);
        event.preventDefault();
        let response = await fetch("/deleteSession?sessionId=" + sessionId, {
          method: "POST"
        });
        let body = await response.json();
        console.log("deleteHandler body", body);
        //this.props.reload();
        if (body.success){
            console.log("success! dispatching logout")
            this.props.dispatch({type: 'logout'})
            return
        }
        console.log("fail boat :(")
        return
        
      };

    render = () => {
        return(<button onClick={this.logoutHandler}>Logout</button>)
    }
}
let mapStateToProps = state => {
    return {sessionId: state.sessionId}
}

  
  let Logout = connect(mapStateToProps)(unconnectedLogout);
  export default Logout;