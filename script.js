const { jsPDF } = window.jspdf;
const canvas = document.getElementById("signature-pad");
const signaturePad = new SignaturePad(canvas);

document.getElementById("clear").addEventListener("click", () => {
  signaturePad.clear();
});

document.getElementById("generate").addEventListener("click", () => {
  if (signaturePad.isEmpty()) {
    alert("Por favor, assine antes de gerar o PDF.");
    return;
  }

  const contratoTexto = document.getElementById("contrato").innerText;
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const margem = 40;
  const larguraTexto = 500;
  const linhas = pdf.splitTextToSize(contratoTexto, larguraTexto);
  let y = 60;

  linhas.forEach((linha) => {
    if (y > 750) {
      pdf.addPage();
      y = 60;
    }
    pdf.text(linha, margem, y);
    y += 20;
  });

  // Página da assinatura
  pdf.addPage();
  pdf.text("Assinatura do Cliente:", margem, 80);

  // Captura o canvas real para o PDF (sincronizado)
  const dataURL = signaturePad.toDataURL("image/png");
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const pdfWidth = 500; // largura desejada no PDF
  const pdfHeight = (canvasHeight / canvasWidth) * pdfWidth; // proporcional
  pdf.addImage(dataURL, "PNG", margem, 100, pdfWidth, pdfHeight);

  pdf.save("contrato-assinado.pdf");
});
