import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/Navbar";

export default function Profile() {

  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    city: "",
    avatar_url: "",
  });

  const [stats, setStats] = useState({
    bills: 0,
    spending: 0,
    active: 0,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (!user) return;

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileData) {
      setProfile(profileData);
    }

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", user.id);

    let total = 0;
    let active = 0;

    const today = new Date();

    data?.forEach((bill) => {

      total += Number(bill.price);

      if (new Date(bill.expiry_date) > today) {
        active++;
      }

    });

    setStats({
      bills: data?.length || 0,
      spending: total,
      active,
    });

  }

  async function saveProfile() {

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: profile.full_name,
        phone: profile.phone,
        city: profile.city,
        avatar_url: profile.avatar_url,
      });

    if (error) {

      alert(error.message);

    } else {

      alert("✅ Profile Updated Successfully");

    }

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-900 to-purple-900 text-white">

      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-6">

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-10">

          <div className="flex flex-col items-center">

            <img
              src={
                profile.avatar_url
                  ? profile.avatar_url
                  : `https://ui-avatars.com/api/?name=${
                      profile.full_name || user?.email || "User"
                    }&background=7c3aed&color=fff&size=200`
              }
              alt="avatar"
              className="w-36 h-36 rounded-full border-4 border-purple-500 shadow-xl"
            />

            <h1 className="text-4xl font-black mt-6">
              {profile.full_name || "BillBox User"}
            </h1>

            <p className="text-purple-200 mt-2">
              {user?.email}
            </p>
                        <div className="mt-10 w-full max-w-2xl">

              <div className="grid md:grid-cols-2 gap-5">

                <div>

                  <label className="text-sm text-slate-300">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={profile.full_name}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        full_name: e.target.value,
                      })
                    }
                    placeholder="Enter your full name"
                    className="mt-2 w-full p-4 rounded-xl bg-white text-black outline-none"
                  />

                </div>

                <div>

                  <label className="text-sm text-slate-300">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        phone: e.target.value,
                      })
                    }
                    placeholder="+91 XXXXX XXXXX"
                    className="mt-2 w-full p-4 rounded-xl bg-white text-black outline-none"
                  />

                </div>

              </div>

              <div className="mt-5">

                <label className="text-sm text-slate-300">
                  City
                </label>

                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      city: e.target.value,
                    })
                  }
                  placeholder="Enter your city"
                  className="mt-2 w-full p-4 rounded-xl bg-white text-black outline-none"
                />

              </div>

              <button
                onClick={saveProfile}
                className="mt-8 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:scale-[1.02] transition-all py-4 rounded-2xl font-bold text-lg shadow-xl"
              >
                💾 Save Profile
              </button>

            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12 w-full">

              <div className="bg-white/10 rounded-2xl p-6 text-center">

                <h2 className="text-5xl">📦</h2>

                <p className="mt-3 text-purple-200">
                  Total Bills
                </p>

                <h3 className="text-4xl font-bold mt-2">
                  {stats.bills}
                </h3>

              </div>

              <div className="bg-white/10 rounded-2xl p-6 text-center">

                <h2 className="text-5xl">💰</h2>

                <p className="mt-3 text-purple-200">
                  Total Spending
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  ₹{stats.spending.toLocaleString()}
                </h3>

              </div>

              <div className="bg-white/10 rounded-2xl p-6 text-center">

                <h2 className="text-5xl">🛡</h2>

                <p className="mt-3 text-purple-200">
                  Active Warranty
                </p>

                <h3 className="text-4xl font-bold mt-2">
                  {stats.active}
                </h3>

              </div>

            </div>
                        <div className="mt-12 w-full bg-white/10 rounded-3xl p-8 border border-white/10">

              <h2 className="text-3xl font-bold mb-6">
                📊 Account Summary
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                <div className="bg-white/10 rounded-2xl p-5">
                  <h3 className="font-bold text-xl mb-2">
                    🚀 Features Enabled
                  </h3>

                  <div className="space-y-2 text-slate-200">

                    <p>✅ AI Bill Scanner</p>
                    <p>✅ Warranty Tracking</p>
                    <p>✅ Smart Dashboard</p>
                    <p>✅ Email Reminder Service</p>
                    <p>✅ Cloud Storage</p>
                    <p>✅ Secure Authentication</p>

                  </div>

                </div>

                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-xl">

                  <h3 className="text-2xl font-bold">
                    🌟 BillBox Premium
                  </h3>

                  <p className="mt-3 text-purple-100 leading-7">

                    Keep all your bills organized,
                    track warranties,
                    receive reminders,
                    and manage everything securely
                    in one place.

                  </p>

                  <div className="mt-6 flex gap-3 flex-wrap">

                    <span className="bg-white/20 px-4 py-2 rounded-full">
                      AI Powered
                    </span>

                    <span className="bg-white/20 px-4 py-2 rounded-full">
                      Secure
                    </span>

                    <span className="bg-white/20 px-4 py-2 rounded-full">
                      Cloud Sync
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}