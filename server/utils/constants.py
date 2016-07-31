import os


TYPES = ['persuade', 'compel', 'avoid/accommodate', 'collaborate', 'negotiate', 'support']
BASE_URL = os.path.abspath(os.path.dirname('wsgi.py'))
CLIENT_APP_FOLDER = os.path.join(BASE_URL, 'client')
SERVER_APP_FOLDER = os.path.join(BASE_URL, 'server')
TEMP_PDF_ROUTE = os.path.join(SERVER_APP_FOLDER, 'static/pdftemplates/out.pdf')
CSV_FILE_FOLDER = os.path.join(SERVER_APP_FOLDER, 'static/csv')
