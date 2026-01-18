-- Insertar Categorías (IDs fijos)
INSERT OR IGNORE INTO categories (id, name, description) VALUES (1, 'Motos', 'Motocicletas urbanas y todo terreno');
INSERT OR IGNORE INTO categories (id, name, description) VALUES (2, 'Accesorios', 'Cascos, guantes y protección');
INSERT OR IGNORE INTO categories (id, name, description) VALUES (3, 'Repuestos', 'Partes mecánicas y mantenimiento');
INSERT OR IGNORE INTO categories (id, name, description) VALUES (4, 'Servicios', 'Mano de obra y taller');

-- PRODUCTOS DE PRUEBA (Catálogo Extendido)

-- 1. Motos
INSERT OR IGNORE INTO products (id, name, category_id, status, price, stock, desc) 
VALUES (1, 'AndesRider Urban 150', 1, 'Pocas unidades', 1589.00, 4, 'Moto urbana 150cc: eficiente, freno de disco delantero, ideal para delivery y transporte diario.');

INSERT OR IGNORE INTO products (id, name, category_id, status, price, stock, desc) 
VALUES (2, 'AndesRider Dual 200', 1, 'Disponible', 2290.00, 7, 'Doble propósito 200cc: suspensión reforzada, llantas de tacos y postura cómoda para viajes largos.');

INSERT OR IGNORE INTO products (id, name, category_id, status, price, stock, desc) 
VALUES (3, 'AndesRider Sport 250', 1, 'Agotado', 2850.00, 0, 'Deportiva 250cc con refrigeración líquida, 6 velocidades y diseño aerodinámico.');

INSERT OR IGNORE INTO products (id, name, category_id, status, price, stock, desc) 
VALUES (4, 'AndesRider Cargo 125', 1, 'Disponible', 1350.00, 12, 'La guerrera del trabajo. Parrilla de carga reforzada, bajo consumo y mantenimiento súper económico.');

-- 2. Accesorios
INSERT OR IGNORE INTO products (id, name, category_id, status, price, stock, desc) 
VALUES (5, 'Casco Integral Certificado', 2, 'Disponible', 89.99, 18, 'Casco integral con certificación DOT, visor oscuro anti-rayaduras y ventilación superior.');

INSERT OR IGNORE INTO products (id, name, category_id, status, price, stock, desc) 
VALUES (6, 'Guantes con Protecciones', 2, 'Disponible', 25.50, 30, 'Guantes textiles con protección en nudillos y palma antideslizante. Tallas M, L, XL.');

INSERT OR IGNORE INTO products (id, name, category_id, status, price, stock, desc) 
VALUES (7, 'Impermeable Completo', 2, 'Pocas unidades', 35.00, 5, 'Traje de lluvia de dos piezas (chaqueta y pantalón) con bandas reflectivas de alta visibilidad.');

INSERT OR IGNORE INTO products (id, name, category_id, status, price, stock, desc) 
VALUES (8, 'Soporte Celular con Cargador', 2, 'Disponible', 15.00, 50, 'Soporte metálico para manubrio con puerto USB integrado para cargar tu dispositivo mientras viajas.');

-- 3. Repuestos
INSERT OR IGNORE INTO products (id, name, category_id, status, price, stock, desc) 
VALUES (9, 'Kit de Arrastre (Cadena/Piñón)', 3, 'Disponible', 42.50, 12, 'Kit compatible 125-200cc. Cadena reforzada 428H, piñón y catalina de acero templado.');

INSERT OR IGNORE INTO products (id, name, category_id, status, price, stock, desc) 
VALUES (10, 'Aceite Sintético 4T 10W-40', 3, 'Disponible', 12.00, 100, 'Lubricante premium para motores de 4 tiempos. Mejora el rendimiento y protege el motor.');

INSERT OR IGNORE INTO products (id, name, category_id, status, price, stock, desc) 
VALUES (11, 'Bujía Iridium', 3, 'Disponible', 8.50, 40, 'Bujía de alto rendimiento, mejora el arranque en frío y la eficiencia de combustible.');

INSERT OR IGNORE INTO products (id, name, category_id, status, price, stock, desc) 
VALUES (12, 'Pastillas de Freno Delanteras', 3, 'Disponible', 7.50, 25, 'Juego de pastillas cerámicas de larga duración, compatibles con modelos Urban y Dual.');

-- 4. Servicios
INSERT OR IGNORE INTO products (id, name, category_id, status, price, stock, desc) 
VALUES (13, 'Mantenimiento Preventivo Básico', 4, 'Disponible', 29.00, 999, 'Cambio de aceite, ajuste de cadena, revisión de frenos, luces y presión de llantas.');

INSERT OR IGNORE INTO products (id, name, category_id, status, price, stock, desc) 
VALUES (14, 'ABC de Motor Completo', 4, 'Disponible', 55.00, 999, 'Limpieza de carburador/inyección, calibración de válvulas, bujía, filtros y revisión eléctrica.');

INSERT OR IGNORE INTO products (id, name, category_id, status, price, stock, desc) 
VALUES (15, 'Instalación de Alarma/GPS', 4, 'Disponible', 20.00, 999, 'Servicio de instalación profesional. No incluye el dispositivo (se vende por separado).');