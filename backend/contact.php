<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = mysqli_connect("localhost", "root", "", "contact_db");

if (!$conn) {
    echo json_encode(["status" => "db_failed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "no_data"]);
    exit();
}

$name       = trim($data['name'] ?? '');
$email      = trim($data['email'] ?? '');
$phone      = trim($data['phone'] ?? '');
$department = trim($data['department'] ?? '');
$message    = trim($data['message'] ?? '');

/* ---------------- VALIDATION START ---------------- */

// required fields
if ($name === "" || $email === "" || $message === "") {
    echo json_encode(["status" => "validation_error", "error" => "required_fields_missing"]);
    exit();
}

// name: only letters and spaces, no numbers allowed
if (!preg_match("/^[a-zA-Z\s]+$/", $name)) {
    echo json_encode(["status" => "validation_error", "error" => "invalid_name"]);
    exit();
}

// email validation
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "validation_error", "error" => "invalid_email"]);
    exit();
}

// phone: exactly 10 digits, must start with 9, 8, or 7 (optional, you can adjust)
if ($phone !== "" && !preg_match("/^[7-9][0-9]{9}$/", $phone)) {
    echo json_encode(["status" => "validation_error", "error" => "invalid_phone"]);
    exit();
}

/* ---------------- VALIDATION END ---------------- */

$sql = "INSERT INTO contacts (name, email, phone, department, message)
        VALUES ('$name', '$email', '$phone', '$department', '$message')";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["status" => "success"]);
} 
else 
{
    echo json_encode(["status" => "db_error"]);
}
