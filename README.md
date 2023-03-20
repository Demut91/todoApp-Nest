### todoApp-Nest

⚙️ To run project execute this commands:

1. git clone https://github.com/Demut91/todoApp-Nest.git
2. cd todoApp-Nest
3. cat << EOF > .env  
DB_HOST=postgres  
DB_PORT=5432  
POSTGRES_USER=postgres  
POSTGRES_PASSWORD=somepass  
POSTGRES_DB=someDBname  
JWT_EXP=1h  
SECRET=SECRET  
EOF  
4. cat << EOF > docker.env  
POSTGRES_USER=postgres  
POSTGRES_PASSWORD=somepass  
POSTGRES_DB=someDBname   
EOF  
5. docker-compose up

API docs will be avialiable on `http://localhost:3000/api`

🚀 Project deployed on: `http://82.202.168.156:3000/api`
