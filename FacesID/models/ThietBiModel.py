#!/usr/bin/env python
# -*- coding: utf-8 -*-

from FacesID.models.DBConnect import DBConnect

class ThietBiModel():
    db = None
    id_tb = None
    ten_thiet_bi = None
    ma_thiet_bi = None
    ngay_tao = None

    def __init__(self):
        self.db = DBConnect()

    def danhSach(self):
        sql = '''SELECT * FROM `thietbi`'''
        return self.db.select(sql, ())


