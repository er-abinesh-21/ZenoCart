-- Additional products for ZenoCart database
-- Run these INSERT statements in your Supabase SQL editor to add more products

-- Electronics Category
INSERT INTO products (name, description, category, price, rating, image_url) VALUES
('Sony WH-1000XM5 Headphones', 'Industry-leading noise canceling with Auto NC Optimizer, exceptional sound quality engineered to perfection with the new Integrated Processor V1', 'Electronics', 349.99, 4.8, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'),
('Apple AirPods Pro 2', 'Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio with dynamic head tracking', 'Electronics', 249.99, 4.7, 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&h=500&fit=crop'),
('Samsung Galaxy Buds2 Pro', 'True wireless earbuds with intelligent ANC, 360 Audio, and IPX7 water resistance', 'Electronics', 229.99, 4.5, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop'),
('Bose QuietComfort 45', 'Wireless Bluetooth noise cancelling headphones with up to 24 hours battery life', 'Electronics', 329.99, 4.6, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop'),
('JBL Flip 6 Speaker', 'Portable waterproof speaker with powerful JBL Original Pro Sound and 12 hours of playtime', 'Electronics', 129.99, 4.4, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop'),
('Anker PowerCore 26800', 'High-capacity portable charger with triple USB output and double-speed recharging', 'Electronics', 65.99, 4.6, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop'),
('Logitech MX Master 3S', 'Advanced wireless mouse with ultra-fast scrolling and ergonomic design', 'Electronics', 99.99, 4.7, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop'),
('iPad Air 5th Gen', 'Powerful M1 chip, 10.9-inch Liquid Retina display, supports Apple Pencil and Magic Keyboard', 'Electronics', 599.99, 4.8, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop'),
('Kindle Paperwhite', 'Waterproof e-reader with 6.8" display, adjustable warm light, and weeks of battery life', 'Electronics', 139.99, 4.5, 'https://images.unsplash.com/photo-1598618443855-232ee0f819f6?w=500&h=500&fit=crop'),
('Ring Video Doorbell 4', 'Smart doorbell with improved video previews, enhanced wifi, and quick replies', 'Electronics', 199.99, 4.3, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop');

-- Accessories Category
INSERT INTO products (name, description, category, price, rating, image_url) VALUES
('MagSafe Wireless Charger', 'Fast wireless charging up to 15W for iPhone, perfectly aligned magnets attach to your iPhone', 'Accessories', 39.99, 4.4, 'https://images.unsplash.com/photo-1591290619762-2b953ee813ce?w=500&h=500&fit=crop'),
('Apple Watch Series 9', 'Advanced health features, powerful fitness partner, and seamless connectivity', 'Accessories', 399.99, 4.7, 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=500&fit=crop'),
('Samsung Galaxy Watch 6', 'Advanced sleep coaching, personalized heart rate zones, and body composition analysis', 'Accessories', 349.99, 4.5, 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop'),
('Fitbit Charge 6', 'Fitness tracker with built-in GPS, heart rate monitoring, and 7-day battery life', 'Accessories', 159.99, 4.3, 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=500&h=500&fit=crop'),
('Ray-Ban Smart Glasses', 'Capture photos and videos, listen to music, and take calls hands-free', 'Accessories', 299.99, 4.2, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop'),
('Leather iPhone Wallet', 'Premium leather wallet with MagSafe, holds up to three cards with shielding to protect from demagnetization', 'Accessories', 59.99, 4.4, 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop'),
('AirTag 4 Pack', 'Keep track of your keys, wallet, luggage, and more with precision finding', 'Accessories', 99.99, 4.5, 'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=500&h=500&fit=crop'),
('Belkin 3-in-1 Charger', 'Wireless charging station for iPhone, Apple Watch, and AirPods simultaneously', 'Accessories', 149.99, 4.6, 'https://images.unsplash.com/photo-1586253634026-8cb574908d1e?w=500&h=500&fit=crop'),
('Peak Design Phone Mount', 'Universal bike and car mount with magnetic locking and instant attachment', 'Accessories', 79.99, 4.5, 'https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=500&h=500&fit=crop'),
('Moment Phone Lens Kit', 'Professional photography lenses for smartphones including wide, tele, and macro', 'Accessories', 119.99, 4.4, 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=500&h=500&fit=crop');

-- Furniture Category
INSERT INTO products (name, description, category, price, rating, image_url) VALUES
('Herman Miller Aeron Chair', 'Iconic ergonomic office chair with advanced PostureFit SL back support and 8Z Pellicle suspension', 'Furniture', 1395.00, 4.8, 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=500&fit=crop'),
('Standing Desk Converter', 'Height adjustable desk riser with keyboard tray, transforms any desk into standing workstation', 'Furniture', 299.99, 4.5, 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=500&h=500&fit=crop'),
('Steelcase Leap Chair', 'Ergonomic task chair with LiveBack technology that changes shape to mimic spine movement', 'Furniture', 1006.00, 4.7, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop'),
('IKEA Bekant Desk', 'Height adjustable desk with electric motor, spacious work surface and cable management', 'Furniture', 579.00, 4.3, 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&h=500&fit=crop'),
('Autonomous ErgoChair Pro', 'Ergonomic office chair with adjustable lumbar support, headrest, and armrests', 'Furniture', 499.00, 4.4, 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=500&h=500&fit=crop'),
('West Elm Bookshelf', 'Mid-century modern bookshelf in solid wood with adjustable shelves', 'Furniture', 699.00, 4.5, 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500&h=500&fit=crop'),
('CB2 Storage Ottoman', 'Velvet upholstered ottoman with hidden storage compartment and brass legs', 'Furniture', 399.00, 4.3, 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=500&fit=crop'),
('Article Sven Sofa', 'Scandinavian design 3-seater sofa in charme tan leather with walnut legs', 'Furniture', 1799.00, 4.6, 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=500&h=500&fit=crop'),
('Humanscale Monitor Arm', 'Adjustable monitor mount with dynamic counterbalance for effortless positioning', 'Furniture', 395.00, 4.7, 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=500&h=500&fit=crop'),
('Muji Storage Unit', 'Minimalist modular storage system in oak wood with stackable compartments', 'Furniture', 289.00, 4.4, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop');

-- Lifestyle Category
INSERT INTO products (name, description, category, price, rating, image_url) VALUES
('Hydro Flask 32oz', 'Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours', 'Lifestyle', 44.95, 4.6, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop'),
('YETI Rambler Tumbler', 'Stainless steel tumbler with double-wall vacuum insulation and MagSlider lid', 'Lifestyle', 35.00, 4.7, 'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=500&h=500&fit=crop'),
('Lululemon Yoga Mat', 'Premium reversible yoga mat with natural rubber base and moisture-wicking top layer', 'Lifestyle', 128.00, 4.5, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop'),
('Theragun Mini', 'Portable percussive therapy device for on-the-go muscle treatment', 'Lifestyle', 199.00, 4.4, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop'),
('Nespresso Vertuo Plus', 'Coffee and espresso machine with one-touch brewing and automatic capsule recognition', 'Lifestyle', 189.00, 4.5, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&h=500&fit=crop'),
('Vitamix Blender', 'Professional-grade blender with variable speed control and self-cleaning', 'Lifestyle', 449.95, 4.8, 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&h=500&fit=crop'),
('Instant Pot Duo', 'Multi-use pressure cooker with 7 appliances in 1: pressure cooker, slow cooker, rice cooker, and more', 'Lifestyle', 89.95, 4.6, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop'),
('Patagonia Backpack', 'Sustainable 28L backpack made from recycled materials with laptop compartment', 'Lifestyle', 149.00, 4.5, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop'),
('Moleskine Smart Notebook', 'Digital notebook that transfers handwritten notes to your devices in real-time', 'Lifestyle', 199.00, 4.3, 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&h=500&fit=crop'),
('Philips Hue Starter Kit', 'Smart lighting system with color-changing bulbs and voice control compatibility', 'Lifestyle', 199.99, 4.4, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop');

-- Home & Garden Category (Additional)
INSERT INTO products (name, description, category, price, rating, image_url) VALUES
('Dyson V15 Detect', 'Cordless vacuum with laser dust detection and up to 60 minutes runtime', 'Home & Garden', 749.99, 4.7, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop'),
('Roomba j7+', 'Self-emptying robot vacuum with obstacle avoidance and smart mapping', 'Home & Garden', 799.99, 4.5, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop'),
('Nest Learning Thermostat', 'Smart thermostat that learns your schedule and saves energy automatically', 'Home & Garden', 249.99, 4.6, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop'),
('Air Purifier Pro', 'HEPA air purifier for large rooms with real-time air quality monitoring', 'Home & Garden', 599.99, 4.5, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop'),
('Smart Garden 9', 'Indoor garden with LED grow lights for year-round herbs and vegetables', 'Home & Garden', 199.95, 4.4, 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=500&fit=crop');
