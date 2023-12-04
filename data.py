from flask import Flask, request,make_response,jsonify
#from flask_restful import Resource,Api
from flask_cors import CORS
from functools import wraps
import pymysql

app = Flask(__name__)
#api = Api(app)
cors = CORS(app)

conn = pymysql.connect(host="localhost", user="root", password="", db="stock_mutual_funds_management")


@app.route('/users' , methods = ['GET'])
def get():
    conn = pymysql.connect(host="localhost",user="root",password="",db="stock_mutual_funds_management")
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("select * from fund")
    output = cur.fetchall()

    for x in output:
        print(x);

    conn.close()
    return jsonify(output);
@app.route('/usersedit' , methods = ['GET'])
def edit():
    conn = pymysql.connect(host="localhost",user="root",password="",db="stock_mutual_funds_management")
    cur = conn.cursor(pymysql.cursors.DictCursor)
    id = int(request.args.get('fund_id'))
    sql = f"select * from fund where fund_id = {id}";
    cur.execute(sql)
    output = cur.fetchall()
    for x in output:
        print(x)
    conn.close()
    return jsonify(output);

@app.route('/users' , methods = ['DELETE'])
def delete():
    conn = pymysql.connect(host="localhost",user="root",password="",db="stock_mutual_funds_management")
    cur = conn.cursor(pymysql.cursors.DictCursor)
    id = int(request.args.get('fund_id'))
    sql = f"DELETE from fund where fund_id = {id}";
    cur.execute(sql)
    output = cur.fetchall()
    conn.commit()
    print(cur.rowcount,"record deleted")
    return jsonify("Record Deleted Successfully");


@app.route('/users', methods=['POST'])
def users():
    try:
        raw_json = request.get_json()
        fund_id = raw_json['fund_id']
        fund_name = raw_json['fund_name']
        fund_type = raw_json['fund_type']
        inception_date = raw_json['inception_date']
        fund_manager = raw_json['fund_manager']

        with conn.cursor() as cursor:
            sql = "INSERT INTO fund (fund_id, fund_name, fund_type, inception_date, fund_manager) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(sql, (fund_id, fund_name, fund_type, inception_date, fund_manager))
            conn.commit()

        return jsonify("Record Inserted Successfully")
    except Exception as e:
        return jsonify(str(e)), 400



@app.route('/users', methods=['PUT'])
def update():
    conn = pymysql.connect(host="localhost", user="root", password="", db="stock_mutual_funds_management")
    raw_json = request.get_json()

    fund_id = raw_json['fund_id']
    fund_name = raw_json['fund_name']
    fund_type = raw_json['fund_type']
    inception_date = raw_json['inception_date']
    fund_manager = raw_json['fund_manager']

    sql = f"update fund set fund_id='{fund_id}', fund_name='{fund_name}', fund_type='{fund_type}', inception_date='{inception_date}', fund_manager='{fund_manager}' where fund_id='{fund_id}'"
    cur = conn.cursor()
    cur.execute(sql)
    conn.commit()

    return jsonify("Record Updated Successfully")




if __name__ == "__main__":
    app.run(host="0.0.0.0",port=int("1234"),debug=True)




