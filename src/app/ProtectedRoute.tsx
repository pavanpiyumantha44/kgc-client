import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./Store";

// ---- 1️⃣ Props type ----
interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

// ---- 2️⃣ Component ----
const ProtectedRoute = ({
  children,
}: ProtectedRouteProps) => {
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const location = useLocation();

  // ---- 3️⃣ Not logged in ----
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/"
        state={{ from: location }}
        replace
      />
    );
  }

  // // ---- 4️⃣ Role check ----
  // if (
  //   allowedRoles &&
  //   (!user ||
  //     !("role" in [user]) ||
  //     !allowedRoles.includes((user as { role: string }).role))
  // ) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
