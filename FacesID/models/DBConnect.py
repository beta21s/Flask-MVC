#!/usr/bin/env python
# -*- coding: utf-8 -*-

import mysql.connector as mysql
from config import config
from mysql.connector import errorcode

class DBConnect():
    DB = None
    CURSOR = None

    def __init__(self):
        self.DB = mysql.connect(
            host=config.MYSQL,
            user=config.MYSQL_USER,
            passwd=config.MYSQL_PASS,
            database=config.DATABASE,
            port=config.MYSQL_PORT
        )
        self.CURSOR = self.DB.cursor(dictionary=True)

    def select(self, sql, data=None):
        # cursor.execute("SELECT * FROM foo WHERE bar = %s AND baz = %s", (param1, param2))
        try:
            if data is None:
                self.CURSOR.execute(sql)
            else:
                self.CURSOR.execute(sql, (data))
            return self.CURSOR.fetchall()
        except mysql.Error as err:
            print(err)
            print(sql)
            return False
            pass

    def select_one(self, sql, data=None):
        # cursor.execute("SELECT * FROM foo WHERE bar = %s AND baz = %s", (param1, param2))
        try:
            if data is None:
                self.CURSOR.execute(sql)
            else:
                self.CURSOR.execute(sql, (data))
            return self.CURSOR.fetchone()
        except mysql.Error as err:
            print(err)
            print(sql)
            return False
            pass

    def execute(self, sql, data=None):
        # cursor.execute("SELECT * FROM foo WHERE bar = %s AND baz = %s", (param1, param2))
        try:
            if data is None:
                self.CURSOR.execute(sql)
            else:
                self.CURSOR.execute(sql, (data))
            self.DB.commit()
            return self.CURSOR.rowcount
        except mysql.Error as err:
            print(err)
            print(sql)
            return False
            pass
