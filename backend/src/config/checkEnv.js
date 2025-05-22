const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../../.env');
const envContent = `DATABASE_URL=postgresql://neondb_owner:npg_bs6Ni8HkwSFu@ep-odd-shape-a5kzk4y6-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
PORT=3000`;

if (!fs.existsSync(envPath)) {
  console.log('.env file não encontrado, criando...');
  fs.writeFileSync(envPath, envContent);
  console.log('.env file criado com sucesso!');
} 