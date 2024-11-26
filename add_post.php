// add_post.php
<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
    exit;
}

try {
    // Replace with your actual database connection
    $pdo = new PDO("mysql:host=localhost;dbname=blog_system", "username", "password");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $title = $_POST['title'] ?? '';
    $author = $_POST['author'] ?? '';
    $content = $_POST['content'] ?? '';
    
    if (empty($title) || empty($author) || empty($content)) {
        throw new Exception('All fields are required');
    }
    
    $stmt = $pdo->prepare("INSERT INTO blog_posts (title, author, content, created_at) VALUES (?, ?, ?, NOW())");
    $stmt->execute([$title, $author, $content]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Post created successfully'
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
