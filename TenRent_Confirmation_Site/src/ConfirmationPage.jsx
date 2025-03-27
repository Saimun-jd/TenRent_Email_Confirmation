import { useEffect, useState } from "react";

export default function ConfirmationPage() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    // Check if the URL has a hash (success) or query parameters (failure)
    if (window.location.hash.startsWith("#access_token")) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="p-6 rounded-lg shadow-lg bg-white text-center">
        {status === "loading" && <p>Verifying your email...</p>}
        {status === "success" && <p className="text-green-500">Your email has been confirmed successfully! Now wait for admin to approve your account.</p>}
        {status === "error" && <p className="text-red-500">Invalid or expired confirmation link.</p>}
      </div>
    </div>
  );
}