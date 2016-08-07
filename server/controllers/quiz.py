import csv
import os

from flask import request, session
from flask_restful import Resource

from server.utils.constants import CSV_FILE_FOLDER, TYPES


class Quiz(Resource):

    def post(self):
        data = request.json['answers']

        with open(os.path.join(CSV_FILE_FOLDER, 'answer_key.csv'), 'r') as f:
            reader = csv.DictReader(f)
            fields = reader.fieldnames
            keys = []

            for row in reader:
                key = {}
                key[fields[0]] = row[fields[0]]
                key[fields[1]] = row[fields[1]]
                key[fields[2]] = row[fields[2]]
                keys.append(key)

            answer_key = {}
            for key in keys:
                answer_key[key['num']] = {'a': key['a'], 'b': key['b']}

            totals, strongest = self.calculate_totals(answer_key, data)
        session['totals'] = totals
        session['strongest'] = strongest
        return dict(
            totals=totals,
            strongest=strongest)

    def calculate_totals(self, answer_key, answers):
        totals = {k: 0 for k in TYPES}
        for answer in answers:
            for key in answer.keys():
                type = answer_key[key][answer[key]]
                totals[type] += 1
        strongest = self.get_highest_value(totals)
        return totals, strongest


    def get_highest_value(self, totals):
        type = None
        for key in totals:
            if not type or totals[key] > totals[type]:
                type = key
        return type
