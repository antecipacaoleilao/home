const canvas = document.getElementById('assinatura');
const signaturePad = new SignaturePad(canvas);

document.getElementById('limpar').addEventListener('click', () => {
  signaturePad.clear();
});

document.getElementById('gerarPDF').addEventListener('click', () => {
  if (signaturePad.isEmpty()) {
    alert("Por favor, faça a assinatura primeiro!");
    return;
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  // Função para quebrar texto em linhas automaticamente
  function addText(text, yStart, lineHeight = 8) {
    const lines = pdf.splitTextToSize(text, 180);
    lines.forEach((line, index) => {
      if (yStart + index * lineHeight > 280) { // cria nova página se passar da altura
        pdf.addPage();
        yStart = 10;
      }
      pdf.text(line, 10, yStart + index * lineHeight);
    });
    return yStart + lines.length * lineHeight;
  }

  // CONTRATO REAL (pode alterar o texto se quiser)
  let y = 20;
  y = addText("CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE CORRESPONDENTE BANCÁRIO AUTÔNOMO", y);
  y = addText("CLIENTE: [Nome completo], [nacionalidade], [estado civil], [profissão], portador(a) do RG nº _____________ e inscrito(a) no CPF sob nº _____________, residente e domiciliado(a) à [endereço completo];", y);
  y = addText("CORRESPONDENTE: [Seu nome/empresa], [nacionalidade], [estado civil], [profissão/empresa], CPF/CNPJ nº _____________, estabelecido em [endereço completo].", y);
  y = addText("CLÁUSULA PRIMEIRA – OBJETO DO CONTRATO: O presente contrato tem por objeto a prestação de serviços de intermediação e correspondência bancária...", y);
  y = addText("CLÁUSULA SEGUNDA – ESCLARECIMENTOS E NATUREZA DA ATIVIDADE: O CORRESPONDENTE declara, e o CLIENTE reconhece...", y);
  y = addText("CLÁUSULA TERCEIRA – RESPONSABILIDADE PELOS REPASSES: Todos os valores decorrentes de crédito, financiamento, empréstimo ou qualquer outro produto serão disponibilizados diretamente pela instituição financeira ao CLIENTE...", y);
  y = addText("CLÁUSULA QUARTA – REMUNERAÇÃO: O CLIENTE não efetuará qualquer pagamento ao CORRESPONDENTE a título de honorários...", y);
  y = addText("CLÁUSULA QUINTA – OBRIGAÇÕES DAS PARTES: São obrigações do CORRESPONDENTE: (a) Receber, conferir e encaminhar corretamente a documentação apresentada pelo CLIENTE; (b) Prestar informações claras, precisas e verdadeiras sobre os serviços intermediados...", y);
  y = addText("CLÁUSULA SEXTA – SIGILO E PROTEÇÃO DE DADOS: O CORRESPONDENTE compromete-se a tratar os dados pessoais do CLIENTE em conformidade com a LGPD...", y);
  y = addText("CLÁUSULA SÉTIMA – VIGÊNCIA E RESCISÃO: O presente contrato entra em vigor na data de sua assinatura...", y);
  y = addText("CLÁUSULA OITAVA – RESPONSABILIDADES: O CORRESPONDENTE não garante a aprovação de crédito, aumento de limite ou concessão de qualquer produto financeiro...", y);
  y = addText("CLÁUSULA NONA – FORO: Para dirimir quaisquer dúvidas oriundas deste contrato, as partes elegem o foro da comarca de [Cidade/Estado]...", y);

  // página da assinatura
  pdf.addPage();
  pdf.text("Assinatura do cliente:", 10, 50);
  const dataURL = signaturePad.toDataURL("image/png");
  pdf.addImage(dataURL, "PNG", 10, 60, 180, 80); // x, y, largura, altura

  // salva o PDF
  pdf.save("contrato-assinado.pdf");
});
