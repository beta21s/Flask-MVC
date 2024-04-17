#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
from FacesID.models.ToolsModel import ToolsModel

class config():
    SERVER = '0.0.0.0'
    PORT_SERVER = 3000
    DEBUG = True

    #
    # MySQL Server
    #
    MYSQL = 'localhost'
    MYSQL_PORT = 3306
    MYSQL_USER = 'root'
    MYSQL_PASS = 'root'
    DATABASE = 'abc'