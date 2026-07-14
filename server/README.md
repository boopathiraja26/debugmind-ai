# DebugMind AI – Backend

AI Powered Bug Analysis Platform (Node.js + Express + MongoDB + Gemini)

## Folder Structure

```
debugmind-ai-backend/
├── server.js
├── package.json
├── .env.example
├── .gitignore
├── src/
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Analysis.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── analysisController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── analysisRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validateMiddleware.js
│   ├── services/
│   │   └── geminiService.js
│   ├── validators/
│   │   ├── authValidator.js
│   │   └── analysisValidator.js
│   └── utils/
│       ├── generateToken.js
│       ├── asyncHandler.js
│       └── apiResponse.js
```

## Setup

```bash
npm install
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, GEMINI_API_KEY
npm run dev             # nodemon
npm start                # production
```

## API Endpoints

### Auth
| Method | Endpoint          | Access  | Description             |
|--------|--------------------|---------|--------------------------|
| POST   | /api/auth/register | Public  | Register new user        |
| POST   | /api/auth/login     | Public  | Login, returns JWT       |
| GET    | /api/auth/me         | Private | Get logged-in user       |

### Bug Analysis
| Method | Endpoint              | Access  | Description                          |
|--------|-------------------------|---------|----------------------------------------|
| POST   | /api/analysis            | Private | Analyze code+error via Gemini, save   |
| GET    | /api/analysis             | Private | List analyses (paginated)             |
| GET    | /api/analysis/search       | Private | Search analyses by keyword/severity  |
| GET    | /api/analysis/:id           | Private | Get single analysis                  |
| DELETE | /api/analysis/:id            | Private | Delete an analysis                  |

### Health
| Method | Endpoint     | Access | Description   |
|--------|---------------|--------|----------------|
| GET    | /api/health    | Public | Health check   |

## Auth Header

```
Authorization: Bearer <JWT_TOKEN>
```

## Request Examples

**Register**
```json
POST /api/auth/register
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123"
}
```

**Create Analysis**
```json
POST /api/analysis
{
  "code": "function add(a,b){ return a+b }\nconsole.log(add(1))",
  "errorMessage": "TypeError: Cannot read properties of undefined",
  "language": "javascript",
  "title": "Add function bug"
}
```

**Search**
```
GET /api/analysis/search?q=TypeError&severity=high&page=1&limit=10
```
