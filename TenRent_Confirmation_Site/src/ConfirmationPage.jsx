import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "./supabase";

const ConfirmEmail = () => {
  const [status, setStatus] = useState("loading");
  const location = useLocation();
    console.log("supabase url ", import.meta.env.VITE_SUPABASE_URL);
  useEffect(() => {
    const confirmEmail = async () => {
      const urlParams = new URLSearchParams(location.search);
      const token = urlParams.get("token");

      if (token) {
        const { error } = await supabase.auth.api.verifyEmail(token);
        if (error) {
          console.error("Error confirming email:", error.message);
          setStatus("error");
        } else {
          console.log("Email confirmed successfully!");
          setStatus("success");
        }
      } else {
        setStatus("error");
        return;
      }
    };

    confirmEmail();
  }, [location]);

  const updateUserApprovalStatus = async (email) => {
    const { data, error } = await supabase
      .from("users")
      .update({ is_approved: true })
      .eq("email", email);

    if (error) {
      console.error("Error updating user approval status:", error.message);
    } else {
      console.log("User approval status updated successfully:", data);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="p-6 rounded-lg shadow-lg bg-white text-center">
        {status === "loading" && <p>Verifying your email...</p>}
        {status === "success" && <p className="text-green-500">Your email has been confirmed successfully!</p>}
        {status === "error" && <p className="text-red-500">Invalid or expired confirmation link.</p>}
      </div>
    </div>
  );
};

export default ConfirmEmail;
