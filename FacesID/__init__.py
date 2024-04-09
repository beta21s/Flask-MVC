__version__ = '0.1'

from flask import Flask, session, redirect, url_for
import json
from datetime import datetime
app = Flask('FacesID')
app.config['SECRET_KEY'] = 'random'
app.debug = True

@app.template_filter()
def name_email(value):
    return value.split('@')[0]

@app.template_filter()
def to_json(value):
    def datetime_handler(x):
        if isinstance(x, datetime):
            return x.isoformat()
        raise TypeError("Unknown type")
    return json.dumps(value, default=datetime_handler)

@app.template_filter()
def len_array(value):
    return len(value)

@app.template_filter()
def to_dd_mm_yyyy_hh_mm_ss(value):
    return value.strftime("%d/%m/%Y %I:%M:%p")

@app.template_filter()
def expiry_date(start, end):
    if start <= datetime.now() and datetime.now() <= end:
        return True
    return False

@app.context_processor
def utility_processor():
    def clear_session(name):
        session[name] = None
        return ''

    def len(name):
        return len(name)

    return dict(clear_session=clear_session, len=len)

from FacesID.controllers import *