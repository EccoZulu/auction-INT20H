python -m venv venv
venv\scripts\activate
cd backend 
pip install -r requirements.txt
//Змінити все в settings.py
py manage.py migrate //Postgre install 
py manage.py runserver

//Open another terminal 
venv\scripts\activate 
cd frontend
npm i
npm run

