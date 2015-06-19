<?php
mysql_connect('localhost','root','');
mysql_select_db('comment');

$errors         = array();      // array to hold validation errors
$data             = array();         // array to pass back data

$shuju = file_get_contents('php://input', true);
$shuju = explode(',', $shuju);
// $shuju = json_encode($shuju);
// echo($shuju['name']);

foreach ($shuju as $key => $value) {
	$a = explode(':', $value)[1];
	$v[$key] = str_replace('"', '', $a);
}

if (empty($v[0]))
    $errors['username'] = 'Name is required.';

if (empty($v[1]))
    $errors['email'] = 'email is required.';

if (empty($v[2]))
    $errors['content'] = 'content is required.';

$sql = "INSERT INTO liuyan(name, email, content, cid, time, headimg) VALUES('".htmlspecialchars($v[0])."', '".htmlspecialchars($v[1])."', '".htmlspecialchars($v[2])."', '".htmlspecialchars($v[3])."', '".htmlspecialchars($v[4])."', '".htmlspecialchars($v[5])."')";
$result = mysql_query($sql);
if( !$result )
	$errors['sql'] = '插入数据库失败';

if ( ! empty($errors)) {
    $data['success'] = false;
    $data['errors']  = $errors;
} else {
    $data['success'] = true;
    $data['message'] = '提交成功!';
}

echo json_encode($data);

?>