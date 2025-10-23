import {
  useGetUserActivityQuery,
  useLogoutAllSessionsMutation,
  useLogoutSpecificSessionMutation,
} from "../../redux/features/auth/authApi";
import {
  Monitor,
  Smartphone,
  Tablet,
  Clock,
  LogIn,
  LogOut,
} from "lucide-react";
import Error from "../Error/Error";
import Loading from "../../Components/Loading/Loading";
import { toast } from "sonner";

const UserActivity = () => {
  const { data, error, isLoading } = useGetUserActivityQuery();

  const [logoutSpecificSession, { isLoading: logoutSpecificSessionLoading }] =
    useLogoutSpecificSessionMutation();
  const [logoutAllSessions, { isLoading: logoutAllSessionsLoading }] =
    useLogoutAllSessionsMutation();

  const getDeviceIcon = (device) => {
    if (device.isMobile)
      return <Smartphone className="w-5 h-5 text-blue-600" />;
    if (device?.isTablet) return <Tablet className="w-5 h-5 text-blue-600" />;
    return <Monitor className="w-5 h-5 text-blue-600" />;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLogoutDevice = async (sessionId) => {
    const data = {
      sessionId: sessionId,
    };
    try {
      const res = await logoutSpecificSession(data).unwrap();
      if (res?.success) {
        toast.success(res?.data?.message || res?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  const handleLogoutAllDevices = async () => {
    try {
      const res = await logoutAllSessions().unwrap();
      if (res?.success) {
        toast.success(res?.data?.message || res?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="p-4 min-h-screen bg-slate-50">
      <div className="max-w-md border border-slate-200 rounded-lg bg-white shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-2xl font-semibold text-slate-800">
            Active Sessions
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {data?.data?.length || 0} active session(s)
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {data?.data?.map((session) => (
            <div
              key={session?.sessionId}
              className="p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getDeviceIcon(session?.device)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-slate-800">
                      {session?.device?.browser !== "Other"
                        ? session?.device?.browser
                        : "Browser"}
                    </h3>
                    <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                      {/* Session #{session?.sessionId} */}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mb-2">
                    {session?.device?.os !== "Other"
                      ? session?.device?.os
                      : "Unknown OS"}
                  </p>

                  <div className="flex flex-col gap-1 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <LogIn className="w-3.5 h-3.5" />
                      <span>
                        Logged in: {formatDateTime(session?.loginTime)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        Last active: {formatDateTime(session?.lastActive)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  disabled={logoutSpecificSessionLoading}
                  onClick={() => handleLogoutDevice(session?.sessionId)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors border border-red-200 hover:border-red-300"
                  title="Logout this device"
                >
                  <LogOut className="w-4 h-4" />
                  {logoutSpecificSessionLoading ? (
                    "Working..."
                  ) : (
                    <span>Logout</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        disabled={logoutAllSessionsLoading}
        onClick={handleLogoutAllDevices}
        className="pt-2 px-1 underline hover:text-[#009099]"
      >
        {logoutAllSessionsLoading ? "Working..." : "Logout from all devices"}
      </button>
    </div>
  );
};

export default UserActivity;
