<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Function to log errors
function logError($message) {
    $logFile = 'error.log';
    $timestamp = date('Y-m-d H:i:s');
    $logMessage = "[$timestamp] $message\n";
    file_put_contents($logFile, $logMessage, FILE_APPEND);
}

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Get form data
        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = $_POST['message'];
        
        // Validate input
        if (empty($name) || empty($email) || empty($message)) {
            throw new Exception("Please fill in all fields.");
        }
        
        // Validate email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception("Invalid email format.");
        }
        
        // Email configuration
        $to = "dronedio.uow@gmail.com";
        $subject = "New Contact Form Submission from Drone Dio Website";
        
        // HTML email content
        $email_message = "
        <html>
        <head>
            <title>New Contact Form Submission</title>
            <style>
                body { font-family: Arial, sans-serif; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f8f9fa; padding: 20px; text-align: center; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>New Contact Form Submission</h2>
                </div>
                <div class='content'>
                    <p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
                    <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
                    <p><strong>Message:</strong></p>
                    <p>" . nl2br(htmlspecialchars($message)) . "</p>
                </div>
                <div class='footer'>
                    <p>This email was sent from the Drone Dio contact form.</p>
                </div>
            </div>
        </body>
        </html>
        ";
        
        // Email headers
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: " . $email . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        // Send email
        if (mail($to, $subject, $email_message, $headers)) {
            // Log successful submission
            logError("Email sent successfully to $to from $email");
            // Redirect back to the contact page with success message
            header("Location: index.html#contact?status=success");
        } else {
            throw new Exception("Failed to send email.");
        }
    } catch (Exception $e) {
        // Log the error
        logError("Error: " . $e->getMessage());
        // Redirect back to the contact page with error message
        header("Location: index.html#contact?status=error&message=" . urlencode($e->getMessage()));
    }
} else {
    // If not a POST request, redirect to home page
    header("Location: index.html");
}
?> 