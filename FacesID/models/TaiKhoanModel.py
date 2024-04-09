#!/usr/bin/env python
# -*- coding: utf-8 -*-

from FacesID.models.DBConnect import DBConnect

class TaiKhoanModel():
    db = None
    id_tai_khoan = None

    def __init__(self):
        self.db = DBConnect()

    def danhSachTheoNghe(self):
        sql = ''''''
        return self.db.select(sql, (self.id_nghe, ))


