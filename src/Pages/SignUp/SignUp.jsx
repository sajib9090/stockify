import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Check, X, User } from "lucide-react";
import { Link } from "react-router";

const SignUp = () => {
  const [name, setName] = useState("");
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Password validation
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasCapital = /[A-Z]/.test(password);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Sign up attempt:", { name, emailOrMobile, password });
      setIsLoading(false);
    }, 1500);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Create Account
            </h2>
            <p className="text-gray-500 text-sm">Sign up to get started</p>
          </div>

          <div className="space-y-5">
            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition-all duration-200"
              />
              <label
                htmlFor="name"
                className={`absolute left-3 transition-all duration-200 pointer-events-none bg-white px-2 ${
                  name
                    ? "-top-3 text-sm text-teal-600"
                    : "top-1/2 -translate-y-1/2 text-base text-gray-500"
                }`}
              >
                Full Name
              </label>
              <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Email or Mobile Input */}
            <div className="relative">
              <input
                type="text"
                id="emailOrMobile"
                value={emailOrMobile}
                onChange={(e) => setEmailOrMobile(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition-all duration-200"
              />
              <label
                htmlFor="emailOrMobile"
                className={`absolute left-3 transition-all duration-200 pointer-events-none bg-white px-2 ${
                  emailOrMobile
                    ? "-top-3 text-sm text-teal-600"
                    : "top-1/2 -translate-y-1/2 text-base text-gray-500"
                }`}
              >
                Email or Mobile
              </label>
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Password Input */}
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

            {/* Password Validation Visual */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isFocused || password
                  ? "max-h-48 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
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
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold 
              hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-500/30 
              transition-all duration-200 shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating account...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-teal-600 hover:text-teal-700 font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
