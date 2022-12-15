import pymysql
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt, jwt_required, JWTManager
import datetime
# Membuat server flask
app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = "INI_SECRET_KEY"
app.config['JWT_HEADER_TYPE'] = "jwt"
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(
    days=1)  # 1 hari token JWT expired
jwt = JWTManager(app)

mydb = pymysql.connect(
    host="localhost",
    user="root",
    passwd="",
    database="geo_attendance"
)


@app.route('/')
@app.route('/index')
def index():
    return "<h1>Backend Capstone</h1>"


@app.route("/login", methods=["POST"])
def login():
    data = request.json

    username = data["username"]
    password = data["password"]

    username = username.lower()
    password_enc = password
    # hashlib.md5(password.encode(
    #     'utf-8')).hexdigest()  # Convert password to md5

    # Cek kredensial didalam database
    query = " SELECT id_admin, nama, password FROM tbl_admin WHERE username = %s "
    values = (username, )

    mycursor = mydb.cursor()
    mycursor.execute(query, values)
    data_user = mycursor.fetchall()

    if len(data_user) == 0:
        return make_response(jsonify(deskripsi="Username tidak ditemukan"), 401)

    data_user = data_user[0]

    db_id_admin = data_user[0]
    db_nama = data_user[1]
    db_password = data_user[2]

    if password_enc != db_password:
        return make_response(jsonify(deskripsi="Password salah"), 401)

    jwt_payload = {
        "id_admin": db_id_admin,
        "nama": db_nama,
        "status": "login"
    }

    access_token = create_access_token(username, additional_claims=jwt_payload)

    return jsonify(access_token=access_token)


@app.route("/login_guru", methods=["POST"])
def loginguru():
    data = request.json

    username = data["username"]
    password = data["password"]

    username = username.lower()
    password_enc = password
    # hashlib.md5(password.encode(
    #     'utf-8')).hexdigest()  # Convert password to md5

    # Cek kredensial didalam database
    query = " SELECT nip, nama, tempat_lahir,tanggal_lahir, alamat, jk, agama, email, username, password FROM tbl_guru WHERE username = %s "
    values = (username, )

    mycursor = mydb.cursor()
    mycursor.execute(query, values)
    data_user = mycursor.fetchall()

    if len(data_user) == 0:
        return make_response(jsonify(deskripsi="Username tidak ditemukan"), 401)

    data_user = data_user[0]

    db_nip = data_user[0]
    db_nama = data_user[1]
    db_tempat_lahir = data_user[2]
    db_tanggal_lahir = data_user[3]
    db_alamat = data_user[4]
    db_jk = data_user[5]
    db_agama = data_user[6]
    db_email = data_user[7]
    db_username = data_user[8]
    db_password = data_user[9]

    if password_enc != db_password:
        return make_response(jsonify(deskripsi="Password salah"), 401)

    jwt_payload = {
        "id_admin": db_nip,
        "nama": db_nama,
        "status": "login"
    }

    result = {
        "nip": db_nip,
        "nama": db_nama,
        "tempat_lahir": db_tempat_lahir,
        "tanggal_lahir": db_tanggal_lahir,
        "alamat": db_alamat,
        "jk": db_jk,
        "agama": db_agama,
        "email": db_email,
        "username": db_username
    }

    access_token = create_access_token(username, additional_claims=jwt_payload)

    return make_response(jsonify(access_token=access_token), result)


@app.route('/profile_guru', methods=['GET'])
@jwt_required()
def profile_guru():
    query = "SELECT * FROM tbl_guru WHERE 1=1"
    values = ()

    nip = str(get_jwt()["id_admin"])
    nama = str(get_jwt()["nama"])

    if nip:
        query += " AND nip=%s "
        values += (nip,)
    if nama:
        query += " AND nama LIKE %s "
        values += ("%"+nama+"%", )

    mycursor = mydb.cursor()
    mycursor.execute(query, values)
    data = mycursor.fetchall()

    row_headers = [x[0] for x in mycursor.description]
    json_data = []
    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    return make_response(jsonify(json_data), 200)


@app.route('/get_data_guru', methods=['GET'])
def get_data_guru():
    query = "SELECT * FROM tbl_guru WHERE 1=1"
    values = ()

    nip = request.args.get("nip")
    nama = request.args.get("nama")

    if nip:
        query += " AND nip=%s "
        values += (nip,)
    if nama:
        query += " AND nama LIKE %s "
        values += ("%"+nama+"%", )

    mycursor = mydb.cursor()
    mycursor.execute(query, values)
    data = mycursor.fetchall()

    row_headers = [x[0] for x in mycursor.description]
    json_data = []
    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    return make_response(jsonify(json_data), 200)


@app.route('/insert_data_guru', methods=['POST'])
def insert_data_guru():
    hasil = {"status": "gagal insert data guru"}

    try:
        data = request.json

        query = "INSERT INTO tbl_guru(nip, nama, tempat_lahir,tanggal_lahir, alamat, jk, agama, email, username, password) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        values = (data["nip"], data["nama"], data["tempat"],
                  data["tanggal"], data["alamat"], data["jk"], data["agama"], data["email"], data["username"], data["password"])

        mycursor = mydb.cursor()
        mycursor.execute(query, values)
        mydb.commit()
        hasil = {"status": "berhasil insert data siswa"}

    except Exception as e:
        print("Error: " + str(e))

    return jsonify(hasil)


@app.route('/update_data_guru/<nip>', methods=['PUT'])
def update_data_guru(nip):
    hasil = {"status": "gagal update data guru"}

    try:
        data = request.json
        # nip_awal = data["nip_awal"]

        query = "UPDATE tbl_guru SET nip = %s "
        values = (nip, )

        if "nip" in data:
            query += ", nip = %s"
            values += (data["nip"], )
        if "nama" in data:
            query += ", nama = %s"
            values += (data["nama"], )
        if "tempat_lahir" in data:
            query += ", tempat_lahir = %s"
            values += (data["tempat_lahir"], )
        if "tanggal_lahir" in data:
            query += ", tanggal_lahir = %s"
            values += (data["tanggal_lahir"], )
        if "alamat" in data:
            query += ", alamat = %s"
            values += (data["alamat"], )
        if "jk" in data:
            query += ", jk = %s"
            values += (data["jk"], )
        if "agama" in data:
            query += ", agama = %s"
            values += (data["agama"], )
        if "email" in data:
            query += ", email = %s"
            values += (data["email"], )
        if "username" in data:
            query += ", username = %s"
            values += (data["username"], )
        if "password" in data:
            query += ", password = %s"
            values += (data["password"], )

        query += " WHERE nip = %s"
        values += (nip, )

        mycursor = mydb.cursor()
        mycursor.execute(query, values)
        mydb.commit()
        hasil = {"status": "berhasil update data guru"}

    except Exception as e:
        print("Error: " + str(e))

    return jsonify(hasil)


@app.route('/delete_data_guru/<nip>', methods=['DELETE'])
def delete_data_guru(nip):
    hasil = {"status": "gagal hapus data guru"}

    try:

        query = "DELETE FROM tbl_guru WHERE nip=%s"
        values = (nip,)
        mycursor = mydb.cursor()
        mycursor.execute(query, values)
        mydb.commit()
        hasil = {"status": "berhasil hapus data guru"}

    except Exception as e:
        print("Error: " + str(e))

    return jsonify(hasil)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5010, debug=True)
