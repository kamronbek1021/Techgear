// Mahsulotlar ro'yxati (Data)
const products = [
    { id: 1, title: "Aether 34\" Curved Gaming Monitor", category: "monitor", price: 699.99, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80" },
    { id: 2, title: "G502 Hero Wireless Mouse", category: "mouse", price: 99.99, img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80" },
    { id: 3, title: "Aurora X12 Core CPU Processor", category: "cpu", price: 449.99, img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&auto=format&fit=crop&q=80" },
    { id: 4, title: "Soundwave Pro RGB Headset", category: "headset", price: 149.99, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80" },
    { id: 5, title: "Vocalist Studio Stream Mic", category: "mic", price: 129.99, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80" },
    { id: 6, title: "Zenith Ultra-Portable Laptop", category: "laptop", price: 1899.99, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=80" },
    { id: 7, title: "Switchblade Mechanical Keyboard", category: "keyboard", price: 119.99, img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80" },
    { id: 8, title: "HyperVelocity 32GB DDR5 RAM", category: "hardware", price: 159.99, img: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=500&auto=format&fit=crop&q=80" }
];

let cart = [];

// Mahsulotlarni chiqarish
function renderProducts(items) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    items.forEach(product => {
        grid.innerHTML += `
            <div class="product-card">
                <div class="card-img">
                    <img src="${product.img}" alt="${product.title}">
                </div>
                <div>
                    <div class="product-category">${product.category}</div>
                    <div class="product-title">${product.title}</div>
                </div>
                <div class="card-footer">
                    <div class="price">$${product.price.toFixed(2)}</div>
                    <button class="add-cart-btn" onclick="addToCart('${product.title}', ${product.price})">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
    });
}

// Turkum bo'yicha saralash
function filterCategory(category, button) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// Qidiruv funksiyasi
function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.title.toLowerCase().includes(query));
    renderProducts(filtered);
}

// Savatga qo'shish
function addToCart(title, price) {
    cart.push({ title, price });
    document.getElementById('cartCount').innerText = cart.length;
    updateCartModal();
}

// Savat oynasini yangilash
function updateCartModal() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');

    if (cart.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Savat hozircha bo\'sh.</p>';
        totalEl.innerText = '$0.00';
        return;
    }

    container.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.title}</strong>
                    <div style="color: var(--accent-green);">$${item.price.toFixed(2)}</div>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#ff4444; cursor:pointer;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });

    totalEl.innerText = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    document.getElementById('cartCount').innerText = cart.length;
    updateCartModal();
}

// Savat modalini ochish/yopish
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

// Dastlabki yuklash
renderProducts(products);