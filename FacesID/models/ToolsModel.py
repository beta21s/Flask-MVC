#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import jsonify, current_app
from random import randint
from datetime import datetime
import re, random, string, json
import hashlib, os, math

class ToolsModel():

    @staticmethod
    def mqttResponse(message, status=200):
        data = {
            'message': message,
            'status': status
        }
        return json.dumps(data)

    @staticmethod
    def response(message, status=200):
        return jsonify(message=message, status=status)

    @staticmethod
    def getConfig(key):
        return current_app.config[key]

    @staticmethod
    def taoMatKhau(n=6):
        start = 10 ** (n - 1)
        end = (10 ** n) - 1
        return randint(start, end)

    @staticmethod
    def isEmail(email):
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if (re.match(regex, email)):
            return True
        else:
            return False

    @staticmethod
    def isJson(text):
        try:
            data = json.loads(text)
        except:
            return False
        return True

    @staticmethod
    def ramdomString(size=6, chars=string.ascii_uppercase + string.digits):
        return ''.join(random.choice(chars) for _ in range(size))

    @staticmethod
    def ramdomNumber():
        import random
        data = random.randrange(100000, 999999)
        return data

    @staticmethod
    def isTimeBetween(start='19:19:00', end='19:19:20'):
        now = datetime.now()
        current_time = now.strftime("%H:%M:%S")
        print(current_time)
        if current_time > start and current_time < end:
            print('in')
        else:
            print('out')