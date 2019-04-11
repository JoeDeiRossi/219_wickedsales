
<?php
    require_once('functions.php');
    set_exception_handler('handleError');
    require_once('config.php');
    require_once('mysqlconnect.php');

    $output = [
        'success' => false
    ];

    if (empty($_SESSION['cart_id'])) {
        throw new Exception('Missing cart id');
    }

    $user_id = 1;
    $cart_id = $_SESSION['cart_id'];

    //my query:
    // $cartQuery = "SELECT `products`.`id`, `name`, `price`, `quantity` FROM `products`
    //             JOIN `cart_items` ON `products`.`id` = `products_id`
    //             WHERE `carts_id` = $cart_id";
    
    //from class (add backticks!):
    $cartQuery = "SELECT c.`created`, c.`total_price`, ci.`quantity`, p.`id`, p.`name`, p.`price`,
                        (SELECT url FROM `images` WHERE `products_id` = p.`id` LIMIT 1) AS image
                        FROM `carts` AS c
                        JOIN `cart_items` AS ci ON ci.`carts_id` = c.`id`
                        JOIN `products` AS p ON ci.`products_id` = p.`id`
                        WHERE c.`id` = $cart_id AND c.`users_id` = $user_id";

    $cartData = mysqli_query($conn, $cartQuery);

    if (!$cartData) {
        throw new Exception(mysqli_error($conn));
    }

    if (mysqli_num_rows($cartData) === 0) {
        throw new Exception('Unable to retrieve cart data');
    }

    $output['cartItems'] = [];
    $output['cartMetaData'] = [];

    while ($row = mysqli_fetch_assoc($cartData)) {
        $output['cartItems'][] = [
            'name' => $row['name'],
            'price' => (int)$row['price'],
            'image' => $row['image'],
            'quantity' => (int)$row['quantity'],
            'id' => (int)$row['id']
        ];

        $output['cartMetaData']['created'] = $row['created'];
        $output['cartMetaData']['total'] = (int)$row['total_price'];
    }

    $output['success'] = true;

    print(json_encode($output));
?>
