from FacesID import app
from config import config
import time, datetime, json, os
from datetime import timedelta
from flask import session, current_app, request
from FacesID.models.ToolsModel import ToolsModel
from json import JSONEncoder

app.config['SERVER'] = config.SERVER

if __name__ == '__main__':
    port = int(os.environ.get("PORT", config.PORT_SERVER))
    app.config['JSON_AS_ASCII'] = False
    app.config['MAX_CONTENT_LENGTH'] = 4096 * 1024 * 1024
    app.run(app.config['SERVER'], port=port, debug=config.DEBUG, use_reloader=True)