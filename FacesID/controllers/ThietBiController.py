#!/usr/bin/env python
# -*- coding: utf-8 -*- 

from FacesID import app
from flask import render_template, session, Response, request, jsonify
import uuid, os, re, shutil
from pathlib import Path

from FacesID.models.ThietBiModel import ThietBiModel

path = "/thiet-bi"

@app.route(path + "/")
def dsThietBi():
    tb = ThietBiModel()
    ds = tb.danhSach()
    return render_template('auth/thiet-bi/danh-sach.html', dsTB=ds)