let data = {
    product: [],
    orders: []
};

function loadJSON(){
    fetch('Json.json')
    .then(res => res.json())
    .then(fetchedata => {
        data = fetchedata;
        saveData();
        viewProducts();
        viewOrders();
    })
    .catch(err => console.error('Failed to load JSON:', err));
}

function saveData() {
    localStorage.setItem('inventoryData', JSON.stringify(data)); //guardamos en un almacenamiento local bajo la clave inventoryData
}

function loadData() {
    const storedData = localStorage.getItem('inventoryData'); //Carga los datos del almacenamiento local
    if (storedData) {
        data = JSON.parse(storedData);
    }
}

function addProduct() {
    const id = parseInt(document.getElementById('productId').value);
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const quantityInStock = parseInt(document.getElementById('productQuantity').value);
    const supplierId = parseInt(document.getElementById('productSupplierId').value);

    data.products.push({ id, name, category, price, quantityInStock, supplierId });
    saveData();
    viewProducts();
}

function viewProducts() {
    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = '';

    data.products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.price}</td>
        <td>${product.quantityInStock}</td>
        <td>${product.supplierId}</td>
        <td><button onclick="deleteProduct(${product.id})">Eliminar</button></td>
    `;
        tableBody.appendChild(row);
    });
}

function deleteProduct(id) {
    data.products = data.products.filter(p => p.id !== id);
    saveData();
    viewProducts();
}

function addOrder() {
    const orderId = parseInt(document.getElementById('orderId').value);
    const productId = parseInt(document.getElementById('orderProductId').value);
    const quantity = parseInt(document.getElementById('orderQuantity').value);
    const orderDate = document.getElementById('orderDate').value;
    const status = document.getElementById('orderStatus').value;

    const product = data.products.find(p => p.id === productId);
    if (product && product.quantityInStock >= quantity) {
        data.orders.push({ orderId, productId, quantity, orderDate, status });
        product.quantityInStock -= quantity;
        saveData();
        viewOrders();
    } else {
        alert('Insufficient stock or product not found');
    }
}

function viewOrders() {
    const tableBody = document.querySelector('#orderTable tbody');
    tableBody.innerHTML = '';

    data.orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${order.orderId}</td>
        <td>${order.productId}</td>
        <td>${order.quantity}</td>
        <td>${order.orderDate}</td>
        <td>${order.status}</td>
        <td><button onclick="deleteOrder(${order.orderId})">Eliminar</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteOrder(orderId) {
    data.orders = data.orders.filter(o => o.orderId !== orderId);
    saveData();
    viewOrders();
}

function generateSalesReport() {
    const startDate = document.getElementById('reportStartDate').value;
    const endDate = document.getElementById('reportEndDate').value;

    const ordersInRange = data.orders.filter(o => o.orderDate >= startDate && o.orderDate <= endDate);
    const totalRevenue = ordersInRange.reduce((acc, o) => {
        const product = data.products.find(p => p.id === o.productId);
        return acc + (product ? product.price * o.quantity : 0);
    }, 0);

    const salesByProduct = ordersInRange.reduce((acc, o) => {
        const product = data.products.find(p => p.id === o.productId);
        if (product) {
            acc[product.name] = (acc[product.name] || 0) + o.quantity;
        }
        return acc;
    }, {});

    const report = {
        totalOrders: ordersInRange.length,
        totalRevenue,
        salesByProduct
    };

    document.getElementById('salesReport').textContent = JSON.stringify(report, null, 2);
}

loadData();
viewProducts();
viewOrders();
console.log("Creado por Miguel Guerrero C.C 1090381839")