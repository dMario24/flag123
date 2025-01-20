CREATE TABLE IF NOT EXISTS  flags (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    img_url TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL, --TODO flag_metadata 로직 추가되면 제거 필요
    longitude DOUBLE PRECISION NOT NULL
);

-- 부모 레코드(참조되는 id)가 삭제될 때, 해당 부모를 참조하는 자식 레코드가 존재하면 삭제가 제한됩니다.
ALTER TABLE flags ADD COLUMN parent_id INTEGER;
ALTER TABLE flags ADD CONSTRAINT fk_parent_id FOREIGN KEY (parent_id) REFERENCES flags(id) ON DELETE RESTRICT;

COMMENT ON TABLE flags IS 'Flag table storing flag information';

COMMENT ON COLUMN flags.id IS '자동 증가 ID';
COMMENT ON COLUMN flags.name IS '위치 이름';
COMMENT ON COLUMN flags.img_url IS '이미지 데이터 (바이너리 형태)';
COMMENT ON COLUMN flags.latitude IS '위도';
COMMENT ON COLUMN flags.longitude IS '경도';

CREATE TABLE IF NOT EXISTS flag_metadata (
    id SERIAL PRIMARY KEY,
    flag_id INT NOT NULL,
    source TEXT,
    likes INT DEFAULT 0,  -- 추가된 '좋아요' 수
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    gold_medals INT DEFAULT 0,
    silver_medals INT DEFAULT 0,
    bronze_medals INT DEFAULT 0,
    shared_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- 외래 키로 flags 테이블의 id 참조
    CONSTRAINT fk_flag
        FOREIGN KEY (flag_id)
        REFERENCES flags (id)
        ON DELETE CASCADE
);

ALTER TABLE flag_metadata
ADD CONSTRAINT unique_flag_id UNIQUE (flag_id);

CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    client_id CHAR(32) UNIQUE NOT NULL,
    device_type VARCHAR(50),
    os_type VARCHAR(50),
    browser_type VARCHAR(50),
    language_code CHAR(5),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS flag_like_history (
    id SERIAL PRIMARY KEY,
    flag_id INTEGER NOT NULL,
    delta_cnt INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    client_ref INTEGER NOT NULL,
    CONSTRAINT fk_flag
        FOREIGN KEY (flag_id)
        REFERENCES flags (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_client 
        FOREIGN KEY (client_ref) 
        REFERENCES clients (id) 
        ON DELETE CASCADE
);

COMMENT ON TABLE flag_like_history IS '깃발 좋아요/취소 기록 테이블';
COMMENT ON COLUMN flag_like_history.delta_cnt IS '좋아요(1), 좋아요 취소(-1), 마이그래이션에 따른 정수(n)';

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
);
-- const users = [
--   {
--     id: '410544b2-4001-4271-9855-fec4b6a6442a',
--     name: 'User',
--     email: 'user@nextmail.com',
--     password: '123456',
--   },
-- ];

-- const { default: bcrypt } = await import("bcrypt");
-- const hashedPassword = await bcrypt.hash('123456', 10);
-- hashedPassword
-- '$2b$10$030PAxHRVPIQ3bZzYxib4.syFb8cFXcxGYcgdFDENLOlEGt7iS1Le'
INSERT INTO users (id, name, email, password)
VALUES ('410544b2-4001-4271-9855-fec4b6a6442a', 'User', 'user@nextmail.com', '$2b$10$030PAxHRVPIQ3bZzYxib4.syFb8cFXcxGYcgdFDENLOlEGt7iS1Le')
ON CONFLICT (id) DO NOTHING;