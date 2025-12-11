CREATE TABLE IF NOT EXISTS guests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    message TEXT,
    will_attend BOOLEAN DEFAULT true,
    transfer VARCHAR(50),
    food_preference VARCHAR(100),
    drinks TEXT,
    has_kids BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_guests_name ON guests(name);
CREATE INDEX idx_guests_created_at ON guests(created_at DESC);