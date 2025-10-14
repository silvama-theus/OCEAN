import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface Props {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {
  const token = Cookies.get("x-token");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default PrivateRoute;
