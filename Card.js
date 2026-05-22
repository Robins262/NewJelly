const listaproductos = [
    {
        id: 1,
        nombre: "Gelatina Tropical",
        descripcion: "Dulce celeste.",
        image: "https://scontent.flim23-1.fna.fbcdn.net/v/t1.6435-9/107376866_2938645462913819_5921215384822232475_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=l3Cb3NMYovsQ7kNvwE0T_2S&_nc_oc=AdqUkpPCmb1QGea9ugh4AAXC4VLt6mOsBEoCByp6xGJvAEr8wu2fLW7WGq7Ji5pBuTZHSqKUmXBsS5mIAt75Zx1p&_nc_zt=23&_nc_ht=scontent.flim23-1.fna&_nc_gid=pYLDvfj9xaJZaQtRCJzbxg&_nc_ss=7b289&oh=00_Af76vpzAOa6ZMdMMHr8AdXncLQjpUw_fbjuILy0UWUCrVg&oe=6A371ECC",
        categoria: "Dulce",
        precio: 60.00,
        descuento: 90.00,
        botton: "Agregar"
    },
    {
        id: 2,
        nombre: "Gelatina frutal",
        descripcion: "Dulce frutal con sabores dulces y citricos",
        image: "https://i.pinimg.com/236x/0c/89/2e/0c892e6f088eba1f1eceed78fc2ec5f3.jpg",
        categoria: "Dulce",
        precio: 60.00,
        descuento: 90.00,
        botton: "Agregar"
    },
    {
        id: 3,
        nombre: "Gelatina Floral",
        descripcion: "Dulce floral, con sabores dulces y cremosos.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAf8IZqTXVt9SGTHdcid3jM5N5xrCWRtPsVA&s",
        categoria: "Dulce",
        precio: 75.00,
        descuento: 100.00,
        botton: "Agregar"
    },
    {
        id: 4,
        nombre: "Gelatina Frutos rojos ",
        descripcion: "Set completo color rosa con corsé, falda de tul, ligueros y medias. Incluye collar y mangas desmontables.",
        image: "https://img.delicious.com.au/w3UNaaq8/w1200/del/2024/01/summer-berry-jelly-205276-1.jpg",
        categoria: "Dulce",
        precio: 80.00,
        descuento: 90.00,
        botton: "Agregar"
    },
    {
        id: 5,
        nombre: "Gelatina Nube",
        descripcion: "Set completo color rosa con corsé, falda de tul, ligueros y medias. Incluye collar y mangas desmontables.",
        image: "https://cdn.greatlifepublishing.net/wp-content/uploads/sites/2/2022/07/21063910/cloud-01.jpg",
        categoria: "CREMOSO",
        precio: 60.00,
        descuento: 90.00,
        botton: "Agregar"
    },
    
];

let productitem = document.getElementById("productos");
listaproductos.forEach((product) => {
    productitem.innerHTML += `
         <div class="product-card" data-category="Princesa">
                <span class="product-tag tag-bestseller">Más Vendido</span>
                <img src="${product.image}" alt="Set Princesa Rosa" class="product-image">
                <div class="product-info">
                    <div class="product-category">${product.categoria}</div>
                    <h3 class="product-name">${product.nombre}</h3>
                    <p class="product-description">${product.descripcion}</p>
                    <div class="product-footer">
                        <div class="product-price">S/ ${product.precio}<span>S/ ${product.descuento}</span></div>
                        <button class="add-to-cart" onclick="addToCart(${product.id}, '${product.nombre}', ${product.precio}, '${product.image}')">
                            <i class="fas fa-cart-plus"></i>
                            ${product.botton}
                        </button>
                    </div>
                </div>
        </div>
    `;
});
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
            document.getElementById('modalText').textContent = text;
            document.getElementById('modal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('modal').classList.remove('active');
        }

        // ===== CONFETTI =====
        function createConfetti() {
            const container = document.getElementById('confettiContainer');
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

        // ===== FILTROS =====
        function filterProducts(category) {
            const cards = document.querySelectorAll('.product-card');
            const buttons = document.querySelectorAll('.filter-btn');

            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            cards.forEach((card, index) => {
                if (category === 'todos' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s both`;
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // ===== CHECKOUT =====
        function checkout() {
            if (cart.length === 0) {
                showModal('Tu carrito está vacío. Agrega productos primero.');
                return;
            }

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            let message = '¡Hola! Quiero comprar los siguientes productos de Lencería Princess:%0A%0A';

            cart.forEach(item => {
                message += `• ${item.name} - S/ ${item.price} x ${item.quantity}%0A`;
            });

            message += `%0ATotal: S/ ${total.toFixed(2)}%0A%0A¡Gracias! ✨`;

            window.open(`https://wa.me/51910158797?text=${message}`, '_blank');
        }

        // ===== SCROLL ANIMATIONS =====
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.product-card').forEach(card => {
            observer.observe(card);
        });

        // ===== CERRAR MODAL AL HACER CLICK FUERA =====
        document.getElementById('modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });