import datetime

import pymysql
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
from flask_jwt_extended import (JWTManager, create_access_token, get_jwt,
                                jwt_required, current_user)

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


@app.route("/login_siswa", methods=["POST"])
def loginguru():
    data = request.json

    username = data["username"]
    password = data["password"]

    username = username.lower()
    password_enc = password
    # hashlib.md5(password.encode(
    #     'utf-8')).hexdigest()  # Convert password to md5

    # Cek kredensial didalam database
    query = " SELECT nis, nama, tempat_lahir,tanggal_lahir, alamat, jk, agama, email, username, password FROM tbl_siswa WHERE username = %s "
    values = (username, )

    mycursor = mydb.cursor()
    mycursor.execute(query, values)
    data_user = mycursor.fetchall()

    if len(data_user) == 0:
        return make_response(jsonify(deskripsi="Username tidak ditemukan"), 401)

    data_user = data_user[0]

    db_nis = data_user[0]
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
        "nis": db_nis,
        "nama": db_nama,
        "status": "login"
    }

    result = {
        "nip": db_nis,
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


@app.route('/profile_siswa', methods=['GET'])
@jwt_required()
def profile_siswa():
    query = "SELECT * FROM tbl_siswa WHERE 1=1"
    values = ()

    nis = str(get_jwt()["nis"])
    nama = str(get_jwt()["nama"])

    if nis:
        query += " AND nis=%s "
        values += (nis,)
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


@app.route('/get_data_siswa', methods=['GET'])
def get_data_siswa():
    query = "SELECT * FROM tbl_siswa WHERE 1=1"
    values = ()

    nis = request.args.get("nis")
    nama = request.args.get("nama")

    if nis:
        query += " AND nis=%s "
        values += (nis,)
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


@app.route('/insert_data_siswa', methods=['POST'])
def insert_data_siswa():
    hasil = {"status": "gagal insert data siswa"}

    try:
        data = request.json

        query = "INSERT INTO tbl_siswa(nis, nama, tempat_lahir,tanggal_lahir, alamat, jk, agama, kelas, email, username, password) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        values = (data["nis"], data["nama"], data["tempat"],
                  data["tanggal"], data["alamat"], data["jk"], data["agama"], data["kelas"], data["email"], data["username"], data["password"])
        mycursor = mydb.cursor()
        mycursor.execute(query, values)
        mydb.commit()
        hasil = {"status": "berhasil insert data siswa"}

    except Exception as e:
        print("Error: " + str(e))

    return jsonify(hasil)


@app.route('/update_data_siswa/<nis>', methods=['PUT'])
def update_data_siswa(nis):
    hasil = {"status": "gagal update data siswa"}

    try:
        data = request.json
        # nis_awal = data["nis_awal"]

        query = "UPDATE tbl_siswa SET nis = %s "
        values = (nis, )

        if "nis" in data:
            query += ", nis = %s"
            values += (data["nis"], )
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
        if "kelas" in data:
            query += ", kelas = %s"
            values += (data["kelas"], )
        if "email" in data:
            query += ", email = %s"
            values += (data["email"], )
        if "username" in data:
            query += ", username = %s"
            values += (data["username"], )
        if "password" in data:
            query += ", password = %s"
            values += (data["password"], )

        query += " WHERE nis = %s"
        values += (nis, )

        mycursor = mydb.cursor()
        mycursor.execute(query, values)
        mydb.commit()
        hasil = {"status": "berhasil update data siswa"}

    except Exception as e:
        print("Error: " + str(e))

    return jsonify(hasil)


@app.route('/delete_data_siswa/<nis>', methods=['DELETE'])
def delete_data_siswa(nis):
    hasil = {"status": "gagal hapus data siswa"}

    try:

        query = "DELETE FROM tbl_siswa WHERE nis=%s"
        values = (nis,)
        mycursor = mydb.cursor()
        mycursor.execute(query, values)
        mydb.commit()
        hasil = {"status": "berhasil hapus data siswa"}

    except Exception as e:
        print("Error: " + str(e))

    return jsonify(hasil)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5011, debug=True)
