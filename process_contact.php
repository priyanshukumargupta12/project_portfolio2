<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection configuration
$servername = "localhost";
$username = "root"; // Default XAMPP username
$password = "";     // Default XAMPP password
$dbname = "portfolio";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection and return error if failed
if ($conn->connect_error) {
    header('Content-Type: application/json');
    die(json_encode([
        "status" => "error",
        "message" => "Database connection failed: " . $conn->connect_error
    ]));
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if all required fields are present
    if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['subject']) || empty($_POST['message'])) {
        header('Content-Type: application/json');
        echo json_encode([
            "status" => "error",
            "message" => "All fields are required!"
        ]);
        exit();
    }

    // Get and sanitize form data
    $name = htmlspecialchars(strip_tags($_POST['name']));
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(strip_tags($_POST['subject']));
    $message = htmlspecialchars(strip_tags($_POST['message']));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header('Content-Type: application/json');
        echo json_encode([
            "status" => "error",
            "message" => "Invalid email format!"
        ]);
        exit();
    }

    try {
        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)");
        
        if (!$stmt) {
            throw new Exception("Prepare failed: " . $conn->error);
        }

        $stmt->bind_param("ssss", $name, $email, $subject, $message);

        // Execute the statement
        if ($stmt->execute()) {
            header('Content-Type: application/json');
            echo json_encode([
                "status" => "success",
                "message" => "Message sent successfully!"
            ]);
        } else {
            throw new Exception("Execute failed: " . $stmt->error);
        }

        $stmt->close();
    } catch (Exception $e) {
        header('Content-Type: application/json');
        echo json_encode([
            "status" => "error",
            "message" => "Error: " . $e->getMessage()
        ]);
    }

    $conn->close();
    exit();
} else {
    header('Content-Type: application/json');
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method!"
    ]);
}
?>