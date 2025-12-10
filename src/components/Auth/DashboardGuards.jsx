import ProtectedRoute from "./ProtectedRoute";

export const TraineeRoute = ({ children }) => (
  <ProtectedRoute allowedProfileType="trainee">
    {children}
  </ProtectedRoute>
);

export const TrainerRoute = ({ children }) => (
  <ProtectedRoute allowedProfileType="trainer">
    {children}
  </ProtectedRoute>
);

export const GymRoute = ({ children }) => (
  <ProtectedRoute allowedProfileType="gym">
    {children}
  </ProtectedRoute>
);

export const StoreRoute = ({ children }) => (
  <ProtectedRoute allowedProfileType="store">
    {children}
  </ProtectedRoute>
);
