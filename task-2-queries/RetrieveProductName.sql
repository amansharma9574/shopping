SELECT p.product_name, COUNT(o.order_id) AS total_orders
FROM Orders o
JOIN CartItems ci ON o.order_id = ci.order_id
JOIN Products p ON ci.product_id = p.product_id
GROUP BY p.product_name
HAVING COUNT(o.order_id) >= 5;
