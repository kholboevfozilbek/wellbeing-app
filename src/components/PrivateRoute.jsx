import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  // Optionally, you can check for admin claims here if needed
  return currentUser ? children : <Navigate to="/login" replace />;
}
