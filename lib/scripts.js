// Função para formatar o número da senha com zeros à esquerda
function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
  
  jQuery(document).ready(function($) {
  
    // Variável para guardar a última senha que foi falada
    let ultimaSenhaFalada = "";
  
    // Função para falar a senha usando voz do navegador
    function falarSenha(texto) {
    // Cacela qualquer fala pendente ou em andamento 
      window.speechSynthesis.cancel();

// Se a senha for igual à última falada, não fala de novo
if (texto === ultimaSenhaFalada) return;
      // Atualiza a última senha falada
      ultimaSenhaFalada = texto;
  
      // Cria e configura o objeto de fala
      const fala = new SpeechSynthesisUtterance(`Senha número ${texto}`);
      fala.lang = "pt-BR";      // Idioma em português
      fala.rate = 1;            // Velocidade da fala
      fala.pitch = 1;           // Tom da fala
  
      // Executa a fala
      window.speechSynthesis.speak(fala);
    }
  
    // Evento de teclado: escuta quando o usuário aperta teclas
    $("body").on("keydown", function(e) {
  
      // Pega os elementos da tela
      var senhaAtual = $("#senhaAtualNumero");      // Exibe a senha atual
      var senhaNormal = $("#senhaNormal");          // Guarda valor da senha normal
      var senhaPrior = $("#senhaPrioridade");       // Guarda valor da senha prioritária
      var ultimaSenha = $("#ultimaSenhaNumero");    // Exibe a última senha chamada
      var audioChamada = $("#audioChamada");        // Som de chamada (beep)
  
      // → Seta Direita: Próxima senha normal
      if (e.keyCode == 39) {
        ultimaSenha.html(senhaAtual.html());                        // Atualiza a última chamada
        var senha = parseInt(senhaNormal.val()) + 1;                // Soma 1 na senha normal
        var novaSenha = pad(senha, 4);                              // Formata com 4 dígitos
        senhaAtual.html(novaSenha);                                 // Mostra na tela
        senhaNormal.val(novaSenha);                                 // Salva no campo oculto
        audioChamada.trigger("play");                               // Toca o som
        falarSenha(novaSenha);                                      // Fala a senha
      }
  
      // ← Seta Esquerda: Próxima senha prioritária
      else if (e.keyCode == 38) {
        ultimaSenha.html(senhaAtual.html());                        // Atualiza a última chamada
        var senha = parseInt(senhaPrior.val().replace("P", "")) + 1; // Soma 1 removendo o "P"
        var novaSenha = "P" + pad(senha, 3);                        // Formata com "P" e 3 dígitos
        senhaAtual.html(novaSenha);                                 // Mostra na tela
        senhaPrior.val(novaSenha);                                  // Salva no campo oculto
        audioChamada.trigger("play");                               // Toca o som
        falarSenha(novaSenha);                                      // Fala a senha
      }
  
      // ↓ Seta para Baixo: Voltar 1 senha normal
      else if (e.keyCode == 37) {
        var senha = parseInt(senhaNormal.val()) - 1;                // Subtrai 1
        if (senha < 0) senha = 0;                                   // Garante que não seja negativo
        var novaSenha = pad(senha, 4);                              // Formata
        senhaAtual.html(novaSenha);                                 // Mostra na tela
        senhaNormal.val(novaSenha);                                 // Salva no campo oculto
        // falarSenha(novaSenha); // Descomente se quiser que fale ao voltar
      }
  
      // ↑ Seta para Cima: Voltar 1 senha prioritária
      else if (e.keyCode == 40) {
        var senha = parseInt(senhaPrior.val().replace("P", "")) - 1; // Subtrai 1
        if (senha < 0) senha = 0;
        var novaSenha = "P" + pad(senha, 3);                        // Formata
        senhaAtual.html(novaSenha);                                 // Mostra na tela
        senhaPrior.val(novaSenha);                                  // Salva no campo oculto
        // falarSenha(novaSenha); // Descomente se quiser que fale ao voltar
      }
    });
  });
  