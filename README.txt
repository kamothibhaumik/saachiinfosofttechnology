Saachi Infosoft Technologies — Corporate Website Source
=========================================================

Stack: React 19 (frontend/) + FastAPI + MongoDB (backend/)

Run locally:
1) Backend:
   cd backend
   python -m venv venv && source venv/bin/activate
   pip install -r requirements.txt
   # create backend/.env with:
   #   MONGO_URL="mongodb://localhost:27017"
   #   DB_NAME="saachi_db"
   #   CORS_ORIGINS="*"
   uvicorn server:app --reload --port 8001

2) Frontend:
   cd frontend
   yarn install
   # create frontend/.env with:
   #   REACT_APP_BACKEND_URL=http://localhost:8001
   yarn start

Note: .env files are excluded from this archive on purpose.
Contact form: POST /api/contact · Newsletter: POST /api/newsletter
