import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function EditBill() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    product_name: "",
    category: "",
    purchase_date: "",
    warranty_months: "",
    price: "",
  });

  useEffect(() => {
    fetchBill();
  }, []);

  async function fetchBill() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    setFormData({
      product_name: data.product_name,
      category: data.category,
      purchase_date: data.purchase_date,
      warranty_months: data.warranty_months,
      price: data.price,
    });
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const expiry = new Date(formData.purchase_date);
    expiry.setMonth(
      expiry.getMonth() + Number(formData.warranty_months)
    );

    const expiry_date = expiry.toISOString().split("T")[0];

    const { error } = await supabase
      .from("products")
      .update({
        product_name: formData.product_name,
        category: formData.category,
        purchase_date: formData.purchase_date,
        warranty_months: Number(formData.warranty_months),
        expiry_date,
        price: Number(formData.price),
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Bill updated successfully!");

    navigate("/all-bills");
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-xl">

        <h1 className="text-3xl font-bold mb-6 text-center">
          ✏️ Edit Bill
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="product_name"
            placeholder="Product Name"
            value={formData.product_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="date"
            name="purchase_date"
            value={formData.purchase_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="warranty_months"
            placeholder="Warranty Months"
            value={formData.warranty_months}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            {loading ? "Updating..." : "Update Bill"}
          </button>

        </form>

      </div>
    </div>
  );
}