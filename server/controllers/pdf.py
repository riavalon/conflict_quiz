import os

import pdfkit

from flask import session, render_template, send_file
from flask_restful import Resource

from server.utils.constants import SERVER_APP_FOLDER, TEMP_PDF_ROUTE, TYPES


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
            calculated_type = session['strongest']
            filename = calculated_type.replace('/', '_')
            strongest = filename.replace('/', ' ').title()
            other_templates = self.get_other_type_articles()
            alpha_keys = [key for key in session['totals'].keys()]
            alpha_keys.sort()
            template = render_template('{}.html'.format(filename),
                                       totals=session['totals'],
                                       alpha_keys=alpha_keys,
                                       strongest=session['strongest'],
                                       other_types=other_templates)
            css = [os.path.join(SERVER_APP_FOLDER, 'static/css/main.css')];
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

