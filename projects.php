<?PHP

	$jsonp = $_GET['callback']?$_GET['callback']:false;
	
	$c = curl_init(); 
	curl_setopt($c, CURLOPT_URL, "http://source.mozillaopennews.org/en-US/code/json/"); 
	curl_setopt($c, CURLOPT_HEADER, 0); 
	curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
	$json = curl_exec($c); 
	
	if($jsonp)
		echo($jsonp.'('.$json.');');
	else
		echo($json);
?>