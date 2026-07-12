import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { explainBill } from "../lib/billExplain";
import { generateBillPDF } from "../lib/generatePDF";
import Navbar from "../components/Navbar";


export default function BillDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  const [aiText, setAiText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);



  useEffect(() => {
    fetchBill();
  }, []);



  async function fetchBill(){

    const {
      data:{user}
    } = await supabase.auth.getUser();


    if(!user){
      navigate("/login");
      return;
    }


    const {data,error} = await supabase
      .from("products")
      .select("*")
      .eq("id",id)
      .single();


    if(error){
      alert(error.message);
      return;
    }


    setBill(data);
    setLoading(false);

  }





  function getStatus(){

    const today = new Date();
    const expiry = new Date(bill.expiry_date);


    const days = Math.ceil(
      (expiry-today) /
      (1000*60*60*24)
    );


    if(days < 0)
      return "🔴 Expired";


    if(days <= 30)
      return `🟡 ${days} Days Left`;


    return "🟢 Active";

  }





  async function handleAIExplain(){

    try{

      setAiLoading(true);

      const result = await explainBill(bill);

      setAiText(result);

    }
    catch(error){

      console.log(error);
      alert("AI Error");

    }


    setAiLoading(false);

  }





  function handlePDF(){

    generateBillPDF(
      bill,
      aiText
    );

  }





  if(loading){

    return(
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading...
        </h1>
      </div>
    );

  }





return(

<div>

<Navbar />


<div className="min-h-screen bg-slate-100 p-8">


<button

onClick={()=>navigate("/all-bills")}

className="bg-gray-900 text-white px-5 py-3 rounded-xl mb-8"

>
← Back To Bills
</button>





<div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">


<div className="grid md:grid-cols-2 gap-10">


<div>

{bill.image_url &&

<img

src={bill.image_url}

alt="bill"

className="rounded-2xl shadow w-full"

/>

}

</div>




<div>


<h1 className="text-4xl font-bold mb-6">
{bill.product_name}
</h1>



<div className="space-y-4 text-lg">


<p>
<b>Category:</b> {bill.category}
</p>


<p>
<b>Price:</b> ₹{Number(bill.price).toLocaleString()}
</p>


<p>
<b>Purchase Date:</b> {bill.purchase_date}
</p>


<p>
<b>Warranty:</b> {bill.warranty_months} Months
</p>


<p>
<b>Expiry:</b> {bill.expiry_date}
</p>


<p>
<b>Status:</b> {getStatus()}
</p>


</div>





<div className="mt-8 flex flex-wrap gap-3">


<button

onClick={()=>navigate(`/edit-bill/${bill.id}`)}

className="bg-yellow-500 text-white px-5 py-3 rounded-xl"

>
✏️ Edit
</button>





<button

onClick={handleAIExplain}

className="bg-purple-600 text-white px-5 py-3 rounded-xl"

>

{
aiLoading
?
"🤖 Thinking..."
:
"✨ Explain Bill"
}

</button>





<button

onClick={handlePDF}

className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"

>

📄 Download PDF

</button>



</div>





{aiText &&

<div className="mt-6 bg-purple-50 p-6 rounded-xl">


<h2 className="text-xl font-bold mb-3">
🤖 AI Summary
</h2>


<p className="whitespace-pre-line">
{aiText}
</p>


</div>

}



</div>


</div>


</div>


</div>


</div>

)

}