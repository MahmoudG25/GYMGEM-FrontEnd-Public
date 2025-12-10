import { Link } from "react-router-dom";
import { AlertCircle, Home } from "lucide-react";

const AccessDenied = ({ message }) => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 rounded-full bg-red-50 p-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-slate-900">Access Denied</h2>
      <p className="mb-8 max-w-md text-slate-600">{message}</p>
      <div className="flex gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          <Home className="h-4 w-4" />
          Go Home
        </Link>
        <Link
          to="/role"
          className="rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Create Profile
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;
