from flask import Flask, jsonify, request,make_response
from datetime import timedelta
from datetime import datetime
from functools import wraps
import jwt
import os
import flask_cors
from flask import request
import mysql.connector
cors = flask_cors.CORS()


# Initialize flask app for the example
app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'top secret'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config['SECURITY_PASSWORD_HASH'] = 'bcrypt'
app.config['SECURITY_PASSWORD_SALT'] = '$2a$16$PnnIgfMwkOjGX4SkHqSOPO'
app.config['SECURITY_REGISTERABLE'] = True

cors.init_app(app)

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="Sandeep2000@",
  database="cpmap"
)
cursor = mydb.cursor()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, app.config['SECRET_KEY'],algorithms="HS256")
            values = cursor.execute("SELECT id,email,password FROM users where email=%(email)s;",{"email":data['public_id']})
            user=cursor.fetchall()
        except:
            print("invalid")
            return jsonify({
                'message' : 'Token is invalid !!'
            }), 401
        return  f(user, *args, **kwargs)
  
    return decorated

@app.route('/login', methods=['POST','GET'])
def login():
    req = request.form
    email = req.get('email', None)
    password = req.get('password', None)
    values = cursor.execute("SELECT email,password FROM users;")
    for em,pas in cursor.fetchall():
      if em==email and pas==password:
        token = jwt.encode({
            'public_id': email,
            'exp' : datetime.utcnow() + timedelta(minutes = 30)
        }, app.config['SECRET_KEY'],algorithm="HS256")
        return make_response(jsonify({'token' : token,"error":"SUCCESS"}), 201)        
    print("error")
    return jsonify({"error": "FAIL"}),401

@app.route('/register', methods=['POST','GET'])
def register():
    """
    Logs a user in by parsing a POST request containing user credentials and
    issuing a JWT token.
    .. example::
       $ curl http://localhost:5000/api/login -X POST \
         -d '{"username":"Yasoob","password":"strongpassword"}'
    """
    req = request.form
    email = req.get('email',None)
    password = req.get('password', None)
    firstname= req.get('firstname',None)
    lastname= req.get('lastname',None)
    cursor.execute("INSERT INTO users(firstname,lastname,email,password) VALUES (%s, %s, %s,%s)", (firstname, lastname, email,password))
    mydb.commit()
    return {"error": "SUCCESS"},200

@app.route("/handleform",methods=["POST","GET"])
@token_required
def protected(current_user):
   req = request.form
   name = req.get('name',None)
   phone = req.get('phone', None)
   occupation= req.get('occupation',None)
   stages=req.get('stages',None) 
   Q1=req.get('data1',None)
   Q2=req.get('data2',None)
   Q3=req.get('data3',None)
   current_id,email,password=current_user[0]
   cursor.execute("INSERT INTO formdata(name,phone,occupation,stages,Q1,Q2,Q3,id) VALUES (%s, %s, %s,%s,%s,%s,%s,%s)", (name, phone, occupation,stages,Q1,Q2,Q3,int(current_id)))
   mydb.commit()
   return jsonify({"error" : "SUCCESS"})
# Run the example
if __name__ == '__main__':
    app.run(port=5000)
