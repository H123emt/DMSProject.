import { useState } from "react";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";

const Bill2 = () => {
  const [data, setData] = useState({
    restaurantName: "LA PETITE MAISON",
    companyName: "Ste Multforce Sarl",
    rccm: "CD/KNG/RCCM/18-B-01908",
    natId: "N° 393233",
    impots: "A1824902N",
    phone1: "+243 999936548",
    phone2: "+243 899682536",
    email: "hotelfortune2@gmail.com",

    billDate: "",
    billTime: "",
    factureNo: "",
    tableNo: "",
    guestName: "",
    user: "",

    article: "",
    price: "",
    quantity: "",
    total: "",

    totalFC: "",
    totalHT: "",
    tva: "",
    ttc: "",
    taux: "",
    cashUSD: "",
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };



const createPDF = () => {
  const doc = new jsPDF();
  let y = 15;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(data.restaurantName, 105, y, { align: "center" });


  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  y += 7;
  doc.text(data.companyName, 105, y, { align: "center" });
  y += 6;
  doc.text(`${data.rccm} | ${data.natId}`, 105, y, { align: "center" });
  y += 6;
  doc.text(`N-Impôt: ${data.impots}`, 105, y, { align: "center" });
  y += 6;
  doc.text(`Telephone : ${data.phone1}, ${data.phone2}`, 105, y, { align: "center" });
  y += 6;
  doc.text(`Email : ${data.email}`, 105, y, { align: "center" });

  y += 8;
  doc.setFont("helvetica", "bold");
  doc.text("Restaurant Bill", 105, y, { align: "center" });

  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(
    `Le : ${data.billDate} @ ${data.billTime}`,
    105,
    y,
    { align: "center" }
  );

  y += 8;
  doc.text(`Facture # : ${data.factureNo}`, 20, y);
  doc.text(`Table : ${data.tableNo}`, 150, y);
  y += 6;
  doc.text(`Guest Name : ${data.guestName}`, 20, y);
  doc.text(`User : ${data.user}`, 150, y);


  y += 6;
  doc.setFont("helvetica", "bold");
  doc.text("ARTICLE", 20, y);
  doc.text("P.U", 90, y);
  doc.text("QTE", 120, y);
  doc.text("MONTANT", 150, y);

 
  doc.setFont("helvetica", "normal");
  y += 6;
  doc.text(data.article, 20, y);
  doc.text(String(data.price), 90, y);
  doc.text(String(data.quantity), 120, y);
  doc.text(String(data.total), 150, y);


  y += 6;
  doc.text(`Total (Fc) : ${data.totalFC}`, 120, y);
  y += 6;
  doc.text(`Total HT (Fc) : ${data.totalHT}`, 120, y);
  y += 6;
  doc.text(`TVA @ 16 % (Fc) : ${data.tva}`, 120, y);
  y += 6;
  doc.setFont("helvetica", "bold");
  doc.text(`TTC : ${data.ttc}`, 120, y);

  doc.setFont("helvetica", "normal");
  y += 8;
  doc.text(`TAUX DU JOUR : ${data.taux}`, 20, y);
  y += 6;
  doc.text(`Cash - USD`, 20, y);


  y += 15;
  doc.setFont("helvetica", "bold");
  doc.text("THANK YOU", 105, y, { align: "center" });

  return doc;
};


  const downloadPDF = () => {
    const doc = createPDF();
    doc.save("restaurant_bill.pdf");
  };

  const previewPDF = () => {
    const doc = createPDF();
    setPreviewUrl(doc.output("bloburl"));
  };

return (
  <div className="container-fluid p-4">
    <div className="row">
      {/* LEFT: FORM */}
      <div className="col-md-5">
        <div className="card p-3 shadow">
          <h4 className="text-center mb-3">Restaurant Bill</h4>

          <div className="row">
            {Object.keys(data).map((key) => (
              <div className="col-md-6 mb-2" key={key}>
                <label className="form-label text-capitalize">{key}</label>
                <input
                  className="form-control"
                  name={key}
                  value={data[key]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-primary w-50" onClick={downloadPDF}>
              Download
            </button>
            <button className="btn btn-secondary w-50" onClick={previewPDF}>
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: PREVIEW */}
      <div className="col-md-7">
        <div className="card shadow p-2 h-100">
          <h5 className="text-center">PDF Preview</h5>

          {previewUrl ? (
            <iframe
              src={previewUrl}
              width="100%"
              height="650"
              title="PDF Preview"
              style={{ border: "none" }}
            />
          ) : (
            <p className="text-center text-muted mt-5">
              Click <strong>Preview</strong> to view bill
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
);
}

export default Bill2;
