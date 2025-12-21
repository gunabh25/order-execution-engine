CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  status TEXT,
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
