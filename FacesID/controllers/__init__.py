import os
import glob
from FacesID import app
from flask import redirect, url_for, session, request



__all__ = [os.path.basename(
    f)[:-3] for f in glob.glob(os.path.dirname(__file__) + "/*.py")]