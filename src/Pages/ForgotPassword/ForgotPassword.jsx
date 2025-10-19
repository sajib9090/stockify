import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router";
import { useForgotPasswordMutation } from "../../redux/features/auth/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const handleSubmit = async () => {
    setErrorMessage("");

    const data = {
      email: email,
    };

    try {
      const res = await forgotPassword(data).unwrap();
      if (res?.success) {
        navigate(
          `/verify/verify-email?email=${data?.email}&&context=forgot-password`
        );
      }
    } catch (error) {
      setErrorMessage(error?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-teal-500 rounded-xl mb-4">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Enter your email to reset password
            </h2>
          </div>

          <div className="space-y-5">
            {errorMessage && (
              <div className="text-red-600 text-sm text-center bg-red-50 py-2 px-3 rounded border border-red-200">
                {errorMessage}
              </div>
            )}
            <div className="relative">
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition-all duration-200"
              />
              <label
                htmlFor="email"
                className={`absolute left-3 transition-all duration-200 pointer-events-none bg-white px-2 ${
                  email
                    ? "-top-3 text-sm text-teal-600"
                    : "top-1/2 -translate-y-1/2 text-base text-gray-500"
                }`}
              >
                Email
              </label>
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !email}
              className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold 
              hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-500/30 
              transition-all duration-200 shadow disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Please wait...
                </div>
              ) : (
                "Forgot Password"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
