import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/Navbar";


export default function AllBills(){

  const navigate = useNavigate();

  const [bills,setBills]=useState([]);
  const [loading,setLoading]=useState(true);

  const [search,setSearch]=useState("");
  const [category,setCategory]=useState("All");

  const [image,setImage]=useState(null);



  useEffect(()=>{
    fetchBills();
  },[]);



  async function fetchBills(){

    const {
      data:{user}
    }=await supabase.auth.getUser();


    if(!user){
      navigate("/login");
      return;
    }


    const {data,error}=await supabase
    .from("products")
    .select("*")
    .eq("user_id",user.id)
    .order("created_at",{ascending:false});



    if(error){

      alert(error.message);

    }
    else{

      setBills(data);

    }


    setLoading(false);

  }





  async function deleteBill(id){


    const confirmDelete=
    window.confirm("Delete this bill?");


    if(!confirmDelete)
      return;



    const {error}=await supabase
    .from("products")
    .delete()
    .eq("id",id);



    if(error){

      alert(error.message);
      return;

    }


    fetchBills();

  }





  const categories=[

    "All",

    ...new Set(
      bills.map(
        bill=>bill.category
      )
    )

  ];




  const filteredBills=useMemo(()=>{


    return bills.filter((bill)=>{


      const matchSearch=
      bill.product_name
      .toLowerCase()
      .includes(search.toLowerCase());



      const matchCategory=
      category==="All" ||
      bill.category===category;



      return matchSearch && matchCategory;


    });


  },[bills,search,category]);







  function status(date){


    const today=new Date();

    const expiry=new Date(date);


    const days=Math.ceil(

      (expiry-today)/
      (1000*60*60*24)

    );



    if(days<0)

      return "🔴 Expired";


    if(days<=30)

      return `🟡 ${days} days left`;



    return "🟢 Active";


  }







  if(loading){

    return(

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold">
          Loading Bills...
        </h1>

      </div>

    )

  }







return(

<div>


<Navbar />



<div className="min-h-screen bg-slate-100 p-8">



<div className="flex justify-between items-center mb-8">


<h1 className="text-4xl font-bold">

📋 All Bills

</h1>



<button

onClick={()=>navigate("/add-bill")}

className="bg-blue-600 text-white px-5 py-3 rounded-xl"

>

➕ Add Bill

</button>


</div>





<div className="grid md:grid-cols-2 gap-4 mb-6">


<input

placeholder="🔍 Search product"

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="p-3 rounded-xl border"

/>




<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

className="p-3 rounded-xl border"

>


{
categories.map(cat=>(

<option key={cat}>
{cat}
</option>

))
}


</select>


</div>






<div className="bg-white rounded-2xl shadow overflow-x-auto">


<table className="w-full">


<thead className="bg-blue-600 text-white">


<tr>

<th className="p-4">
Image
</th>

<th className="p-4">
Product
</th>

<th className="p-4">
Category
</th>

<th className="p-4">
Price
</th>

<th className="p-4">
Warranty
</th>

<th className="p-4">
Status
</th>

<th className="p-4">
Action
</th>

</tr>


</thead>





<tbody>


{
filteredBills.map((bill)=>(


<tr
key={bill.id}
className="border-b hover:bg-gray-50"
>



<td className="p-4">


{

bill.image_url ?

<img

src={bill.image_url}

alt="bill"

onClick={()=>setImage(bill.image_url)}

className="w-20 h-20 object-cover rounded-xl cursor-pointer"

/>

:

"No Image"

}



</td>




<td className="p-4">


<button

onClick={()=>navigate(`/bill/${bill.id}`)}

className="text-blue-600 font-bold hover:underline"

>

{bill.product_name}

</button>


</td>





<td className="p-4">
{bill.category}
</td>




<td className="p-4">
₹{Number(bill.price).toLocaleString()}
</td>




<td className="p-4">
{bill.warranty_months} Months
</td>




<td className="p-4">
{status(bill.expiry_date)}
</td>




<td className="p-4">


<button

onClick={()=>navigate(`/edit-bill/${bill.id}`)}

className="bg-yellow-500 text-white px-3 py-2 rounded-lg mr-2"

>

✏️

</button>



<button

onClick={()=>deleteBill(bill.id)}

className="bg-red-600 text-white px-3 py-2 rounded-lg"

>

🗑️

</button>



</td>



</tr>


))

}


</tbody>



</table>



</div>





{
image &&

<div

onClick={()=>setImage(null)}

className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"

>


<img

src={image}

alt="preview"

className="max-h-[90vh] max-w-[90vw] rounded-xl"

/>


</div>

}




</div>


</div>


)

}