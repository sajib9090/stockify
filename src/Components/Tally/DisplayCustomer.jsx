import { Link } from "react-router";
import CurrencyFormatter from "../../Components/CurrencyFormatter/CurrencyFormatter";

const DisplayCustomer = ({ item }) => {
  const getTimeAgo = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
      const count = Math.floor(diffInSeconds / seconds);
      if (count >= 1) {
        const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
        return rtf.format(-count, unit);
      }
    }

    return "Just now";
  };

  const getInitials = (name) => {
    if (!name || !name.trim()) return "AA";
    const trimmedName = name.trim();
    const words = trimmedName.split(/\s+/);
    let initials = "";

    if (words.length >= 2) {
      initials = words[0][0] + words[words.length - 1][0];
    } else {
      initials = trimmedName.slice(0, 2);
    }

    initials = initials.toUpperCase();

    // Ensure we always return 2 characters
    if (initials.length < 2) {
      initials += "A".repeat(2 - initials.length);
    }

    return initials;
  };

  const getAvatarGradient = (name) => {
    const gradients = [
      "from-violet-500 to-purple-600",
      "from-blue-500 to-cyan-600",
      "from-emerald-500 to-teal-600",
      "from-orange-500 to-pink-600",
      "from-rose-500 to-red-600",
      "from-indigo-500 to-blue-600",
    ];
    const index = (name?.charCodeAt(0) || 0) % gradients.length;
    return gradients[index];
  };

  return (
    <div className="group relative rounded-sm bg-white p-5 mb-1 cursor-pointer overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <Link
        to={`client-details/${item?.id}`}
        className="relative flex items-center gap-4"
      >
        {/* Avatar with ring effect */}
        <div className="flex-shrink-0 relative">
          <div className="absolute inset-0 bg-gray-400 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          <div
            className={`relative flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br ${getAvatarGradient(
              item?.name
            )} shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}
          >
            <span className="text-white text-base font-bold">
              {getInitials(item?.name)}
            </span>
          </div>
        </div>

        {/* Name and Time */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 capitalize truncate group-hover:text-gray-700 transition-colors duration-200">
            {item?.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            <p className="text-sm text-gray-500">
              {getTimeAgo(item?.updated_at)}
            </p>
          </div>
        </div>

        {/* Amount with badge style */}
        <div className="flex-shrink-0">
          <div
            className={`px-4 py-2 rounded-xl font-bold text-base ${
              item?.balance < 0
                ? "bg-red-50 text-red-600"
                : item?.balance > 0
                ? "bg-emerald-50 text-emerald-600"
                : "bg-gray-50 text-gray-600"
            }`}
          >
            <CurrencyFormatter value={item?.balance} />
          </div>
        </div>
      </Link>

      {/* Decorative accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#009099] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#009099] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
    </div>
  );
};

export default DisplayCustomer;
