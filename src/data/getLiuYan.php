<?php

mysql_connect('localhost','root','');
mysql_select_db('comment');

$sql = 'SELECT id,cid,name,email,content,time,headimg from liuyan order by time desc';
$result = mysql_query($sql);
$i = 0;
while( $row = mysql_fetch_array($result) ){
	$data[$i]['id'] = $row['id']; 
	$data[$i]['cid'] = $row['cid']; 
	$data[$i]['name'] = $row['name']; 
	$data[$i]['email'] = $row['email']; 
	$data[$i]['content'] = $row['content']; 
	$data[$i]['time'] = $row['time']; 
	$data[$i]['headimg'] = $row['headimg']; 
	$i = $i + 1;
}

echo json_encode($data);
?>