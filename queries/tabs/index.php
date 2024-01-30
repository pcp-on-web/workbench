<?php
echo '[';
$files = scandir('.');
for ($i=2;$i<count($files);$i++) {
	$pos=strpos($files[$i],'.sparql');
	if ($pos>0) $queries[]= substr( $files[$i],0,$pos);
}
for ($i=0;$i<count($queries);$i++) {
	if ($i>0) echo ', ';
	echo '"'.$queries[$i].'"';
}
echo ']';

