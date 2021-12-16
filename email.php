<?php

$entityBody = file_get_contents('php://input');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require('PHPMailer/src/PHPMailer.php');

$params = array();
parse_str($entityBody, $params);

$email = "";

$from = $params['firstName']. " ".$params['lastName'];
$msg = $params['message'];

$mail = new PHPMailer(true);


$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
$mail->isSMTP();                                            // Send using SMTP
$mail->Host       = 'smtp.example.com';                    // Set the SMTP server to send through
$mail->SMTPAuth   = true;                                   // Enable SMTP authentication
$mail->Username   = 'user@example.com';                     // SMTP username
$mail->Password   = 'secret';                               // SMTP password
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
$mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above


$mail->setFrom($email, $from);
$mail->addAddress($email, "From Matts Server");
$mail->Subject = 'Query from '. $from;
$mail->Body = $msg;
$mail->AltBody = 'HTML not supported';

if(!$mail->Send()) {
  echo "Error!" . $mail->ErrorInfo;
} else {
  echo "Email sent successfully";
}

?>
