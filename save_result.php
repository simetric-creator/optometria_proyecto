<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
  exit;
}

$baseDir = __DIR__ . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR . 'results';
if (!is_dir($baseDir)) {
  @mkdir($baseDir, 0775, true);
}

$ts = date('Ymd_His');
$rand = bin2hex(random_bytes(4));
$filename = "optieval_{$ts}_{$rand}.txt";
$path = $baseDir . DIRECTORY_SEPARATOR . $filename;

// Guardamos como texto legible (1 archivo con todo)
$lines = [];
$lines[] = "OptiEval - Resultado";
$lines[] = "Fecha: " . date('c');
$lines[] = "----------------------------------------";

// Persistimos un bloque JSON (para siguiente paso) + versión “humana”
$lines[] = "DATA_JSON=" . json_encode($data, JSON_UNESCAPED_UNICODE);

file_put_contents($path, implode(PHP_EOL, $lines) . PHP_EOL);

echo json_encode(['ok' => true, 'file' => $filename]);
?>
