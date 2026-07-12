import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { scanBill } from "../lib/billScanner";
import { sendEmail } from "../lib/sendEmail";
import Navbar from "../components/Navbar";

export default function AddBill() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({

    product_name: "",
    category: "",
    purchase_date: "",
    warranty_months: "",
    price: ""

  });

  function handleChange(e) {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  }

  async function handleScan() {

    if (!image) {

      alert("Please upload a bill image first 📄");

      return;

    }

    try {

      setAiLoading(true);

      const data = await scanBill(image);

      setFormData({

        product_name: data.product_name || "",

        category: data.category || "",

        purchase_date: data.purchase_date || "",

        warranty_months: data.warranty_months || "",

        price: data.price || ""

      });

      alert("🤖 AI Successfully Scanned Your Bill!");

    }

    catch (error) {

      console.log(error);

      alert("❌ AI Scan Failed");

    }

    setAiLoading(false);

  }
   async function handleSubmit(e) {

    e.preventDefault();

    setLoading(true);

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {

      navigate("/login");
      return;

    }

    let image_url = "";

    if (image) {

      const fileName = `${Date.now()}-${image.name}`;

      const { error } = await supabase.storage
        .from("bill-images")
        .upload(fileName, image);

      if (error) {

        alert(error.message);
        setLoading(false);
        return;

      }

      const { data } = supabase.storage
        .from("bill-images")
        .getPublicUrl(fileName);

      image_url = data.publicUrl;

    }

    const expiry = new Date(formData.purchase_date);

    expiry.setMonth(
      expiry.getMonth() + Number(formData.warranty_months)
    );

    const expiry_date =
      expiry.toISOString().split("T")[0];

    const { error } = await supabase
      .from("products")
      .insert([{

        user_id: user.id,

        product_name: formData.product_name,

        category: formData.category,

        purchase_date: formData.purchase_date,

        warranty_months: Number(formData.warranty_months),

        expiry_date,

        price: Number(formData.price),

        image_url

      }]);

    if (error) {

      alert(error.message);

      setLoading(false);

      return;

    }

    try {

      await sendEmail({

        email: user.email,

        name:
          user.user_metadata?.full_name ||
          "BillBox User",

        productName:
          formData.product_name,

        expiryDate:
          expiry_date

      });

      console.log("✅ Email Sent");

    }

    catch (err) {

      console.log("Email Error:", err);

    }

    setLoading(false);

    alert("🎉 Bill Added Successfully!");

    navigate("/dashboard");

  }
return (

<div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-900 to-purple-900">

<Navbar />


<div className="flex justify-center items-center p-8">


<div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 text-white">


<h1 className="text-4xl font-extrabold text-center mb-2">
➕ Add New Bill
</h1>


<p className="text-center text-purple-200 mb-8">
Upload your invoice and let AI extract details automatically 🤖
</p>



<div className="bg-white/10 rounded-3xl p-6 border border-white/20 mb-6">


<label className="block text-lg font-bold mb-3">
📸 Upload Bill Image
</label>


<input

type="file"

accept="image/*"

onChange={(e)=>setImage(e.target.files[0])}

className="w-full bg-white text-black p-4 rounded-2xl"

/>


{
image &&

<div className="mt-5 text-center">

<img

src={URL.createObjectURL(image)}

className="mx-auto w-40 h-40 object-cover rounded-2xl shadow-xl"

/>

<p className="mt-3 text-green-300">
✅ Image Selected
</p>

</div>

}


</div>




<button

onClick={handleScan}

disabled={aiLoading}

className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-all duration-300 p-4 rounded-2xl font-bold text-lg shadow-xl mb-6"

>

{aiLoading ? "🤖 AI Scanning..." : "🤖 Scan Bill With AI"}

</button>
{/* Form Section */}

<div className="space-y-5">


<input
name="product_name"
placeholder="📦 Product Name"
value={formData.product_name}
onChange={handleChange}
className="w-full p-4 rounded-2xl bg-white/90 text-black outline-none focus:ring-4 focus:ring-purple-400"
/>


<input
name="category"
placeholder="🏷 Category"
value={formData.category}
onChange={handleChange}
className="w-full p-4 rounded-2xl bg-white/90 text-black outline-none focus:ring-4 focus:ring-purple-400"
/>


<div>

<label className="text-sm text-purple-200">
Purchase Date
</label>

<input
type="date"
name="purchase_date"
value={formData.purchase_date}
onChange={handleChange}
className="w-full p-4 rounded-2xl bg-white/90 text-black outline-none focus:ring-4 focus:ring-purple-400"
/>

</div>



<input
type="number"
name="warranty_months"
placeholder="🛡 Warranty Months"
value={formData.warranty_months}
onChange={handleChange}
className="w-full p-4 rounded-2xl bg-white/90 text-black outline-none focus:ring-4 focus:ring-purple-400"
/>



<input
type="number"
name="price"
placeholder="💰 Price"
value={formData.price}
onChange={handleChange}
className="w-full p-4 rounded-2xl bg-white/90 text-black outline-none focus:ring-4 focus:ring-purple-400"
/>



<button

onClick={handleSubmit}

disabled={loading}

className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:scale-105 transition-all duration-300 p-4 rounded-2xl font-extrabold text-lg shadow-2xl"

>

{
loading
?
"⏳ Saving Bill..."
:
"🚀 Save Bill"
}

</button>


</div>


</div>


</div>


</div>


);
}