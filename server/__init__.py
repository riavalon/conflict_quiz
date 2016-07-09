import csv, os

from flask import (Flask, render_template, request, g,
                   send_from_directory)


app = Flask(__name__)
TYPES = ['persuade', 'compel', 'avoid/accommodate', 'collaborate', 'negotiate', 'support']
BASE_URL = os.path.abspath(os.path.dirname('wsgi.py'))
print(BASE_URL)
CLIENT_APP_FOLDER = os.path.join(BASE_URL, 'client')


# Setup routes to find front end react app
@app.route('/js/<path:filename>')
def client_app_app_folder(filename):
    print(filename)
    return send_from_directory(os.path.join(CLIENT_APP_FOLDER, 'js'), filename)


@app.route('/')
def index():
    return render_template('index.html', message="Hello, world!")


@app.route('/quiz', methods=('GET', 'POST'))
def quiz():
    if request.method == 'POST':
        data = request.form.to_dict()
        with open('answer_key.csv', 'r') as f:
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

        totals = calculate_totals(answer_key, data)

        return render_template('results.html', totals=totals[0], strongest=totals[1])

    questions = get_questions()

    # return first five questions of the quiz
    return render_template('quiz.html', questions=questions)


def calculate_totals(answer_key, answers):
    totals = {k: 0 for k in TYPES}
    for answer in answers:
        type = answer_key[answer][answers[answer]]
        totals[type] += 1
    strongest = get_highest_value(totals)
    return totals, strongest


def get_highest_value(totals):
    type = None
    for key in totals:
        if not type or totals[key] > totals[type]:
            type = key
    return type


def get_questions():
    with open('quiz_questions.csv', 'r') as f:
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

if __name__ == '__main__':
    app.run(debug=True)
