import { useState } from "react";
import { Eye, EyeOff, Lock, Check, X } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useSetNewPasswordMutation } from "../../redux/features/auth/authApi";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchParams] = useSearchParams();

  // Password validation
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasCapital = /[A-Z]/.test(password);
  const passwordsMatch = password === confirmPassword && confirmPassword !== "";

  const navigate = useNavigate();
  const [setNewPassword, { isLoading }] = useSetNewPasswordMutation();
  const handleSubmit = async () => {
    setErrorMessage("");

    if (!passwordsMatch) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const data = {
      email: searchParams.get("email"),
      new_password: password,
    };

    try {
      const res = await setNewPassword(data).unwrap();

      if (res?.success) {
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(error?.data?.message);
    }
  };

  const ValidationItem = ({ isValid, text }) => (
    <div className="flex items-center gap-2 text-sm">
      {isValid ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <X className="w-4 h-4 text-gray-400" />
      )}
      <span className={isValid ? "text-green-600" : "text-gray-500"}>
        {text}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-teal-500 rounded-xl mb-4">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Password</h2>
            <p className="text-gray-500 text-sm">
              Choose strong password to secure your account
            </p>
          </div>

          <div className="space-y-5">
            {errorMessage && (
              <div className="text-red-600 text-sm text-center bg-red-50 py-2 px-3 rounded border border-red-200">
                {errorMessage}
              </div>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition-all duration-200"
              />
              <label
                htmlFor="password"
                className={`absolute left-3 transition-all duration-200 pointer-events-none bg-white px-2 ${
                  password
                    ? "-top-3 text-sm text-teal-600"
                    : "top-1/2 -translate-y-1/2 text-base text-gray-500"
                }`}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition-all duration-200"
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute left-3 transition-all duration-200 pointer-events-none bg-white px-2 ${
                  confirmPassword
                    ? "-top-3 text-sm text-teal-600"
                    : "top-1/2 -translate-y-1/2 text-base text-gray-500"
                }`}
              >
                Confirm Password
              </label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Password Validation Visual */}
            {(isFocused || password) && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 border border-gray-200">
                <p className="text-xs font-semibold text-gray-600 mb-2">
                  Password must contain:
                </p>
                <ValidationItem
                  isValid={hasMinLength}
                  text="At least 8 characters"
                />
                <ValidationItem
                  isValid={hasCapital}
                  text="At least one capital letter"
                />
                <ValidationItem
                  isValid={hasNumber}
                  text="At least one number"
                />
                <ValidationItem
                  isValid={hasSymbol}
                  text="At least one symbol (!@#$%...)"
                />
                {confirmPassword && (
                  <ValidationItem
                    isValid={passwordsMatch}
                    text="Passwords match"
                  />
                )}
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                isLoading ||
                !password ||
                !confirmPassword ||
                !passwordsMatch ||
                !(hasMinLength && hasCapital && hasNumber && hasSymbol)
              }
              className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold 
              hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-500/30 
              transition-all duration-200 shadow disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
