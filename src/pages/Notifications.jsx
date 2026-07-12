import Navbar from "../components/Navbar";

export default function Notifications() {

  const notifications = [

    {
      id: 1,
      icon: "⚠️",
      title: "Laptop Warranty Expiring",
      message: "Your HP Laptop warranty expires in 15 days.",
      color: "from-red-500 to-pink-500",
    },

    {
      id: 2,
      icon: "🤖",
      title: "AI Scan Completed",
      message: "Amazon invoice scanned successfully.",
      color: "from-purple-500 to-indigo-500",
    },

    {
      id: 3,
      icon: "📧",
      title: "Reminder Email",
      message: "Warranty reminder email has been scheduled.",
      color: "from-green-500 to-emerald-500",
    },

    {
      id: 4,
      icon: "📦",
      title: "Bill Uploaded",
      message: "Sony TV invoice was uploaded successfully.",
      color: "from-blue-500 to-cyan-500",
    },

    {
      id: 5,
      icon: "🎉",
      title: "Welcome",
      message: "Welcome to BillBox AI. Your bills are safe in the cloud.",
      color: "from-orange-500 to-yellow-500",
    }

  ];

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-900 to-purple-900">

      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-10">

        <h1 className="text-5xl font-black text-white mb-2">
          🔔 Notifications
        </h1>

        <p className="text-slate-300 mb-10">
          Stay updated with your bills and warranties.
        </p>

        <div className="space-y-6">

          {notifications.map((item) => (

            <div
              key={item.id}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300 shadow-2xl"
            >

              <div className="flex items-center gap-5">

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-3xl`}
                >
                  {item.icon}
                </div>

                <div>

                  <h2 className="text-2xl font-bold text-white">
                    {item.title}
                  </h2>

                  <p className="text-slate-300 mt-1">
                    {item.message}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}