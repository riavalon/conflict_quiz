import csv, os

import pdfkit

from flask import (Flask, render_template, request, g,
                   send_from_directory, jsonify, send_file,
                   session)

from .sessions import ItsdangerousSessionInterface


app = Flask(__name__)
app.secret_key = '234sdfasdfawefasef98sdfiuadsfjasdfusad89fjsadfas'
app.session_interface = ItsdangerousSessionInterface()
TYPES = ['persuade', 'compel', 'avoid/accommodate', 'collaborate', 'negotiate', 'support']
BASE_URL = os.path.abspath(os.path.dirname('wsgi.py'))
CLIENT_APP_FOLDER = os.path.join(BASE_URL, 'client')
SERVER_APP_FOLDER = os.path.join(BASE_URL, 'server')
TEMP_PDF_ROUTE = os.path.join(SERVER_APP_FOLDER, 'static/pdftemplates/out.pdf')


# Setup routes to find front end react app
@app.route('/js/<path:filename>')
def client_app_app_folder(filename):
    return send_from_directory(os.path.join(CLIENT_APP_FOLDER, 'js'), filename)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/questions')
def questions():
    questions = get_questions()
    return jsonify(questions)


@app.route('/files/type')
def get_skilltype_pdf():
    error = generate_pdf_template()
    if error:
        print(error)
        return jsonify(error)
    else:
        response = send_file(TEMP_PDF_ROUTE)
        if os.path.exists(TEMP_PDF_ROUTE):
            os.remove(TEMP_PDF_ROUTE)
        return response


@app.route('/api/quiz', methods=('POST', ))
def quiz():
    data = request.json['answers'];

    # get the answer key!
    with open(os.path.join(SERVER_APP_FOLDER, 'answer_key.csv'), 'r') as f:
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
    session['totals'] = totals[0]
    session['strongest'] = totals[1]
    return jsonify(totals);


def generate_pdf_template():
    if 'totals' in session and 'strongest' in session:
        options = dict(quiet='')
        filename = session['strongest']
        strongest = filename.replace('/', ' ').title()
        other_templates = get_other_type_articles()
        template = render_template('{}.html'.format(filename), totals=session['totals'],
                                   strongest=session['strongest'], other_types=other_templates)
        css = [os.path.join(SERVER_APP_FOLDER, 'static/main.css')];
        pdfkit.from_string(template, TEMP_PDF_ROUTE, css=css, options=options)
        return False
    else:
        return dict(
            success=False,
            message='No global totals var.. set a session')


def get_other_type_articles():
    strongest = session['strongest']
    remaining = [x for x in TYPES if x != strongest]
    templates = []
    for item in remaining:
        template = render_template('{}.html'.format(
            item.replace('/', '_')))
        templates.append(template)
    return ''.join(templates)


def calculate_totals(answer_key, answers):
    totals = {k: 0 for k in TYPES}
    for answer in answers:
        for key in answer.keys():
            type = answer_key[key][answer[key]]
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
    with open(os.path.join(SERVER_APP_FOLDER, 'quiz_questions.csv'), 'r') as f:
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
