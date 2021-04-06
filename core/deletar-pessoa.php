<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=utf-8");

	include("dados-conexao.php"); // Carrega os dados da conexão!	
	// if ($_GET) // Testa se existe valores na URL!
	// {
		try { // tenta fazer a conexão e executar o INSERT
			$conecta = new PDO("mysql:host=$servidor;dbname=$banco", $usuario , $senha); //istancia a classe PDO
			$conecta->exec("set names utf8"); // Permite caracteres latinos.
			$comandoSQL = "
            DELETE FROM tb01_formacao WHERE pessoa_id = '$_GET[pessoa_id]';";
			echo $comandoSQL;
			$grava = $conecta->prepare($comandoSQL); //testa o comando SQL
			$grava->execute(array()); 			
		} catch(PDOException $e) { // caso retorne erro
			echo('Erro: ' . $e->getMessage()); 
		}
	// } 
?>