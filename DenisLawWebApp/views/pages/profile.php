<?php 
session_start();
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Your Profile</title>
		<link rel="stylesheet" type="text/css" href="/DenisLawWebApp/public/style/Profile.css">
	</head>

	<body>
		<header id="header">
			<!-- Import site header content here -->
		</header>
		<h1>Your Profile</h1>
		<?php
		//Set up temporary variables until user sessions are implemented
		$_SESSION["userName"] = "Test Name";
		$_SESSION["userPostcode"] = "Test Postcode";
		$_SESSION["eContactName"] = "Test Contact Name";
		$_SESSION["eContactPhone"] = "Test Contact Phone No";
		
		//Get session variables and display as paragraphs
		echo '<p>Name: ' . $_SESSION["userName"] . '</p>';
		echo "<p>Postcode: " . $_SESSION["userPostcode"] . "</p>";
		echo "<p>Emergency Contact Details</p>";
		echo "<p>Name: " . $_SESSION["eContactName"] . "</p>";
		echo "<p>Phone Number: " . $_SESSION["eContactPhone"] . "</p>";
		?>
		
		<button id="editButton" class="">Edit Account</button>
		<button id="deleteButton" class="">Delete Account</button>
		
		<footer id="footer">
			<!-- Import site footer content here -->
		</footer>
	</body>
</html>