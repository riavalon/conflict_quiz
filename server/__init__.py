import csv, os

import pdfkit

from flask_restful import Resource, Api
from flask import Flask, render_template, send_from_directory

from controllers.pdf import Pdf
from controllers.quiz import Quiz
from controllers.questions import Questions

from utils.sessions import ItsdangerousSessionInterface
from utils.static_file import StaticFile

app = Flask(__name__)
app.secret_key = '234sdfasdfawefasef98sdfiuadsfjasdfusad89fjsadfas'
app.session_interface = ItsdangerousSessionInterface()

api = Api(app)
api.add_resource(Questions, '/api/questions', endpoint='api.questions')
api.add_resource(Quiz, '/api/quiz', endpoint='api.quiz')
api.add_resource(Pdf, '/files/type', endpoint='api.pdf')
api.add_resource(StaticFile, '/js/<path:filename>', endpoint='api.static_file')


@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
