<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=utf-8");

	include("dados-conexao.php"); // Carrega os dados da conexão!	
	if ($_GET) // Testa se existe valores na URL!
	{
		try { // tenta fazer a conexão e executar o INSERT
			$conecta = new PDO("mysql:host=$servidor;dbname=$banco", $usuario , $senha); //istancia a classe PDO
			$conecta->exec("set names utf8"); // Permite caracteres latinos.

			if($_GET[pessoa_id] === ''){
				$comandoSQL = "
				INSERT INTO tb01_formacao 
				(pessoa_nome, pessoa_sobrenome, pessoa_ano, pessoa_formacao) 
				VALUES 
				('$_GET[pessoa_nome]','$_GET[pessoa_sobrenome]', '$_GET[pessoa_ano]', '$_GET[pessoa_formacao]');";
				echo $comandoSQL;
			} else {
				$comandoSQL = "
				UPDATE tb01_formacao SET pessoa_nome='$_GET[pessoa_nome]',
				pessoa_sobrenome='$_GET[pessoa_sobrenome]',
				pessoa_ano='$_GET[pessoa_ano]',
				pessoa_formacao='$_GET[pessoa_formacao]' WHERE pessoa_id='$_GET[pessoa_id]';";
				echo $comandoSQL;
			}

			$grava = $conecta->prepare($comandoSQL); //testa o comando SQL
			$grava->execute(array()); 			
		} catch(PDOException $e) { // caso retorne erro
			echo('Erro: ' . $e->getMessage()); 
		}
	} 
?>