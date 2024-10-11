SELECT DATE_TRUNC('week', o.created_at) AS week_start, COUNT(o.order_id) AS total_orders
FROM Orders o
WHERE o.created_at >= '2024-01-01' AND o.created_at < '2024-04-01'
GROUP BY week_start
ORDER BY week_start;
