#!/usr/bin/env python
# -*- coding: utf-8 -*- 

from FacesID import app
from flask import render_template, session, Response, request, jsonify
import uuid, os, re, shutil
from pathlib import Path

path = "/login"

@app.route(path + "/")
def taiKhoanChiTiet():
    return render_template('auth/error/khong-co-quyen.html')