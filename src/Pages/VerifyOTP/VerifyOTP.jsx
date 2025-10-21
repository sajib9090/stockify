import { useState, useRef, useEffect } from "react";
import { Mail, Shield, ArrowLeft, Clock } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router";
import {
  useOtpVerifyMutation,
  useRegenerateOTPMutation,
} from "../../redux/features/auth/authApi";
import { toast } from "sonner";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [canResend, setCanResend] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");

  const [verifyOtp, { isLoading: otpLoading }] = useOtpVerifyMutation();
  const [regenerateOTP, { isLoading: regenerateLoading }] =
    useRegenerateOTPMutation();

  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      setErrorMessage("OTP has expired. Please request a new code.");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setErrorMessage("");

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Only process if it's 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setErrorMessage("Please enter all 6 digits");
      return;
    }

    if (timeLeft === 0) {
      setErrorMessage("OTP has expired. Please request a new code.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      // Add your OTP verification API call here
      const data = {
        email: email,
        otp: otpValue,
      };
      const res = await verifyOtp(data).unwrap();
      if (res?.success) {
        if (searchParams.get("context") === "forgot-password") {
          toast.success("OTP verified! You can now reset your password.");
          return navigate(`/reset-password?email=${email}`);
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      setErrorMessage(error?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setErrorMessage("");
    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(300);
    setCanResend(false);

    try {
      const response = await regenerateOTP({ email: email }).unwrap();
      if (response?.success) {
        // Focus first input after resend
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
        toast.success("A new OTP has been sent to your email.");
      }
    } catch (error) {
      setErrorMessage(
        error?.message ||
          error?.data?.message ||
          "Failed to resend code. Please try again."
      );
    }
  };

  const isComplete = otp.every((digit) => digit !== "");
  const isExpired = timeLeft === 0;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
          {/* Back Button */}
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Sign Up</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-teal-500 rounded-xl mb-4">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verify Your Email
            </h2>
            <p className="text-gray-500 text-sm">
              We've sent a 6-digit code to
            </p>
            {email && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <Mail className="w-4 h-4 text-teal-600" />
                <p className="text-teal-600 font-medium text-sm">{email}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Timer Display */}
            <div
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 ${
                timeLeft <= 30
                  ? "bg-red-50 border-red-200"
                  : "bg-teal-50 border-teal-200"
              }`}
            >
              <Clock
                className={`w-5 h-5 ${
                  timeLeft <= 30 ? "text-red-600" : "text-teal-600"
                }`}
              />
              <span
                className={`font-mono text-lg font-bold ${
                  timeLeft <= 30 ? "text-red-600" : "text-teal-600"
                }`}
              >
                {formatTime(timeLeft)}
              </span>
              <span
                className={`text-sm ${
                  timeLeft <= 30 ? "text-red-600" : "text-teal-600"
                }`}
              >
                remaining
              </span>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-600 text-sm text-center bg-red-50 py-2 px-3 rounded border border-red-200">
                {errorMessage}
              </div>
            )}

            {/* OTP Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                Enter verification code
              </label>
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={isExpired}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isComplete || isLoading || isExpired || otpLoading}
              className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold 
              hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-500/30 
              transition-all duration-200 shadow disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading || otpLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Verifying...
                </div>
              ) : (
                "Verify Email"
              )}
            </button>

            {/* Resend Code */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{" "}
                <button
                  onClick={handleResend}
                  disabled={
                    !canResend || regenerateLoading || isLoading || otpLoading
                  }
                  className={`font-semibold ${
                    canResend
                      ? "text-teal-600 hover:text-teal-700 cursor-pointer"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {regenerateLoading ? "Resending..." : "Resend Code"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
