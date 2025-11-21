export default function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Ride confirmed",
      message: "Your booking for Bengaluru → Mysuru has been confirmed.",
      time: "2 hours ago",
      unread: true,
      type: "success",
    },
    {
      id: 2,
      title: "New message",
      message: "Driver Rahul sent you a message regarding pickup location.",
      time: "5 hours ago",
      unread: true,
      type: "info",
    },
    {
      id: 3,
      title: "Ride completed",
      message: "You completed your ride from Mysuru → Bengaluru.",
      time: "1 day ago",
      unread: false,
      type: "success",
    },
    {
      id: 4,
      title: "Offer received",
      message: "Someone requested a seat for your posted ride.",
      time: "3 days ago",
      unread: false,
      type: "alert",
    },
  ];

  const typeIcon = (type) => {
    if (type === "success")
      return (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      );

    if (type === "alert")
      return (
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86l-7.94 14A1 1 0 003.24 19h15.52a1 1 0 00.88-1.5l-7.94-14a1 1 0 00-1.74 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01" />
        </svg>
      );

    return (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  return (
    <div className="fixed right-0 p-6 w-full md:w-3/4 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Notifications</h2>
        <button className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600">
          Clear All
        </button>
      </div>

      <p className="text-gray-600 mt-1">
        Stay updated with ride confirmations, requests, messages and alerts.
      </p>

      {/* Notification List */}
      <div className="mt-6 space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-4 p-4 rounded-2xl border shadow-sm transition-all
              ${n.unread ? "bg-indigo-50 border-indigo-200" : "bg-white border-gray-200"}
            `}
          >
            {/* Icon */}
            <div>{typeIcon(n.type)}</div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-semibold">{n.title}</h4>
                {n.unread && <span className="w-3 h-3 bg-indigo-600 rounded-full mt-1"></span>}
              </div>

              <p className="text-sm text-gray-700 mt-1">{n.message}</p>
              <p className="text-xs text-gray-500 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
