// server.js
const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const app = express();
const PORT = 5002;

app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());

const dbConfig = {
  user: 'khk1',
  password: 'kh1234',
  connectString: 'localhost:1521/XE',
};

async function runQuery(sql, binds = [], options = {}) {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(sql, binds, options);

    console.log('쿼리 결과:', result);

    return result.rows;
  } catch (err) {
    console.error('쿼리에러입니다.:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('문제가생겨 닫습니다.:', err);
      }
    }
  }
}

app.get('/', (request, response) => {
  response.send('백엔드 연결 성공!');
});

app.get('/api/cafes', async (request, response) => {
  try {
    const cafes = await runQuery('SELECT * FROM cafe');
    response.json(cafes);
  } catch (error) {
    response.status(500).json({ error: '서버 에러입니다.' });
  }
});

app.post('/api/cafes', async (request, response) => {
  const { name, price } = request.body;

  console.log('데이터를 받았습니다.:', { name, price });

  if (!name || !price) {
    return response.status(400).json({ error: '이름이나 가격이 없습니다.' });
  }

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      'INSERT INTO cafe (ID, NAME, PRICE) VALUES (CAFE_SEQ.NEXTVAL, :name, :price)',
      { name, price },
      { autoCommit: true }
    );

    response.json({ message: '성공적으로 저장되었습니다.' });
  } catch (error) {
    console.error('Error in POST /api/cafes:', error);
    response.status(500).json({ error: '서버에러' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('커넥션 닫습니다.:', err);
      }
    }
  }
});

app.listen(PORT, () => {
  console.log(`서버 시작: http://localhost:${PORT}`);
});
