

import { useState } from "react";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";

const Bill1 = () => {
  const [billData, setBillData] = useState({
    clientName: "",
    date: "",
    quantity: "",
    priceWithTax: "",
    total: "",
    item: "",
    totalHT: "",
    tva: "",
    discount: "",
    totalTTC: "",
    totalUSD: "",
    facturier: "",
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillData({ ...billData, [name]: value });
  };

 
  const createPDF = () => {
    const doc = new jsPDF();
     const centerX = doc.internal.pageSize.getWidth() / 2;

    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text("Original", centerX, 15, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("ste AFRI-FOOD SARLU", centerX, 25, { align: "center" });
  doc.text("AV ROUTE-KINSHASA Q/VILLE HAUTE", centerX, 31, { align: "center" });
  doc.text("LISANGA-N. 31", centerX, 37, { align: "center" });
  doc.text("ID. NAT: 01-F4300-N19213H", centerX, 43, { align: "center" });
  doc.text("NIF: A1706659H", centerX, 49, { align: "center" });

    doc.line(30, 52, 170, 52);

    doc.text(`No de Fat: A30`, 40, 58);
    doc.line(30, 60, 170, 60);

    doc.text(`Nom Du Client: ${billData.clientName}`, 40, 66);
    doc.line(30, 68, 170, 68);

    doc.text(`Date: ${billData.date}`, 40, 74);

    doc.setFont("helvetica", "bold");
    doc.text("Qte", 40, 82);
    doc.text("Prix+TVA", 60, 82);
    doc.text("Total", 120, 82);

    doc.setFont("helvetica", "normal");
    doc.text(`${billData.quantity}`, 40, 88);
    doc.text(`${billData.priceWithTax}`, 60, 88);
    doc.text(`${billData.total}`, 120, 88);

    doc.text(`${billData.item}`, 40, 94);

    doc.line(30, 98, 170, 98);

    doc.text(`Total H.T: ${billData.totalHT}`, 40, 104);
    doc.text(`TVA: ${billData.tva}`, 40, 110);
    doc.text(`Remise: ${billData.discount}`, 40, 116);
    doc.text(`TOTAL T.T.C: ${billData.totalTTC}`, 40, 122);

    doc.line(30, 126, 170, 126);
    doc.text(`TOTAL T.T.C US$: ${billData.totalUSD}`, 40, 132);

    doc.line(30, 136, 170, 136);
    doc.text(`Facturier: ${billData.facturier}`, 40, 142);
    doc.text("Signature: ____________________", 40, 148);

    return doc;
  };

  
  const downloadPDF = () => {
    const doc = createPDF();
    doc.save("bill.pdf");
  };

  const previewPDF = () => {
    const doc = createPDF();
    const url = doc.output("bloburl");
    setPreviewUrl(url);
  };

  return (
  <div className="container-fluid p-4">
    <div className="row">
      <div className="col-md-5">
        <div className="card shadow p-4">
          <h4 className="text-center mb-3">Bill Generator</h4>

          {/* Render inputs two per row */}
          {Object.keys(billData).map((key, index) => {
            // Only render on even index, pair with next field if exists
            if (index % 2 === 0) {
              return (
                <div className="row mb-2" key={key}>
                  <div className="col-md-6">
                    <label className="form-label text-capitalize">{key}</label>
                    <input
                      type="text"
                      name={key}
                      value={billData[key]}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  {Object.keys(billData)[index + 1] && (
                    <div className="col-md-6">
                      <label className="form-label text-capitalize">
                        {Object.keys(billData)[index + 1]}
                      </label>
                      <input
                        type="text"
                        name={Object.keys(billData)[index + 1]}
                        value={billData[Object.keys(billData)[index + 1]]}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  )}
                </div>
              );
            }
            return null; // skip odd index (already rendered in pair)
          })}

          <div className="d-flex gap-2 mt-3">
            <button onClick={downloadPDF} className="btn btn-primary w-50">
              Download PDF
            </button>
            <button onClick={previewPDF} className="btn btn-secondary w-50">
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE – PREVIEW */}
      <div className="col-md-7">
        <div className="card shadow p-2 h-100">
          <h5 className="text-center">PDF Preview</h5>

          {previewUrl ? (
            <iframe
              src={previewUrl}
              title="PDF Preview"
              width="100%"
              height="700px"
              style={{ border: "none" }}
            />
          ) : (
            <p className="text-center text-muted mt-5">
              Click <strong>Preview</strong> to see the bill
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

export default Bill1;

