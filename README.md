# 🚩 Flag123
### 12.3 계엄배 천하제일 재기발랄 깃발대회 by 민주주의 해방전선 나만 깃발 없엉 총연맹
```
"12.3 계엄배 천하제일깃발대회" 😊 운영자입니다.
올려주신 사진을 아래 대회 싸이트(🌐 https://f.diginori.com)에 업로드했습니다.
혹시 문제가 될 경우 말씀해(𝕏:samdulshop) 주시면 즉시 삭제하도록 하겠습니다.
감사합니다.
```
- Martial law was declared in the Republic of Korea on Dec. 3, 2025, but lightly marched through the country, armed with cheerful energy. Awesome
- [for her intense poetic prose that confronts historical traumas and exposes the fragility of human life](https://www.nobelprize.org/prizes/literature/2024/press-release/)
- [I would like to share the meaning of this award, which is for literature, with you – standing here in opposition to violence together](https://www.nobelprize.org/prizes/literature/2024/han/speech/)
  
    <img src="https://github.com/user-attachments/assets/b3f29422-60b7-436d-b3eb-70035c1fdacb" width="777">
    
    <img src="https://github.com/user-attachments/assets/b1b16e3f-f7ea-4d6c-a5b6-9d4e7f38225d" width="777">



## 📝 Initial Dummy Data 
- [use vercel-postgres](https://vercel.com/docs/storage/vercel-postgres)
```sql
CREATE TABLE flags (
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

\d+ flags

INSERT INTO flags (name, latitude, longitude, img_url) VALUES
('#BRAT impeachment and it’s completely different but also still impeachment', 37.525307 + (37.530139 - 37.525307) * RANDOM(), 126.919467 + (126.922896 - 126.919467) * RANDOM(), '/dummy/d1.webp'),
('Korean branch of the Jedi Federation', 37.525307 + (37.530139 - 37.525307) * RANDOM(), 126.919467 + (126.922896 - 126.919467) * RANDOM(), '/dummy/d2.webp'),
('Rapping Rabbit Federation', 37.525307 + (37.530139 - 37.525307) * RANDOM(), 126.919467 + (126.922896 - 126.919467) * RANDOM(), '/dummy/d3.webp'),
('National Carrot Alliance Loving Rabbits', 37.525307 + (37.530139 - 37.525307) * RANDOM(), 126.919467 + (126.922896 - 126.919467) * RANDOM(), '/dummy/d4.webp'),
('Flags World Championship', 37.525307 + (37.530139 - 37.525307) * RANDOM(), 126.919467 + (126.922896 - 126.919467) * RANDOM(), '/dummy/FWC.png');


SELECT id,name,img_url FROM flags ORDER BY id DESC;

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    client_id CHAR(32) UNIQUE NOT NULL,
    device_type VARCHAR(50),
    os_type VARCHAR(50),
    browser_type VARCHAR(50),
    language_code CHAR(5),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE flag_like_history (
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

ALTER TABLE flag_like_history
ADD COLUMN client_id CHAR(32);

SELECT
    id,
    flag_id,
    delta_cnt,
    created_at AT TIME ZONE 'Asia/Seoul' AS created_at_kst
FROM 
    flag_like_history
ORDER BY 
    id DESC;

SHOW TIME ZONE; -- GMT

SELECT CURRENT_TIMESTAMP;

-- 쪼인
SELECT 
    f.id,
    f.name,
    f.img_url,
    COALESCE(SUM(fl.delta_cnt), 0) AS like_count
FROM 
    flags f
LEFT JOIN 
    flag_like_history fl
ON 
    f.id = fl.flag_id
GROUP BY 
    f.id, f.name, f.img_url
ORDER BY 
    f.id DESC
```
### 🌱 Env
- Rename env.dummy to .env.local. Make sure the file is not pushed to the public GitHub repository.
- To avoid using analytics and statistics by connecting to Google Firebase, delete analytics.ts.
- Refer to the [Vercel  CLI](https://vercel.com/docs/cli/env) to sync variables for database connection.
- I used https://api.imgbb.com/ for image uploads. In your case, you should obtain a new API key

### 💻 Local Run
- ested on WSL Ubuntu 22.04.4 LTS and macOS. ( node : v20.17.0 ||  v22.12.0, nextjs : 14.2.19)
```
$ npm install
$ npm run dev
```

### 🤝 Contribution
- Contributions are open, though I don’t expect anyone to take an interest. I’ll gratefully accept any small advice or help. Thank you. Best regards. 😊👍
- Data.ts has a UPDATA syntax to verify the caching of vercel. Most of the time, it's not necessary. If it's alive, you can delete it.
```javascript
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
const getDbData = unstable_cache(
  async () => {

    // TODO DISABLE
    await sql`
        UPDATE select_count
        SET count = count + 1, last_updated = now()
        WHERE id = 1;
      `;

    const data = await sql<Flag>`SELECT id, name, img_url FROM flags ORDER BY id DESC`;
    return data.rows;
  },
  ['msi'],
  {
    revalidate: CACHE_TIMEOUT,
    tags: ['ism']
  }
)
```

### 🚀 Deploy & Connect DB
- https://vercel.com/docs/deployments/overview
- https://vercel.com/docs/storage/vercel-postgres#vercel-postgres
- https://vercel.com/docs/cli/env

### ⚓ Dockerizing
```bash
$ docker build -t flag123:1.1.0 .

$ docker images                  
REPOSITORY                   TAG       IMAGE ID       CREATED         SIZE
flag123                      1.1.0     09e5616462d9   2 minutes ago   179MB

$ docker run --name f110 -p 3110:3000 -d --env-file .env.local flag123:1.1.0

$ docker stats
CONTAINER ID   NAME      CPU %     MEM USAGE / LIMIT     MEM %     NET I/O     BLOCK I/O   PIDS
8de21b110d7f   f110      0.00%     28.91MiB / 9.717GiB   0.29%     876B / 0B   0B / 0B     11
```

### 🔖 Ref
- https://medium.com/@alexandre.penombre/file-upload-with-next-js-14-app-router-6cb0e594e778
- https://nextjs.org/docs/14/app/api-reference/functions/unstable_cache
- https://nextjs.org/docs/app/api-reference/config/next-config-js/headers
- https://medium.com/@aleksej.gudkov/how-to-disable-cache-in-next-js-a-comprehensive-guide-a1603559483e
- https://nextjs.org/docs/pages/building-your-application/configuring/debugging
- https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields
- [로컬 데이터베이스가 있는 Next.js 튜토리얼: 빠른 시작 가이드](https://medium.com/@dekadekadeka/next-js-tutorial-with-local-database-quick-start-guide-394d48a0aada)
