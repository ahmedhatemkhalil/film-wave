import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const [countdown, setCountdown] = React.useState(5);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (countdown === 0) {
      navigate("/");
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="text-white h-screen flex justify-center items-center flex-col">
      <h1 className="text-4xl">Oops! Page Not Found</h1>
      <h2 className="text-xl mt-8">
        The page you requested doesn't exist or you don't have access to it.
      </h2>
      <p className="mt-4 text-gray-400">
        You will be redirected to the homepage in {countdown} seconds.
      </p>
    </div>
  );
}

export default ErrorPage;
