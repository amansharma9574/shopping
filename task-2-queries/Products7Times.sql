SELECT p.product_name, COUNT(ci.order_id) AS total_sales
FROM Products p
LEFT JOIN CartItems ci ON p.product_id = ci.product_id
LEFT JOIN Orders o ON ci.order_id = o.order_id
AND o.created_at >= '2024-01-01' AND o.created_at < '2024-04-01'
GROUP BY p.product_name
HAVING COUNT(ci.order_id) > 7 OR COUNT(ci.order_id) = 0;
