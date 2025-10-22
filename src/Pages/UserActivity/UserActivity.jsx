import { useGetUserActivityQuery } from "../../redux/features/auth/authApi";
import { Monitor, Smartphone, Tablet, Clock, LogIn } from "lucide-react";

const UserActivity = () => {
  const { data, error, isLoading } = useGetUserActivityQuery();

  const getDeviceIcon = (device) => {
    if (device.isMobile)
      return <Smartphone className="w-5 h-5 text-blue-600" />;
    if (device.isTablet) return <Tablet className="w-5 h-5 text-blue-600" />;
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

  if (isLoading) {
    return (
      <div className="p-4 min-h-screen">
        <div className="max-w-md border border-slate-200 rounded-lg bg-white p-6">
          <p className="text-slate-600">Loading activity...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 min-h-screen">
        <div className="max-w-md border border-slate-200 rounded-lg bg-white p-6">
          <p className="text-red-600">Error loading activity</p>
        </div>
      </div>
    );
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
              key={session.sessionId}
              className="p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getDeviceIcon(session.device)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-slate-800">
                      {session.device.browser !== "Other"
                        ? session.device.browser
                        : "Browser"}
                    </h3>
                    <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                      Session #{session.sessionId}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mb-2">
                    {session.device.os !== "Other"
                      ? session.device.os
                      : "Unknown OS"}
                  </p>

                  <div className="flex flex-col gap-1 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <LogIn className="w-3.5 h-3.5" />
                      <span>
                        Logged in: {formatDateTime(session.loginTime)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        Last active: {formatDateTime(session.lastActive)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserActivity;
