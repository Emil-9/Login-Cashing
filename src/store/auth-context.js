import React, { useState, useEffect } from "react";
// we are using context to use the this without going through the react child parent flow
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // we used useEffect because the condition will trigger the component again and the component will read the condition again
  // so we hit an infinite loop
  useEffect(() => {
    const storageLoggedCheck = localStorage.getItem("isLoggedIn");
    if (storageLoggedCheck === "1") {
      setIsLoggedIn(true);
      console.log("is logged in");
    }
  }, []);

  const loginHandler = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "1");
  };
  const logoutHandler = () => {
    localStorage.setItem("isLoggedIn", "0");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
