const { jsPDF } = window.jspdf;

// inicializa o pad de assinatura
const canvas = document.getElementById("signature-pad");
const signaturePad = new SignaturePad(canvas);

// limpar assinatura
document.getElementById("clear").addEventListener("click", () => {
  signaturePad.clear();
});

// gerar PDF com contrato + assinatura
document.getElementById("generate").addEventListener("click", () => {
  if (signaturePad.isEmpty()) {
    alert("Por favor, assine antes de gerar o PDF.");
    return;
  }

  const contratoTexto = document.getElementById("contrato").innerText;
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const margem = 40;
  const larguraTexto = 500;

  // divide o texto em várias páginas se necessário
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

  // nova página para assinatura
  pdf.addPage();
  pdf.text("Assinatura do Cliente:", margem, 80);

  const dataURL = signaturePad.toDataURL("image/png");
  pdf.addImage(dataURL, "PNG", margem, 100, 400, 100);

  pdf.save("contrato-assinado.pdf");
});
