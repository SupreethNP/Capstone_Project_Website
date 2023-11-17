from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient("mongodb://your_mongo_db_connection_string")
db = client.your_database_name
collection = db.your_collection_name

@app.route("/", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    try:
        check = collection.find_one({"email": email})
        if check and check["password"] == password:
            return jsonify({"message": "exist"})
        elif check and check["password"] != password:
            return jsonify({"message": "wrong_password"})
        else:
            return jsonify({"message": "notexist"})
    except Exception as e:
        return jsonify({"message": "fail"})
    
# @app.route("/", methods=["GET"])
# def index():
#     return jsonify({"message": "Hello, this is the home route!"})


@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    name = data.get("name")
    age = data.get("age")
    gender = data.get("gender")
    email = data.get("email")
    password = data.get("password")

    user_data = {
        "name": name,
        "age": age,
        "gender": gender,
        "email": email,
        "password": password
    }

    try:
        check = collection.find_one({"email": email})
        if check:
            return jsonify({"message": "exist"})
        else:
            collection.insert_one(user_data)
            return jsonify({"message": "notexist"})
    except Exception as e:
        return jsonify({"message": "fail"})
    
@app.route("/home", methods=["POST"])
def upload():
    imagefile= request.files['imagefile']
    image_path = "./images/" + imagefile.filename
    imagefile.save(image_path)
if __name__ == "__main__":
    
    app.run(port=8000, debug=True)
