var navegador = navigator.userAgent, esIE = navegador.indexOf("MSIE");
// Activar swipe táctil en el carrusel
  document.querySelectorAll('.carousel').forEach(carousel => {
	// Activar cada carrusel con autoplay
	const bsCarousel = new bootstrap.Carousel(carousel, {
	  interval: 5000, // ⏱ 2 segundos por slide
	  ride: 'carousel', // autoplay activo
	  pause: 'hover' // se detiene al pasar el ratón (opcional)
	});

	// Variables para el gesto táctil
	let touchStartX = 0;
	let touchEndX = 0;

	// Detectar inicio del toque
	carousel.addEventListener('touchstart', e => {
	  touchStartX = e.changedTouches[0].screenX;
	});

	// Detectar fin del toque
	carousel.addEventListener('touchend', e => {
	  touchEndX = e.changedTouches[0].screenX;
	  handleSwipeGesture();
	});

	// Interpretar el gesto táctil
	function handleSwipeGesture() {
	  const swipeThreshold = 50; // sensibilidad mínima en píxeles
	  if (touchEndX < touchStartX - swipeThreshold) {
		bsCarousel.next(); // siguiente slide
	  }
	  if (touchEndX > touchStartX + swipeThreshold) {
		bsCarousel.prev(); // slide anterior
	  }
	}
  });



// Mapas interactivos
  const zonas = document.querySelectorAll('#mapaMurcia .zona');
  const tooltip = document.getElementById('svgTooltip');

  zonas.forEach(zona => {
	zona.addEventListener('mouseenter', e => {
	  const nombre = zona.dataset.name;
	  tooltip.textContent = nombre;
	  tooltip.style.display = 'block';
	});

	zona.addEventListener('mousemove', e => {
	  const containerRect = e.target.closest('.mapa-svg-container').getBoundingClientRect();
	  tooltip.style.left = `${e.clientX - containerRect.left}px`;
	  tooltip.style.top = `${e.clientY - containerRect.top}px`;
	});

	zona.addEventListener('mouseleave', () => {
	  tooltip.style.display = 'none';
	});

	zona.addEventListener('click', () => {
	  const link = zona.dataset.link;
	  window.location = link;
	});
  });



// Ventana modal videos
  const videoModal = document.getElementById('videoModal');
  const videoIframe = document.getElementById('videoIframe');

  // Cargar el video al abrir el modal
  videoModal.addEventListener('show.bs.modal', event => {
	const button = event.relatedTarget;
	const videoSrc = button.getAttribute('data-video');
	videoIframe.src = `${videoSrc}?autoplay=1`;
  });

  // Detener el video al cerrar el modal
  videoModal.addEventListener('hidden.bs.modal', () => {
	videoIframe.src = '';
  });



// Ventana modal imagenes
  const imagenModal = document.getElementById('imagenModal');
  const imagenAmpliada = document.getElementById('imagenAmpliada');

  imagenModal.addEventListener('show.bs.modal', event => {
	const trigger = event.relatedTarget; // el <img> que activó el modal
	const src = trigger.getAttribute('src');
	const alt = trigger.getAttribute('alt');
	imagenAmpliada.src = src;
	imagenAmpliada.alt = alt;
  });


// Megamenu
  const menuQueHacer = document.getElementById('menuQueHacer');
  const panelQueHacer = document.getElementById('panelQueHacer');
  const cerrarPanel = document.getElementById('cerrarPanel');
  const flecha = document.getElementById('flechaQueHacer');

  // --- Función para cerrar el panel ---
  function cerrarPanelQueHacer() {
	panelQueHacer.classList.remove('activo');
	flecha.classList.remove('flecha-activa');
  }

  // --- Al hacer clic en "Qué hacer" ---
  menuQueHacer.addEventListener('click', (e) => {
	e.preventDefault();

	const activo = panelQueHacer.classList.toggle('activo');
	flecha.classList.toggle('flecha-activa', activo);

	// Cerrar cualquier dropdown Bootstrap abierto
	document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
	  const dropdown = bootstrap.Dropdown.getInstance(menu);
	  if (dropdown) dropdown.hide();
	});
  });

  // --- Botón cerrar dentro del panel ---
  //cerrarPanel.addEventListener('click', cerrarPanelQueHacer);

  // --- Al abrir un dropdown Bootstrap ---
  document.querySelectorAll('.dropdown-toggle').forEach(dropdownToggle => {
	dropdownToggle.addEventListener('show.bs.dropdown', () => {
	  cerrarPanelQueHacer();
	});
  });

  // --- Cerrar el panel al hacer clic fuera ---
  document.addEventListener('click', (e) => {
	const clickDentroPanel = panelQueHacer.contains(e.target);
	const clickEnBoton = menuQueHacer.contains(e.target);
	if (!clickDentroPanel && !clickEnBoton) {
	  cerrarPanelQueHacer();
	}
  });

// --- Control del contenido del panel "Qué hacer" ---
const enlacesLateral = document.querySelectorAll('#menuLateralQueHacer .link-lateral');
const bloquesContenido = document.querySelectorAll('#contenedorQueHacer .bloque-contenido');

enlacesLateral.forEach(link => {
  link.addEventListener('click', e => {
	e.preventDefault();

	// Actualiza estado visual de los enlaces
	enlacesLateral.forEach(l => l.classList.remove('active'));
	link.classList.add('active');

	// Muestra solo el contenido correspondiente
	const targetId = link.dataset.target;
	bloquesContenido.forEach(b => {
	  b.classList.toggle('active', b.id === targetId);
	});
  });
});

document.addEventListener("DOMContentLoaded", function () {
const faqs = document.querySelectorAll(".faq-item");

faqs.forEach((faq) => {
  const header = faq.querySelector(".faq-header");

  header.addEventListener("click", () => {
	// Cerrar los demás
	faqs.forEach((item) => {
	  if (item !== faq) item.classList.remove("active");
	});

	// Alternar el actual
	faq.classList.toggle("active");
  });
});
});

function ver_todo_que_hacer(){
	const elementos = document.querySelectorAll(".quehidden");
    elementos.forEach(el => el.classList.remove("quehidden"));
}

function move_email(){
	document.getElementById('x_email_newsletters').value = document.getElementById('new_email').value;
}

function move_email_pop(){
	document.getElementById('x_email_newsletters').value = document.getElementById('pop_email').value;
}

function finalizar_alta_newsletters() {
	if ($('#x_email_newsletters').val() == ""){
		mensaje('Primero debes introducir tu dirección de email en el campo "Email de contacto"',true);
	}else if ($('#cp_newsletters').val() == ""){
		mensaje('El campo "Código Postal" es obligatorio',true);
	}else if ($('#pais_newsletters').val() == ""){
		mensaje('Debes seleccionar un "País" de la lista',true);
	}else if(!$('#nw_acepto').prop('checked')) {
		mensaje('Debes aceptar la "Política de Privacidad"',true);
	}else{
		$('#accion_newsletters').val('insert');
		document.getElementById("frmnews").submit();
	}
}

document.getElementById('closeSuscripcion').addEventListener('click', function() {
	document.getElementById('popupSuscripcion').style.display = 'none';
});

function mensaje(txt,boton){
	if (!boton){
		$('#boton-mensaje').addClass('d-none');
	}else{
		$('#boton-mensaje').removeClass('d-none');
	}

	const alertMessage = document.getElementById('alertMessage');
	alertMessage.innerHTML = txt;
	const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
	alertModal.show();
}

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.acordeon-card');

  cards.forEach(card => {
    // Cuando paso el ratón por encima de una tarjeta
    card.addEventListener('mouseenter', () => {
      cards.forEach(c => c.classList.remove('is-large'));
      card.classList.add('is-large');
    });

    // Opcional: también al recibir foco por teclado (accesibilidad)
    card.addEventListener('focusin', () => {
      cards.forEach(c => c.classList.remove('is-large'));
      card.classList.add('is-large');
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const consentDiv = document.getElementById('cookieConsent');
  const closeBtn = document.getElementById('closeCookie');
  const aceptBtn = document.getElementById('aceptCookie');
  const rejectBtn = document.getElementById('rejectCookie');
  const STORAGE_KEY = 'cookieConsentClosedAtTRM';
  const ONE_WEEK = 30 * 24 * 60 * 60 * 1000; // Pedimos las cookies cada 30 días
  const closedAt = localStorage.getItem(STORAGE_KEY);

  if (closedAt) {
    const elapsed = Date.now() - parseInt(closedAt, 10);
    if (elapsed < ONE_WEEK) {
      consentDiv.style.display = 'none';
    }else{
      consentDiv.style.display = '';
	}
  }else{
    consentDiv.style.display = '';
  }

  closeBtn.addEventListener('click', function () {
    consentDiv.style.display = 'none';
    localStorage.setItem(STORAGE_KEY, Date.now());
  });
  aceptBtn.addEventListener('click', function () {
    consentDiv.style.display = 'none';
    localStorage.setItem(STORAGE_KEY, Date.now());
  });
  rejectBtn.addEventListener('click', function () { // Falta programar desactivación de cookies
    consentDiv.style.display = 'none';
    localStorage.setItem(STORAGE_KEY, Date.now());
  });
});

document.addEventListener('DOMContentLoaded', function () {
	const newsDiv = document.getElementById('popupSuscripcion');
	const numero = Math.floor(Math.random() * 20) + 1;
	if (numero === 5 || numero === 15) {
		newsDiv.style.display = '';
	}
});
/*
document.addEventListener('click', function (event) {
    const link = event.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');

    // Excluir target="_blank"
    if (link.target === '_blank') {
        return;
    }

    // Ignorar enlaces especiales
    if (
        href.startsWith('#') ||
        href.startsWith('javascript:') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
    ) {
        return;
    }

    // Crear URL absoluta (convierte relativas en absolutas)
    const url = new URL(href, window.location.origin);

    // Dominio permitido
    const allowedHost = 'www.turismoregiondemurcia.es';

    // Solo enlaces del mismo dominio
    if (url.hostname !== allowedHost) {
        return;
    }

    // Excluir PDFs
    if (url.pathname.toLowerCase().endsWith('.pdf')) {
        return;
    }

    event.preventDefault();

    // Añadir parámetro si no existe
    if (!url.searchParams.has('version')) {
        url.searchParams.append('version', '2');
    }

    // Navegar a la URL modificada
    window.location.href = url.toString();
});
*/

function traduce(e, t, a) {
    var o = {
        q: e,
        sl: "es",
        tl: t
    };
    $.ajax({
        url: "https://murciaturistica.org.es/scripts/traductor/translate-api.php",
        type: "post",
        data: o,
        success: function(e) {
            $("#" + a).html(e)
        }
    })
}

function ver_destino(a){
	var formData = {
		"id_zona"	: a
	};
	$.ajax({
		url: "https://www.turismoregiondemurcia.es/es/w_get_mapa_destinos",
		type: "get",
		data: formData,
		success: function(response){
			$("#ajaxCarrusel").html(response);	
		}
	});
}	