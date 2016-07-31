import os

import pdfkit

from flask import session
from flask_restful import Resource

from server.utils.constants import TEMP_PDF_ROUTE, TYPES


class Pdf(Resource):

    def get(self):
        error = self.generate_pdf_template()
        if error:
            return error
        else:
            response = send_file(TEMP_PDF_ROUTE)
            if os.path.exists(TEMP_PDF_ROUTE):
                os.remove(TEMP_PDF_ROUTE)
            return response
        return {}

    def generate_pdf_template(self):
        if 'totals' in session and 'strongest' in session:
            options = dict(quiet='')
            filename = session['strongest']
            strongest = filename.replace('/', ' ').title()
            other_templates = self.get_other_type_articles()
            template = render_template('{}.html'.format(filename), totals=session['totals'],
                                       strongest=session['strongest'], other_types=other_templates)
            css = [os.path.join(SERVER_APP_FOLDER, 'static/main.css')];
            pdfkit.from_string(template, TEMP_PDF_ROUTE, css=css, options=options)
            return False
        else:
            return dict(
                success=False,
                message='No global totals var.. set a session')

    def get_other_type_articles(self):
        strongest = session['strongest']
        remaining = [x for x in TYPES if x != strongest]
        templates = []
        for item in remaining:
            template = render_template('{}.html'.format(
                item.replace('/', '_')))
            templates.append(template)
        return ''.join(templates)

