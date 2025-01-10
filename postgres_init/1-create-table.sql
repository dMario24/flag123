CREATE TABLE IF NOT EXISTS  flags (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    img_url TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL
);

COMMENT ON TABLE flags IS 'Flag table storing flag information';

COMMENT ON COLUMN flags.id IS '자동 증가 ID';
COMMENT ON COLUMN flags.name IS '위치 이름';
COMMENT ON COLUMN flags.img_url IS '이미지 데이터 (바이너리 형태)';
COMMENT ON COLUMN flags.latitude IS '위도';
COMMENT ON COLUMN flags.longitude IS '경도';

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