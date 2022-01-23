from flask import Flask,request
from flask_cors import CORS, cross_origin
from flask_mysqldb import MySQL
from cryptography.fernet import Fernet

key = b'pRmgMa8T0INjEAfksaq2aafzoZXEuwKI7wDe4c1F8AY='
cipher_suite = Fernet(key)
app = Flask(__name__)
cors = CORS(app , resources={r"/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}})

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Sandeep2000@'
app.config['MYSQL_DB'] = 'users'
mysql = MySQL(app)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == "POST":
        print(request.form)
        first_name=request.form.get("firstname")
        last_name=request.form.get("firstname")
        email=request.form.get("email")
        password= request.form.get("password")
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users_table(firstName, lastName,email,password) VALUES(%s, %s, %s, %s)", (first_name, last_name,email,password))
        mysql.connection.commit()
        cur.close()
    return "ok"
@app.route('/login',methods=["GET","POST"])
def login():
    if request.method == "POST":
        email=request.form.get("email")
        password= request.form.get("password")
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * from users_table;''')
        rv = cur.fetchall()      
        print(rv)
        cur.close()        
    return "ok"

if __name__ == '__main__':
	app.run()
