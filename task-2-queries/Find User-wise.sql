SELECT u.username, p.product_name, SUM(ci.quantity) AS total_quantity, 
       SUM(ci.quantity * p.price) AS total_item_value
FROM Orders o
JOIN Users u ON o.user_id = u.user_id
JOIN CartItems ci ON o.order_id = ci.order_id
JOIN Products p ON ci.product_id = p.product_id
GROUP BY u.username, p.product_name;
