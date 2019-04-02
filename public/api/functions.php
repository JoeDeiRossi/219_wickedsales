
<?php
    if(!function_exists('handleError')) {
        function handleError($error) {
            $output = [
                'success'=>false,
                'error'=>$error->getMessage()
            ];
            $jsonOutput = json_encode($output);
            print($jsonOutput);
        }
    }
?>
