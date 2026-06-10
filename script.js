const statusTexto = document.getElementById("status");
const botaoNotificacao = document.getElementById("btn-notificacao");

// Registra o Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registro = await navigator.serviceWorker.register("./service-worker.js");

      console.log("Service Worker registrado com sucesso:", registro);

      statusTexto.textContent = "Service Worker registrado com sucesso.";
    } catch (erro) {
      console.log("Erro ao registrar Service Worker:", erro);

      statusTexto.textContent = "Erro ao registrar Service Worker.";
    }
  });
} else {
  statusTexto.textContent = "Service Worker não suportado neste navegador.";
}

// Teste simples de notificação
botaoNotificacao.addEventListener("click", async () => {
  if (!("Notification" in window)) {
    alert("Este navegador não suporta notificações.");
    return;
  }

  const permissao = await Notification.requestPermission();

  if (permissao === "granted") {
    const registro = await navigator.serviceWorker.ready;

    registro.showNotification("Notificação de teste", {
      body: "A notificação da PWA está funcionando!",
      icon: "./icon.svg"
    });
  } else {
    alert("Permissão de notificação negada.");
  }
});