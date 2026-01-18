/* AndesRider Motors - Lógica UI conectada a crud.js */

$(function () {
    // ===== Utilidades y Configuración Base =====
    $("#year").text(new Date().getFullYear());

    const money = (n) => {
        const val = Number(n || 0);
        return val.toLocaleString("en-US", { style: "currency", currency: "USD" });
    };

    const escapeHtml = (str) => {
        if (!str) return "";
        return String(str)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    };

    // ===== Tema =====
    const THEME_KEY = "andesrider_theme";
    const applyTheme = (theme) => {
        const isDark = theme === "dark";
        document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
        $("#themeToggle").attr("aria-pressed", String(isDark));
        $("#themeToggle .theme-toggle-icon").text(isDark ? "🌙" : "☀");
    };
    applyTheme(localStorage.getItem(THEME_KEY) || "light");

    $("#themeToggle").on("click", function () {
        const current = localStorage.getItem(THEME_KEY) || "light";
        const next = current === "dark" ? "light" : "dark";
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
    });

    // ===== Menú Móvil & Scroll =====
    const $nav = $("#primaryNav");
    $("#navToggle").on("click", function () {
        $nav.toggleClass("is-open");
        $(this).attr("aria-expanded", $nav.hasClass("is-open"));
    });
    $(".nav-link").on("click", () => {
        $nav.removeClass("is-open");
        $("#navToggle").attr("aria-expanded", "false");
    });

    // ===== Integración Backend: PRODUCTOS =====
    let products = []; // Almacenamiento local temporal para filtrar/ordenar

    // Cargar productos desde el Backend (vía crud.js)
    const loadProducts = async () => {
        $("#productsMeta").text("Cargando datos del servidor...");
        try {
            products = await ApiService.getProducts();
            renderProducts();
        } catch (e) {
            $("#productsMeta").text("Error de conexión con el Backend.");
        }
    };

    // Renderizar tabla
    const renderProducts = () => {
        const { q, sort } = getFilters();
        let list = [...products];

        // 1. Filtrar
        if (q) {
            list = list.filter((p) => {
                const hay = `${p.name} ${p.categoryName} ${p.status} ${p.desc}`.toLowerCase();
                return hay.includes(q);
            });
        }

        // 2. Ordenar
        switch (sort) {
            case "name-desc": list.sort((a, b) => b.name.localeCompare(a.name)); break;
            case "price-asc": list.sort((a, b) => a.price - b.price); break;
            case "price-desc": list.sort((a, b) => b.price - a.price); break;
            case "name-asc": default: list.sort((a, b) => a.name.localeCompare(b.name));
        }

        const $tbody = $("#productsTbody");
        $tbody.empty();

        if (!list.length) {
            $tbody.append(`<tr><td colspan="6"><span class="muted">No hay productos.</span></td></tr>`);
            $("#productsMeta").text("0 productos.");
            return;
        }

        list.forEach((p) => {
            const row = `
        <tr>
          <td>
            <strong>${escapeHtml(p.name)}</strong>
            <span class="sub">${escapeHtml(p.desc)}</span>
          </td>
          <td>${escapeHtml(p.categoryName)}</td>
          <td class="num">${money(p.price)}</td>
          <td class="num">${escapeHtml(p.stock)}</td>
          <td><span class="pill">${escapeHtml(p.status)}</span></td>
          <td class="num">
            <button class="btn btn-ghost btn-sm" data-action="edit" data-id="${p.id}">Editar</button>
            <button class="btn btn-ghost btn-sm" data-action="delete" data-id="${p.id}">Eliminar</button>
          </td>
        </tr>
      `;
            $tbody.append(row);
        });
        $("#productsMeta").text(`${list.length} producto(s) mostrados.`);
    };

    // Filtros
    const getFilters = () => ({
        q: $("#searchInput").val().trim().toLowerCase(),
        sort: $("#sortSelect").val()
    });
    $("#searchInput, #sortSelect").on("input change", renderProducts);
    $("#btnReload").on("click", loadProducts);

    // ===== Modal Crear/Editar =====
    const $modal = $("#productModal");
    const openModal = () => {
        $modal.addClass("is-open");
        $("#productAlert").prop("hidden", true).removeClass("ok bad").empty();
    };
    const closeModal = () => {
        $modal.removeClass("is-open");
        $("#productForm")[0].reset();
        $("#productId").val("");
    };
    $("#btnCloseModal, #btnCancelModal").on("click", closeModal);

    $("#btnAddProduct").on("click", () => {
        $("#modalTitle").text("Agregar producto");
        $("#btnSaveProduct").text("Guardar");
        closeModal(); openModal();
    });

    // Acción Editar/Eliminar
    $("#productsTbody").on("click", "button[data-action]", async function () {
        const action = $(this).data("action");
        const id = $(this).data("id");

        // Buscamos en el array local el objeto completo para llenar el formulario
        const p = products.find(x => x.id === id);

        if (action === "edit" && p) {
            $("#modalTitle").text("Editar producto");
            $("#btnSaveProduct").text("Actualizar");

            // Llenar form
            $("#productId").val(p.id);
            $("#pName").val(p.name);
            $("#pCategory").val(p.categoryId); // El ID numérico (1, 2, 3...)
            $("#pStatus").val(p.status);
            $("#pPrice").val(p.price);
            $("#pStock").val(p.stock);
            $("#pDesc").val(p.desc);

            openModal();
        } else if (action === "delete") {
            if (!confirm("¿Eliminar este producto permanentemente?")) return;
            try {
                await ApiService.deleteProduct(id);
                loadProducts(); // Recargar tabla
            } catch (e) {
                alert("Error al eliminar: " + e.message);
            }
        }
    });

    // Guardar Producto (Submit Formulario)
    $("#productForm").on("submit", async function (e) {
        e.preventDefault();
        const id = $("#productId").val();

        const payload = {
            name: $("#pName").val().trim(),
            categoryId: parseInt($("#pCategory").val()), // Convertir a número para el Backend
            status: $("#pStatus").val(),
            price: parseFloat($("#pPrice").val()),
            stock: parseInt($("#pStock").val()),
            desc: $("#pDesc").val().trim()
        };

        const $btn = $("#btnSaveProduct");
        $btn.prop("disabled", true).text("Guardando...");

        try {
            if (id) {
                await ApiService.updateProduct(id, payload);
            } else {
                await ApiService.createProduct(payload);
            }
            closeModal();
            loadProducts(); // Recargar datos frescos
        } catch (err) {
            $("#productAlert").removeClass("ok").addClass("bad").prop("hidden", false).text("Error: " + err.message);
        } finally {
            $btn.prop("disabled", false).text(id ? "Actualizar" : "Guardar");
        }
    });

    // ===== CONTACTO (UX CORREGIDA) =====
    $("#contactForm").on("submit", async function (e) {
        e.preventDefault();

        const payload = {
            name: $("#name").val().trim(),
            phone: $("#phone").val().trim(),
            email: $("#email").val().trim(),
            reason: $("#reason").val(),
            message: $("#message").val().trim()
        };

        const $alert = $("#contactAlert");
        const $btn = $(this).find("button[type='submit']");
        const $inputs = $(this).find(".form-row, .field, .form-actions");

        $btn.prop("disabled", true).text("Enviando...");
        $alert.prop("hidden", true);

        try {
            await ApiService.createContact(payload);

            // CORRECCIÓN: Primero subimos el scroll al inicio de la sección 'Contacto'
            // Esto evita el salto brusco cuando el formulario se oculta
            $('html, body').animate({
                scrollTop: $("#contacto").offset().top - 80
            }, 400);

            // Luego ocultamos los campos y mostramos el mensaje
            $inputs.slideUp(400, function () {
                // Callback: Se ejecuta cuando termina de ocultarse el formulario
                $alert.removeClass("bad").addClass("ok")
                    .html(`
                        <div>
                            <h4>¡Mensaje Recibido!</h4>
                            <p>Gracias <strong>${escapeHtml(payload.name)}</strong>.</p>
                            <p>Hemos registrado tu solicitud de <em>${escapeHtml(payload.reason)}</em> correctamente.</p>
                            <button type="button" class="btn-retry" id="btnNewContact">Enviar otro mensaje</button>
                        </div>
                    `)
                    .prop("hidden", false)
                    .hide().fadeIn(400);
            });

            // Guarda toast por si hay refresh/reload raro
            sessionStorage.setItem("andes_toast", JSON.stringify({
                type: "ok",
                title: "Enviado",
                message: `Gracias ${payload.name}. Tu mensaje fue guardado correctamente.`,
                ms: 3500,
                ts: Date.now()
            }));

            // Muestra toast inmediatamente (sin depender del alert dentro del form)
            showToast("ok", "Enviado", `Gracias ${payload.name}. Tu mensaje fue guardado correctamente.`, 3500);


            this.reset();

        } catch (err) {
            console.error(err);
            $alert.removeClass("ok").addClass("bad")
                .html(`
                    <div>
                        <strong>Error de envío</strong>
                        No pudimos conectar con el servidor. Verifica que el Backend Java esté corriendo.
                    </div>
                `)
                .prop("hidden", false);

            // Scroll hacia el mensaje de error (sin ocultar el formulario)
            $('html, body').animate({
                scrollTop: $alert.offset().top - 100
            }, 400);

            sessionStorage.setItem("andes_toast", JSON.stringify({
                type: "bad",
                title: "Error",
                message: "No se pudo enviar. Verifica que el backend esté corriendo.",
                ms: 4500,
                ts: Date.now()
            }));

            showToast("bad", "Error", "No se pudo enviar. Verifica que el backend esté corriendo.", 4500);


        } finally {
            $btn.prop("disabled", false).text("Enviar");
        }
    });

    // Delegación de eventos para el botón "Enviar otro"
    $("#contactAlert").on("click", "#btnNewContact", function () {
        const $form = $("#contactForm");
        const $alert = $("#contactAlert");

        $alert.prop("hidden", true);
        $form.find(".form-row, .field, .form-actions").slideDown(400);

        // Scroll suave de regreso al formulario
        $('html, body').animate({
            scrollTop: $("#contacto").offset().top - 80
        }, 400);
    });


    // ===== Render Noticias (Estático por ahora) =====
    const newsItems = [
        {
            title: "5 consejos para alargar la vida del motor",
            date: "2026-01-02",
            tag: "Taller",
            excerpt:
                "Aceite a tiempo, cadena bien tensada, filtro limpio y conducción constante: pequeñas rutinas evitan fallas costosas."
        },
        {
            title: "Cómo elegir tu primera moto urbana (125–200cc)",
            date: "2025-12-18",
            tag: "Guía",
            excerpt:
                "Prioriza consumo, disponibilidad de repuestos, ergonomía y un plan de mantenimiento sencillo para tu presupuesto."
        },
        {
            title: "Checklist básico antes de salir a carretera",
            date: "2025-11-25",
            tag: "Seguridad",
            excerpt:
                "Revisa presión de llantas, frenos, luces, aceite y kit de herramientas. Evita emergencias con inspección previa."
        },
        {
            title: "Accesorios recomendados para ciudad",
            date: "2025-10-09",
            tag: "Accesorios",
            excerpt:
                "Casco certificado, guantes, impermeable ligero y un soporte seguro para móvil aumentan comodidad y seguridad."
        },
        {
            title: "Qué significa “mantenimiento preventivo” en motos",
            date: "2025-09-12",
            tag: "Taller",
            excerpt:
                "No es solo aceite: incluye frenos, transmisión, bujía, filtros, tensión de cadena y verificación eléctrica."
        },
        { title: "Mantenimiento preventivo", date: "2026-01-02", tag: "Taller", excerpt: "Consejos clave para tu motor." },
        { title: "Seguridad vial", date: "2025-12-15", tag: "Guía", excerpt: "Equipo básico para rodar seguro." },
    ];
    newsItems.forEach(n => {
        $("#newsGrid").append(`
            <article class="card news-card">
                <div class="meta"><span class="pill">${n.tag}</span><span>${n.date}</span></div>
                <h3>${n.title}</h3><p>${n.excerpt}</p>
            </article>
        `);
    });

    // Inicializar
    loadProducts();

});


// ALERTS
// ===== TOAST (persistente incluso con reload) =====
function showToast(type, title, message, ms = 3500) {
    let $t = $("#appToast");
    if (!$t.length) {
        $("body").append(`
      <div id="appToast" class="toast" role="status" aria-live="polite">
        <button class="toast-close" type="button" aria-label="Cerrar">×</button>
        <div class="toast-title"></div>
        <p class="toast-msg"></p>
      </div>
    `);
        $t = $("#appToast");
        $t.on("click", ".toast-close", () => hideToast());
    }

    $t.removeClass("ok bad").addClass(type);
    $t.find(".toast-title").text(title || "");
    $t.find(".toast-msg").text(message || "");

    // Mostrar
    requestAnimationFrame(() => $t.addClass("is-show"));

    // Auto-cerrar
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => hideToast(), ms);
}

function hideToast() {
    const $t = $("#appToast");
    $t.removeClass("is-show");
}

// Si hubo reload, re-mostrar el último toast
(() => {
    const saved = sessionStorage.getItem("andes_toast");
    if (!saved) return;
    try {
        const { type, title, message, ms, ts } = JSON.parse(saved);
        // solo mostrar si fue reciente (<= 10s)
        if (Date.now() - ts <= 10000) {
            showToast(type, title, message, ms || 3500);
        }
    } catch (_) { }
    sessionStorage.removeItem("andes_toast");
})();