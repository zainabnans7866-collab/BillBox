import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabaseClient";

export default function WarrantyCenter() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", user.id);

    setProducts(data || []);
  }

  function getStatus(expiryDate) {

    const today = new Date();
    const expiry = new Date(expiryDate);

    const days = Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    if (days < 0)
      return {
        text: "Expired",
        color: "bg-red-500"
      };

    if (days <= 30)
      return {
        text: `${days} Days Left`,
        color: "bg-yellow-500"
      };

    return {
      text: "Protected",
      color: "bg-green-500"
    };
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-900 to-purple-900">

      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">

        <h1 className="text-5xl font-black text-white">
          🛡 Warranty Center
        </h1>

        <p className="text-slate-300 mt-2 mb-8">
          Track every warranty in one place.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {products.map((item) => {

            const status = getStatus(item.expiry_date);

            return (

              <div
                key={item.id}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl hover:scale-105 transition"
              >

                <h2 className="text-2xl font-bold text-white">
                  {item.product_name}
                </h2>

                <p className="text-purple-200 mt-2">
                  {item.category}
                </p>

                <div className="mt-5 space-y-2">

                  <p className="text-white">
                    💰 ₹{Number(item.price).toLocaleString()}
                  </p>

                  <p className="text-white">
                    📅 Purchased: {item.purchase_date}
                  </p>

                  <p className="text-white">
                    ⏳ Warranty: {item.warranty_months} Months
                  </p>

                  <p className="text-white">
                    📆 Expires: {item.expiry_date}
                  </p>

                </div>

                <div className={`mt-6 ${status.color} text-white text-center py-2 rounded-xl font-bold`}>

                  {status.text}

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </div>

  );

}