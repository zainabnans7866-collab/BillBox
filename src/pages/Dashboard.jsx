import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import MainLayout from "../layouts/MainLayout";
import AnalyticsChart from "../components/AnalyticsChart";

import {
  Package,
  IndianRupee,
  ShieldCheck,
  TriangleAlert,
  Plus,
  Receipt,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [bills, setBills] = useState([]);

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSpending: 0,
    activeWarranty: 0,
    expiringSoon: 0,
    expired: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", user.id)
      .order("purchase_date", { ascending: false });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setBills(data);

    const today = new Date();

    let totalProducts = data.length;
    let totalSpending = 0;
    let activeWarranty = 0;
    let expiringSoon = 0;
    let expired = 0;

    data.forEach((bill) => {
      totalSpending += Number(bill.price);

      const expiry = new Date(bill.expiry_date);

      const diff =
        (expiry - today) /
        (1000 * 60 * 60 * 24);

      if (diff < 0) {
        expired++;
      } else if (diff <= 30) {
        expiringSoon++;
        activeWarranty++;
      } else {
        activeWarranty++;
      }
    });

    setStats({
      totalProducts,
      totalSpending,
      activeWarranty,
      expiringSoon,
      expired,
    });

    setLoading(false);
  }

  if (loading) {
    return (
      <MainLayout>
        <h1 className="text-2xl font-bold">
          Loading Dashboard...
        </h1>
      </MainLayout>
    );
  }
    return (
    <MainLayout>
      <div className="space-y-8">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Dashboard
            </h1>

            <p className="text-slate-500 mt-2">
              Welcome back! Here's an overview of your bills and warranties.
            </p>
          </div>

          <button
            onClick={() => navigate("/add-bill")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl shadow"
          >
            <Plus size={20} />
            Add Bill
          </button>

        </div>



        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <Package
              size={32}
              className="text-indigo-600 mb-4"
            />

            <p className="text-slate-500">
              Total Products
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {stats.totalProducts}
            </h2>

          </div>



          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <IndianRupee
              size={32}
              className="text-emerald-600 mb-4"
            />

            <p className="text-slate-500">
              Total Spending
            </p>

            <h2 className="text-3xl font-bold mt-2">
              ₹{stats.totalSpending.toLocaleString()}
            </h2>

          </div>



          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <ShieldCheck
              size={32}
              className="text-green-600 mb-4"
            />

            <p className="text-slate-500">
              Active Warranty
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {stats.activeWarranty}
            </h2>

          </div>



          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <TriangleAlert
              size={32}
              className="text-amber-500 mb-4"
            />

            <p className="text-slate-500">
              Expiring Soon
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {stats.expiringSoon}
            </h2>

          </div>



          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <Receipt
              size={32}
              className="text-red-500 mb-4"
            />

            <p className="text-slate-500">
              Expired
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {stats.expired}
            </h2>

          </div>

        </div>
                {/* Analytics + Warranty Health */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Analytics Chart */}

          <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border p-6">

            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Spending Analytics
            </h2>

            <AnalyticsChart bills={bills} />

          </div>


          {/* Warranty Health */}

          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <h2 className="text-xl font-bold text-slate-800">
              Warranty Health
            </h2>

            <div className="mt-8 flex justify-center">

              <div className="h-40 w-40 rounded-full border-8 border-indigo-600 flex items-center justify-center">

                <div className="text-center">

                  <h1 className="text-4xl font-bold text-slate-900">

                    {stats.totalProducts === 0
                      ? 0
                      : Math.round(
                          (stats.activeWarranty /
                            stats.totalProducts) *
                            100
                        )}

                    %

                  </h1>

                  <p className="text-slate-500 text-sm mt-1">
                    Healthy
                  </p>

                </div>

              </div>

            </div>

            <div className="mt-8 space-y-4">

              <div className="flex justify-between">

                <span className="text-slate-500">
                  Active
                </span>

                <span className="font-semibold">
                  {stats.activeWarranty}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">
                  Expiring Soon
                </span>

                <span className="font-semibold text-amber-600">
                  {stats.expiringSoon}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">
                  Expired
                </span>

                <span className="font-semibold text-red-600">
                  {stats.expired}
                </span>

              </div>

            </div>

          </div>

        </div>
                {/* Bottom Section */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Recent Bills */}

          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Recent Bills
            </h2>

            {bills.length === 0 ? (

              <p className="text-slate-500">
                No bills added yet.
              </p>

            ) : (

              <div className="space-y-4">

                {bills.slice(0, 5).map((bill) => (

                  <div
                    key={bill.id}
                    className="flex items-center justify-between border-b pb-4"
                  >

                    <div>

                      <h3 className="font-semibold text-slate-800">
                        {bill.product_name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {bill.category}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="font-bold">
                        ₹{Number(bill.price).toLocaleString()}
                      </p>

                      <p className="text-sm text-slate-500">
                        {bill.purchase_date}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>



          {/* Quick Actions */}

          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <button
                onClick={() => navigate("/add-bill")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-5"
              >
                Add Bill
              </button>

              <button
                onClick={() => navigate("/all-bills")}
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl p-5"
              >
                My Bills
              </button>

              <button
                onClick={() => navigate("/analytics")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl p-5"
              >
                Analytics
              </button>

              <button
                onClick={() => navigate("/ai-center")}
                className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl p-5"
              >
                AI Center
              </button>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}