import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      element={
        user ? (
          children
        ) : (
          <Navigate
            to="/login"
            state={{ from: rest.location.pathname }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
