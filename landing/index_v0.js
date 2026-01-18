/* AndesRider Motors - JS + DOM + jQuery
   Incluye: navegación, menú responsive, noticias dinámicas,
   formulario contacto con validación, y CRUD de productos (localStorage).
*/

$(function () {
    const STORAGE_KEY = "andesrider_products_v1";

    // ===== Utilidades =====
    const money = (n) => {
        const val = Number(n || 0);
        return val.toLocaleString("en-US", { style: "currency", currency: "USD" });
    };

    const uid = () => {
        // id simple para demo (no criptográfico)
        return "p_" + Math.random().toString(16).slice(2) + "_" + Date.now().toString(16);
    };

    const escapeHtml = (str) => {
        return String(str)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    };

    // ===== Año footer =====
    $("#year").text(new Date().getFullYear());

    // ===== Tema claro/oscuro (default: claro) =====
    const THEME_KEY = "andesrider_theme"; // "light" | "dark"

    const applyTheme = (theme) => {
        const isDark = theme === "dark";
        document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");

        // UI del botón
        $("#themeToggle").attr("aria-pressed", String(isDark));
        $("#themeToggle .theme-toggle-icon").text(isDark ? "🌙" : "☀");
    };

    // Cargar preferencia (si no existe, claro por defecto)
    const savedTheme = localStorage.getItem(THEME_KEY) || "light";
    applyTheme(savedTheme);

    $("#themeToggle").on("click", function () {
        const current = localStorage.getItem(THEME_KEY) || "light";
        const next = current === "dark" ? "light" : "dark";
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
    });

    // ===== Menú móvil =====
    const $nav = $("#primaryNav");
    $("#navToggle").on("click", function () {
        const isOpen = $nav.hasClass("is-open");
        $nav.toggleClass("is-open", !isOpen);
        $(this).attr("aria-expanded", String(!isOpen));
    });

    // Cerrar menú al hacer click en un link (móvil)
    $(".nav-link").on("click", function () {
        if ($nav.hasClass("is-open")) {
            $nav.removeClass("is-open");
            $("#navToggle").attr("aria-expanded", "false");
        }
    });

    // ===== Navegación activa según scroll =====
    const sections = ["#home", "#empresa", "#productos", "#oferta", "#localizacion", "#contacto", "#noticias"];
    const setActiveLink = () => {
        let current = "#home";
        const scrollPos = window.scrollY + 120;

        for (const id of sections) {
            const el = document.querySelector(id);
            if (!el) continue;
            if (el.offsetTop <= scrollPos) current = id;
        }

        $(".nav-link").removeClass("is-active");
        $(`.nav-link[href="${current}"]`).addClass("is-active");
    };
    $(window).on("scroll", setActiveLink);
    setActiveLink();

    // ===== Noticias (DOM dinámico) =====
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
        }
    ];

    let newsVisible = 3;

    const renderNews = () => {
        const $grid = $("#newsGrid");
        $grid.empty();

        const slice = newsItems.slice(0, newsVisible);
        slice.forEach((n) => {
            const html = `
        <article class="card news-card">
          <div class="meta">
            <span class="pill">${escapeHtml(n.tag)}</span>
            <span>${escapeHtml(n.date)}</span>
          </div>
          <h3>${escapeHtml(n.title)}</h3>
          <p>${escapeHtml(n.excerpt)}</p>
        </article>
      `;
            $grid.append(html);
        });

        $("#btnLoadMore").prop("disabled", newsVisible >= newsItems.length);
    };

    $("#btnLoadMore").on("click", function () {
        newsVisible = Math.min(newsVisible + 2, newsItems.length);
        renderNews();
    });

    renderNews();

    // ===== Contacto: validación + mensaje dinámico =====
    $("#contactForm").on("submit", function (e) {
        e.preventDefault();

        const name = $("#name").val().trim();
        const phone = $("#phone").val().trim();
        const email = $("#email").val().trim();
        const reason = $("#reason").val();
        const message = $("#message").val().trim();

        const $alert = $("#contactAlert");

        const errors = [];
        if (name.length < 3) errors.push("Ingresa un nombre válido (mínimo 3 caracteres).");
        if (phone.length < 7) errors.push("Ingresa un teléfono válido.");
        if (!/^\S+@\S+\.\S+$/.test(email)) errors.push("Ingresa un correo válido.");
        if (!reason) errors.push("Selecciona el motivo de contacto.");
        if (message.length < 10) errors.push("Escribe un mensaje más detallado (mínimo 10 caracteres).");

        if (errors.length) {
            $alert.removeClass("ok").addClass("bad").prop("hidden", false).html(
                `<strong>Revisa lo siguiente:</strong><ul>${errors.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`
            );
            return;
        }

        // Demo: simulación de envío
        $alert.removeClass("bad").addClass("ok").prop("hidden", false).html(
            `<strong>Solicitud enviada.</strong> Gracias, ${escapeHtml(name)}. Te contactaremos pronto por ${escapeHtml(reason)}.`
        );

        this.reset();
    });

    // ===== CRUD Productos (localStorage) =====
    const demoProducts = [
        {
            id: "p_demo_1",
            name: "AndesRider Urban 150",
            category: "Moto",
            price: 1589,
            stock: 4,
            status: "Pocas unidades",
            desc: "Moto urbana 150cc: eficiente, freno de disco delantero, mantenimiento accesible."
        },
        {
            id: "p_demo_2",
            name: "AndesRider Dual 200",
            category: "Moto",
            price: 2290,
            stock: 7,
            status: "Disponible",
            desc: "Doble propósito 200cc para ciudad y ruta, suspensión reforzada y postura cómoda."
        },
        {
            id: "p_demo_3",
            name: "Casco Integral Certificado",
            category: "Accesorio",
            price: 89.99,
            stock: 18,
            status: "Disponible",
            desc: "Casco integral con visor, ventilación y certificación de seguridad (modelo demo)."
        },
        {
            id: "p_demo_4",
            name: "Kit de transmisión (cadena + piñón)",
            category: "Repuesto",
            price: 42.5,
            stock: 12,
            status: "Disponible",
            desc: "Kit compatible para cilindradas 125–200cc, ideal para mantenimiento programado."
        },
        {
            id: "p_demo_5",
            name: "Mantenimiento Preventivo Básico",
            category: "Servicio",
            price: 29.0,
            stock: 999,
            status: "Disponible",
            desc: "Revisión general: aceite, tensiones, frenos, luces y diagnóstico visual."
        }
    ];

    let products = [];

    const loadProducts = () => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            products = [...demoProducts];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
            return;
        }
        try {
            products = JSON.parse(raw) || [];
        } catch {
            products = [...demoProducts];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        }
    };

    const saveProducts = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    };

    const getFilters = () => {
        return {
            q: $("#searchInput").val().trim().toLowerCase(),
            sort: $("#sortSelect").val()
        };
    };

    const applySort = (arr, sortKey) => {
        const copy = [...arr];
        switch (sortKey) {
            case "name-desc":
                copy.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "price-asc":
                copy.sort((a, b) => Number(a.price) - Number(b.price));
                break;
            case "price-desc":
                copy.sort((a, b) => Number(b.price) - Number(a.price));
                break;
            case "stock-desc":
                copy.sort((a, b) => Number(b.stock) - Number(a.stock));
                break;
            case "name-asc":
            default:
                copy.sort((a, b) => a.name.localeCompare(b.name));
        }
        return copy;
    };

    const filteredProducts = () => {
        const { q, sort } = getFilters();
        let list = products;

        if (q) {
            list = list.filter((p) => {
                const hay = `${p.name} ${p.category} ${p.status} ${p.desc}`.toLowerCase();
                return hay.includes(q);
            });
        }

        list = applySort(list, sort);
        return list;
    };

    const renderProducts = () => {
        const list = filteredProducts();
        const $tbody = $("#productsTbody");
        $tbody.empty();

        if (!list.length) {
            $tbody.append(`
        <tr>
          <td colspan="6">
            <span class="muted">No hay productos para mostrar con el filtro actual.</span>
          </td>
        </tr>
      `);
            $("#productsMeta").text("0 productos visibles.");
            return;
        }

        list.forEach((p) => {
            const row = `
        <tr>
          <td>
            <strong>${escapeHtml(p.name)}</strong>
            <span class="sub">${escapeHtml(p.desc)}</span>
          </td>
          <td>${escapeHtml(p.category)}</td>
          <td class="num">${money(p.price)}</td>
          <td class="num">${escapeHtml(p.stock)}</td>
          <td><span class="pill">${escapeHtml(p.status)}</span></td>
          <td class="num">
            <button class="btn btn-ghost btn-sm" data-action="edit" data-id="${escapeHtml(p.id)}">Editar</button>
            <button class="btn btn-ghost btn-sm" data-action="delete" data-id="${escapeHtml(p.id)}">Eliminar</button>
          </td>
        </tr>
      `;
            $tbody.append(row);
        });

        $("#productsMeta").text(`${list.length} producto(s) visibles. Total catálogo: ${products.length}.`);
    };

    // Botones pequeños (reutiliza estilo .btn)
    $("<style>")
        .prop("type", "text/css")
        .html(".btn-sm{ padding:8px 10px; font-size:12px; }")
        .appendTo("head");

    // ===== Modal =====
    const $modal = $("#productModal");
    const openModal = () => {
        $modal.addClass("is-open").attr("aria-hidden", "false");
        $("#productAlert").prop("hidden", true).removeClass("ok bad").empty();
        // enfoque inicial
        setTimeout(() => $("#pName").trigger("focus"), 50);
    };
    const closeModal = () => {
        $modal.removeClass("is-open").attr("aria-hidden", "true");
        $("#productForm")[0].reset();
        $("#productId").val("");
    };

    $("#btnCloseModal, #btnCancelModal").on("click", closeModal);
    $modal.on("click", "[data-close='true']", closeModal);
    $(document).on("keydown", function (e) {
        if (e.key === "Escape" && $modal.hasClass("is-open")) closeModal();
    });

    // ===== Crear / Editar =====
    const fillForm = (p) => {
        $("#productId").val(p.id);
        $("#pName").val(p.name);
        $("#pCategory").val(p.category);
        $("#pStatus").val(p.status);
        $("#pPrice").val(p.price);
        $("#pStock").val(p.stock);
        $("#pDesc").val(p.desc);
    };

    const validateProductForm = () => {
        const name = $("#pName").val().trim();
        const category = $("#pCategory").val();
        const status = $("#pStatus").val();
        const price = Number($("#pPrice").val());
        const stock = Number($("#pStock").val());
        const desc = $("#pDesc").val().trim();

        const errors = [];
        if (name.length < 3) errors.push("Nombre: mínimo 3 caracteres.");
        if (!category) errors.push("Categoría: selecciona una opción.");
        if (!status) errors.push("Estado: selecciona una opción.");
        if (!Number.isFinite(price) || price < 0) errors.push("Precio: valor inválido.");
        if (!Number.isFinite(stock) || stock < 0) errors.push("Stock: valor inválido.");
        if (desc.length < 10) errors.push("Descripción: mínimo 10 caracteres.");

        return { ok: errors.length === 0, errors, data: { name, category, status, price, stock, desc } };
    };

    $("#btnAddProduct").on("click", function () {
        $("#modalTitle").text("Agregar producto");
        $("#btnSaveProduct").text("Guardar");
        $("#productId").val("");
        $("#productForm")[0].reset();
        openModal();
    });

    $("#productsTbody").on("click", "button[data-action]", function () {
        const action = $(this).data("action");
        const id = $(this).data("id");

        const p = products.find(x => x.id === id);
        if (!p) return;

        if (action === "edit") {
            $("#modalTitle").text("Editar producto");
            $("#btnSaveProduct").text("Actualizar");
            fillForm(p);
            openModal();
            return;
        }

        if (action === "delete") {
            const ok = confirm(`¿Eliminar "${p.name}" del catálogo?`);
            if (!ok) return;

            products = products.filter(x => x.id !== id);
            saveProducts();
            renderProducts();
        }
    });

    $("#productForm").on("submit", function (e) {
        e.preventDefault();

        const $alert = $("#productAlert");
        const id = $("#productId").val().trim();
        const check = validateProductForm();

        if (!check.ok) {
            $alert.removeClass("ok").addClass("bad").prop("hidden", false).html(
                `<strong>Revisa:</strong><ul>${check.errors.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`
            );
            return;
        }

        if (!id) {
            // CREATE
            const newP = { id: uid(), ...check.data };
            products.push(newP);
            saveProducts();
            renderProducts();

            $alert.removeClass("bad").addClass("ok").prop("hidden", false).html(
                `<strong>Producto agregado.</strong> "${escapeHtml(newP.name)}" se guardó correctamente.`
            );

            // cerrar tras un momento (demo)
            setTimeout(closeModal, 700);
            return;
        }

        // UPDATE
        const idx = products.findIndex(x => x.id === id);
        if (idx >= 0) {
            products[idx] = { ...products[idx], ...check.data };
            saveProducts();
            renderProducts();

            $alert.removeClass("bad").addClass("ok").prop("hidden", false).html(
                `<strong>Producto actualizado.</strong> Cambios guardados correctamente.`
            );

            setTimeout(closeModal, 700);
        }
    });

    // ===== Filtros =====
    $("#searchInput, #sortSelect").on("input change", renderProducts);

    // ===== Restaurar demo =====
    $("#btnResetDemo").on("click", function () {
        const ok = confirm("¿Restaurar el catálogo demo? Se perderán cambios actuales.");
        if (!ok) return;
        products = [...demoProducts];
        saveProducts();
        $("#searchInput").val("");
        $("#sortSelect").val("name-asc");
        renderProducts();
    });

    // ===== Init =====
    loadProducts();
    renderProducts();
});