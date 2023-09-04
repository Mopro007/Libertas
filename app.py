from flask import Flask, request, jsonify, render_template
import sqlite3
from flask_httpauth import HTTPBasicAuth

#initiating flask app
app = Flask(__name__)

#serving the homepage
@app.route('/')
def index():
    return render_template('Home.html')

#authenticating and serving the dashboard
auth = HTTPBasicAuth()
@auth.verify_password
def verify(username, password):
    if username == 'moe' and password == 'admin_moe':
        return True
    else:
        return False
@app.route('/dashboard')
@auth.login_required
def dashboard():
    return render_template('dashboard.html')

#retrieving data from the interest database
@app.route('/Retrieve',methods=['GET'])
def Retrieve():
    connection = sqlite3.connect(r"E:\\vscode files\\My-Projects\\Libertas\\interest.db")
    cursor = connection.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS interest(email TEXT,interest_lvl TEXT,commodity TEXT)""")
    cursor.execute(""" SELECT email, interest_lvl, commodity FROM interest """)
    rows = cursor.fetchall()
    data = {}
    for row in rows:
        email = row[0]
        interest_level = row[1]
        commodity = row[2]
        data[email] = [interest_level,commodity]
    connection.close()
    response = jsonify(data)
    return response

#submitting the connect form data to the messages database
@app.route('/SubmitForm',methods=['POST'])
def SubmitForm():
    data = request.get_json()
    name, email, message = data['name'], data['email'], data['message']
    connection = sqlite3.connect("../messages.db")
    cursor = connection.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS messages(name TEXT,email TEXT,message TEXT)""")
    cursor.execute("INSERT INTO messages VALUES(?,?,?)",[name,email,message])
    connection.commit()
    connection.close()
    response = jsonify({'status': 'success', 'message': 'message added to the database successfully'})
    return response

#submitting the interest form data to the interest database
@app.route('/sbmt_intrst_from',methods=['POST'])
def Sbmt_intrst_from():
    data = request.get_json()
    email, interest_lvl, commodity = data['email'], data['interest_lvl'], data['commodity']
    connection = sqlite3.connect(r"E:\\vscode files\\My-Projects\\Libertas\\interest.db")
    cursor = connection.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS interest(email TEXT,interest_lvl TEXT, commodity TEXT)""")
    cursor.execute("INSERT INTO interest VALUES(?,?,?)",[email,interest_lvl,commodity])
    connection.commit()
    connection.close()
    response = jsonify({'status': 'success', 'message': 'data added to the database successfully'})
    return response

#running the server
if __name__ == '__main__':
    app.run()