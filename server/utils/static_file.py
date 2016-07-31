import os

from flask import send_from_directory
from flask_restful import Resource

from .constants import CLIENT_APP_FOLDER


class StaticFile(Resource):
    def get(self, filename):
        return send_from_directory(os.path.join(CLIENT_APP_FOLDER, 'js'), filename)
