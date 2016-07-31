import csv
import os

from flask import Flask, request
from flask_restful import Resource

from server.utils.constants import CSV_FILE_FOLDER


class Questions(Resource):

    def get(self):
        questions = self.get_questions()
        return questions

    def get_questions(self):
        with open(os.path.join(CSV_FILE_FOLDER, 'quiz_questions.csv'), 'r') as f:
            reader = csv.DictReader(f)
            fields = reader.fieldnames
            questions = []

            for row in reader:
                qdict = {}
                qdict[fields[0]] = row[fields[0]]
                qdict[fields[1]] = row[fields[1]]
                qdict[fields[2]] = row[fields[2]]
                questions.append(qdict)
        return questions
