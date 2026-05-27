// 1. TU LISTA ORIGINAL (Queda como respaldo automático por si el archivo JSON está vacío o da error)
const listaproductosRespaldo = [
    {
        id: 1,
        nombre: "Gelatina Tropical",
        descripcion: "Dulce celeste.",
        image: "https://fbcdn.net",
        categoria: "Dulce",
        precio: 60.00,
        descuento: 90.00,
        botton: "Agregar"
    },
    {
        id: 2,
        nombre: "Gelatina frutal",
        descripcion: "Dulce frutal con sabores dulces y citricos",
        image: "https://pinimg.com",
        categoria: "Dulce",
        precio: 60.00,
        descuento: 90.00,
        botton: "Agregar"
    },
    {
        id: 3,
        nombre: "Gelatina Floral",
        descripcion: "Dulce floral, con sabores dulces y cremosos.",
        image: "https://gstatic.com",
        categoria: "Dulce",
        precio: 75.00,
        descuento: 100.00,
        botton: "Agregar"
    },
    {
        id: 4,
        nombre: "Gelatina Frutos rojos ",
        descripcion: "Dulce gelatina con toques citricos.",
        image: "https://delicious.com.au",
        categoria: "Dulce",
        precio: 80.00,
        descuento: 90.00,
        botton: "Agregar"
    },
    {
        id: 5,
        nombre: "Gelatina Nube",
        descripcion: "Dulce con toques cremosos.",
        image: "https://greatlifepublishing.net",
        categoria: "CREMOSO",
        precio: 60.00,
        descuento: 90.00,
        botton: "Agregar"
    }
];

// 2. FUNCIÓN CON TU DISEÑO EXACTO DE TARJETA HTML
function renderizarProductos(listaParaPintar) {
    let productitem = document.getElementById("productos");
    if (!productitem) return;

    productitem.innerHTML = ""; // Limpiamos la pantalla antes de dibujar

    listaParaPintar.forEach((product) => {
        // 1. Obtener la ruta de la imagen (del CMS o de tu lista vieja)
        let urlImagen = product.imagen || product.image || "";
        const textoBoton = product.botton || "Agregar";

        // CORRECCIÓN CLAVE: Si la ruta empieza con "/", se la quitamos para que GitHub Pages no se confunda
        if (urlImagen.startsWith("/")) {
            urlImagen = urlImagen.substring(1); 
        }

        productitem.innerHTML += `
             <div class="product-card" data-category="${product.categoria}">
                    <span class="product-tag tag-bestseller">Más Vendido</span>
                    <img src="${urlImagen}" alt="${product.nombre}" class="product-image" onerror="this.src='https://placehold.co'">
                    <div class="product-info">
                        <div class="product-category">${product.categoria}</div>
                        <h3 class="product-name">${product.nombre}</h3>
                        <p class="product-description">${product.descripcion}</p>
                        <div class="product-footer">
                            <div class="product-price">S/ ${parseFloat(product.precio).toFixed(2)}<span>S/ ${parseFloat(product.descuento).toFixed(2)}</span></div>
                            <button class="add-to-cart" onclick="addToCart(${product.id}, '${product.nombre}', ${product.precio}, '${urlImagen}')">
                                <i class="fas fa-cart-plus"></i>
                                ${textoBoton}
                            </button>
                        </div>
                    </div>
            </div>
        `;
    });
}

// 3. CONSULTA INTELIGENTE AL ARCHIVO DE PAGES CMS
// 3. CONSULTA OPTIMIZADA AL ARCHIVO DE LA INTERFAZ
// 3. CONSULTA AL ARCHIVO DE LA INTERFAZ
fetch('productos.json')
  .then(response => {
      if (!response.ok) throw new Error('Cargando lista de respaldo...');
      return response.json();
  })
  .then(data => {
      // Leer los datos del CMS de forma segura sin importar el formato
      let listaCms = Array.isArray(data) ? data : (data.productos_lista || []);

      if (listaCms.length === 0) {
          renderizarProductos(listaproductosRespaldo);
      } else {
          // Fusionar tus 5 gelatinas fijas con las nuevas añadidas desde la interfaz web
          const todasLasGelatinas = [...listaproductosRespaldo, ...listaCms];
          renderizarProductos(todasLasGelatinas);
      }
  })
  .catch(error => {
      console.log("Aviso:", error.message);
      renderizarProductos(listaproductosRespaldo);
  });


// 4. LÓGICA DE TU CARRITO DE COMPRAS (Mantenida intacta)
let cart = [];

function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    updateCart();
    showModal(`¡${name} agregado al carrito!`);
    createConfetti();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartItems || !cartCount || !cartTotal) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalItems;
    cartTotal.textContent = `S/ ${totalPrice.toFixed(2)}`;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-bag"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">S/ ${item.price} x ${item.quantity}</div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
}

// ===== MODAL =====
function showModal(text) {
    const modalText = document.getElementById('modalText');
    const modal = document.getElementById('modal');
    if (modalText && modal) {
        modalText.textContent = text;
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.classList.remove('active');
}

// ===== CONFETTI =====
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;
    const colors = ['#ff6b9d', '#c44569', '#f8b500', '#ff6b6b', '#5f27cd', '#00d2d3'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

// ===== FILTROS CORREGIDOS =====
function filterProducts(category) {
    const cards = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    }

    cards.forEach((card, index) => {
        // Comparamos ignorando mayúsculas y minúsculas para evitar fallas entre "Dulce" y "DULCE"
        const cardCategory = card.dataset.category ? card.dataset.category.toLowerCase() : "";
        const targetCategory = category.toLowerCase();

        if (targetCategory === 'todos' || cardCategory === targetCategory) {
            card.style.display = 'block';
            card.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s both`;
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== CHECKOUT WHATSAPP =====
function checkout() {
    if (cart.length === 0) {
        showModal('Tu carrito está vacío. Agrega productos primero.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let message = '¡Hola! Quiero comprar las siguientes Gelatinas Artísticas:%0A%0A';

    cart.forEach(item => {
        message += `• ${item.name} - S/ ${item.price} x ${item.quantity}%0A`;
    });

    message += `%0ATotal: S/ ${total.toFixed(2)}%0A%0A¡Gracias! ✨`;

    window.open(`https://wa.me{message}`, '_blank');
}
