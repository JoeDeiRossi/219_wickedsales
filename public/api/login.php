
<?php
    require_once('functions.php');
    set_exception_handler('handleError');
    require_once('config.php');
    require_once('mysqlconnect.php');

    $output = [
        'success' => false
    ];

    $jsonInput = file_get_contents("php://input");

    $input = json_decode($jsonInput, true);

    if (empty($input['email'])) {
        throw new Exception('email is a required value');
    }

    if (empty($input['password'])) {
        throw new Exception('password is a required value');
    }
    
    $email = $input['email'];
    // $email = addslashes($email);
    $password = $input['password'];
    $hashedPassword = sha1($password);

    unset($input['password']);
    
    $query = "SELECT `id`, `name` FROM `users`
        WHERE `email` = ?
        AND `password` = ?";

    //1. send the safe query to the db
    $statement = mysqli_prepare($conn, $query);

    //2. send the dangerous data to the db
    mysqli_stmt_bind_param($statement, 'ss', $email, $hashedPassword);

    //3. tell the db to mix the query and the data
    mysqli_stmt_execute($statement);

    //4. get the result pointer for the prepared query statement's data
    $result = mysqli_stmt_get_result($statement);

    //not needed anymore because of prepared statement above
    // $result = mysqli_query($conn, $query);

    if (!$result) {
        throw new Exception(mysqli_error($conn));
    }

    if (mysqli_num_rows($result) !== 1) {
        throw new Exception('Invalid username or password');
    }

    $data = mysqli_fetch_assoc($result);

    $token = $email . $data['id'] . microtime();
    $token = sha1($token);

    $connectQuery = "INSERT INTO `user_connections`
        SET `token` ='$token',
        `users_id` = {$data['id']},
        `created` = NOW(),
        `ip_address` = '{$_SERVER['REMOTE_ADDR']}'";

    $connectResult = mysqli_query($conn, $connectQuery);

    if (!$connectResult) {
        throw new Exception(mysqli_error($conn));
    }

    if (mysqli_affected_rows($conn) !== 1) {
        throw new Exception('Could not log in: connection not saved');
    }

    $_SESSION['user_data'] = [
        'id' => $data['id'],
        'username' => $data['name'],
        'token' => $token
    ];
    
    $output['success'] = true;
    $output['username'] = $data['name'];
    $output['token'] = $token;

    $jsonOutput = json_encode($output);

    print($jsonOutput);
?>
