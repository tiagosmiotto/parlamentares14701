var currentChamber = 'camara';
var currentUF = ''; // Armazena a UF selecionada
var isBancadaEvangelica = false; // Armazena o estado do toggle da Bancada Evangélica

// Filtro de UF
document.getElementById('ufFilter').addEventListener('change', function() {
  currentUF = this.value;
  updateIframe();
});

// Alternar entre Lista completa e Bancada Evangélica
document.getElementById('listaCompleta').addEventListener('click', function() {
  isBancadaEvangelica = false;
  document.getElementById('listaCompleta').classList.add('toggle-selected');
  document.getElementById('bancadaEvangelica').classList.remove('toggle-selected');
  updateIframe();
});

document.getElementById('bancadaEvangelica').addEventListener('click', function() {
  isBancadaEvangelica = true;
  document.getElementById('bancadaEvangelica').classList.add('toggle-selected');
  document.getElementById('listaCompleta').classList.remove('toggle-selected');
  updateIframe();
});

// Alternar entre Câmara e Senado
document.getElementById('camaraOption').addEventListener('click', function() {
  currentChamber = 'camara';
  document.getElementById('camaraOption').classList.add('toggle-selected');
  document.getElementById('senadoOption').classList.remove('toggle-selected');
  updateIframe();
});

document.getElementById('senadoOption').addEventListener('click', function() {
  currentChamber = 'senado';
  document.getElementById('senadoOption').classList.add('toggle-selected');
  document.getElementById('camaraOption').classList.remove('toggle-selected');
  updateIframe();
});

// Função para atualizar o iframe com base nos filtros
function updateIframe() {
  var iframe = document.getElementById('iframeDisplay');
  var ufQuery = currentUF ? `?search=${encodeURIComponent(currentUF)}` : '';

  if (currentChamber === 'camara') {
    if (isBancadaEvangelica) {
      iframe.src = `https://datawrapper.dwcdn.net/yMo65/1/${ufQuery}`;
      iframe.height = "1528";
    } else {
      iframe.src = `https://datawrapper.dwcdn.net/H0LTc/9/${ufQuery}`;
      iframe.height = "1528";
    }
  } else if (currentChamber === 'senado') {
    if (isBancadaEvangelica) {
      iframe.src = `https://datawrapper.dwcdn.net/jS8xK/1/${ufQuery}`;
      iframe.height = "1512";
    } else {
      iframe.src = `https://datawrapper.dwcdn.net/viQTH/1/${ufQuery}`;
      iframe.height = "1512";
    }
  }
}

// Ajusta a altura do iframe automaticamente
window.addEventListener("message", function(event) {
  if (typeof event.data["datawrapper-height"] !== "undefined") {
    var iframes = document.querySelectorAll("iframe");
    for (var key in event.data["datawrapper-height"]) {
      for (var i = 0; i < iframes.length; i++) {
        if (iframes[i].contentWindow === event.source) {
          iframes[i].style.height = event.data["datawrapper-height"][key] + "px";
        }
      }
    }
  }
});
// scripts.js
window.onload = function() {
    var bodyHeight = document.body.scrollHeight;
    window.parent.postMessage({ bodyHeight: bodyHeight }, "*");
};

// Ajusta a altura do iframe automaticamente com base na altura do body
window.onload = function() {
    var bodyHeight = document.body.scrollHeight; // Captura a altura total do body
    window.parent.postMessage({ bodyHeight: bodyHeight }, "*"); // Envia a altura ao parent
};

// Se a página redimensionar, envie a nova altura
window.onresize = function() {
    var bodyHeight = document.body.scrollHeight; // Captura a nova altura do body
    window.parent.postMessage({ bodyHeight: bodyHeight }, "*"); // Envia a nova altura ao parent
};

// Adiciona o listener para ajustar a altura com base nas mensagens recebidas
window.addEventListener("message", function(event) {
    if (typeof event.data.bodyHeight !== "undefined") {
        var iframe = document.getElementById('iframeDisplay'); // ID do iframe que você está ajustando
        iframe.style.height = event.data.bodyHeight + "px"; // Ajusta a altura do iframe
    }
});

