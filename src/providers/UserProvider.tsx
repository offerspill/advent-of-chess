import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../firebase/firebaseConfig";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state: any = {
    user: null,
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async (userAuth) => {
      console.log("auth", userAuth?.emailVerified);
      const user = await generateUserDocument(userAuth);
      this.setState({ user });
    });
  };

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;
