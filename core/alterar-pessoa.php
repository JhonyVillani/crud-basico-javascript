<?php
	/* prepara o documento para comunicação com o JSON, as duas linhas a seguir são obrigatórias 
	  para que o PHP saiba que irá se comunicar com o JSON, elas sempre devem estar no ínicio da página */
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=utf-8");

    include("dados-conexao.php");

	try {
		$conecta = new PDO("mysql:host=$servidor;dbname=$banco", $usuario , $senha);
		$conecta->exec("set names utf8"); // Permite caracteres latinos.
		// $consulta = $conecta->prepare('SELECT * FROM tb01_formacao');	
		$consulta = $conecta->prepare("SELECT * FROM tb01_formacao WHERE pessoa_id = '$_GET[pessoa_id]';");		
        $consulta->execute(array());  
		$resultadoDaConsulta = $consulta->fetchAll();
    
		$StringJson = "["; 
	    if ( count($resultadoDaConsulta) ) {
			
			// Gera arquivo CSV
			$fp = fopen("pessoas.csv", "w"); // o "a" indica que o arquivo será sobrescrito sempre que esta função for executada.
			$escreve = fwrite($fp, "ID;Nome;Sobrenome;Ano;Formação");
			
			foreach($resultadoDaConsulta as $registro) 
			{ 		  			
				$escreve = fwrite($fp, "\n$registro[pessoa_id];$registro[pessoa_nome];$registro[pessoa_sobrenome];$registro[pessoa_ano];$registro[pessoa_formacao]");			  
				if ($StringJson != "[") {$StringJson .= ",";}
				$StringJson .= '{"pessoa_id":"' . $registro['pessoa_id']  . '",';
				$StringJson .= '"pessoa_nome":"' . $registro['pessoa_nome']  . '",';	
				$StringJson .= '"pessoa_sobrenome":"' . $registro['pessoa_sobrenome']  . '",';	
				$StringJson .= '"pessoa_ano":"' . $registro['pessoa_ano']    . '",';	
				$StringJson .= '"pessoa_formacao":"' . $registro['pessoa_formacao'] . '"}';
		      }  
		echo $StringJson . "]"; // Exibe o vetor JSON
		
		fclose($fp); 
        } 
    } catch(PDOException $e) {
        echo 'ERROR: ' . $e->getMessage(); // opcional, apenas para teste
    }  
?>
