from flask import Flask,request,redirect,jsonify,session
from flask.templating import render_template
import os
import json
from classes.gis import ReadFile
from flask import send_file
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__)

@app.route('/')
def home_return():
    return render_template('index.html')


#Upload file
@app.route('/json', methods=['GET'])
def read_json():
    try:
        read_file = ReadFile()
        jj = read_file.read_file(APP_ROOT)
        return jsonify(jj)
    except Exception as e:
        return jsonify('Error Occurred!')


if __name__ == '__main__':
    app.secret_key = os.urandom(32)
    app.run(debug=True)
