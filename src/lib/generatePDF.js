import jsPDF from "jspdf";


export function generateBillPDF(bill, aiText = "") {

  const doc = new jsPDF();


  doc.setFontSize(22);
  doc.text("BillBox Warranty Report", 20, 20);


  doc.setFontSize(14);

  doc.text(
    `Product: ${bill.product_name}`,
    20,
    45
  );


  doc.text(
    `Category: ${bill.category}`,
    20,
    55
  );


  doc.text(
    `Price: ₹${bill.price}`,
    20,
    65
  );


  doc.text(
    `Purchase Date: ${bill.purchase_date}`,
    20,
    75
  );


  doc.text(
    `Warranty: ${bill.warranty_months} Months`,
    20,
    85
  );


  doc.text(
    `Expiry Date: ${bill.expiry_date}`,
    20,
    95
  );


  doc.text(
    `Status: ${bill.expiry_date}`,
    20,
    105
  );



  if(aiText){

    doc.text(
      "AI Summary:",
      20,
      130
    );


    const lines =
    doc.splitTextToSize(
      aiText,
      170
    );


    doc.text(
      lines,
      20,
      145
    );

  }



  doc.save(
    `${bill.product_name}-BillBox.pdf`
  );

}