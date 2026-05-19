import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h2 className="text-6xl font-bold mb-5">404</h2>

      <p className="text-xl mb-6">Page Not Found</p>

      <Link to="/" className="btn btn-primary">
        Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
