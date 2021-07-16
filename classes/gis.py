import numpy as np
import pandas as pd
import geojson
import json
import os
import pygeoj as pj
# import geojson
class ReadFile():
    def read_file(self, APP_ROOT):
        file_name = os.path.join(APP_ROOT, 'classes/us_hospitals.geojson')
        with open(file_name, encoding='utf-8') as f:
            jj = json.load(f)
        return jj

# with open('us_hospitals.geojson', encoding='utf-8') as f:
#     gj = geojson.load(f)
# testfile = pj.load(filepath='us_hospitals.geojson')





print('Hello')