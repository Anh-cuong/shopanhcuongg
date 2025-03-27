document.addEventListener("DOMContentLoaded", function () {
    let cart = []; // Mảng lưu danh sách sản phẩm trong giỏ hàng

    // Hàm thêm sản phẩm vào giỏ hàng
    window.addToCart = function (name, price) {
        let product = cart.find(item => item.name === name);
        if (product) {
            product.quantity += 1; // Nếu sản phẩm đã có trong giỏ, tăng số lượng
        } else {
            cart.push({ name, price, quantity: 1 }); // Nếu chưa có, thêm vào giỏ
        }
        updateCart();
    };

    // Hàm cập nhật giỏ hàng
    function updateCart() {
        let cartItems = document.getElementById("cart-items");
        let totalPrice = document.getElementById("total-price");
        cartItems.innerHTML = ""; // Xóa danh sách cũ
        let total = 0;

        cart.forEach((item, index) => {
            let li = document.createElement("li");
            li.classList.add("list-group-item");
            li.innerHTML = `${item.name} - ${item.quantity} x ${item.price.toLocaleString()} VND 
                <button class="btn btn-danger btn-sm float-end" onclick="removeFromCart(${index})">Xóa</button>`;
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });

        totalPrice.textContent = total.toLocaleString();
    }

    // Hàm xóa sản phẩm khỏi giỏ hàng
    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        updateCart();
    };

    // Hàm xử lý thanh toán
    window.checkout = function () {
        if (cart.length === 0) {
            alert("Giỏ hàng của bạn đang trống!");
            return;
        }
        alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
        cart = []; // Xóa giỏ hàng sau khi thanh toán
        updateCart();
    };
});
