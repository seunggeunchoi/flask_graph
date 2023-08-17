from flask import Blueprint, render_template
import pandas as pd
import numpy as np

import matplotlib.pyplot as plt

import io
import base64


bp = Blueprint('graph', __name__, url_prefix='/graph')

data = pd.read_csv(r'C:\projects\nice\pybo\data\sample.csv', encoding='cp949')



# 1st graph
temp = data.loc[:,'temperature']
useBt = data.loc[:,'useBt']

plt.title("1st graph")
plt.scatter(temp,useBt) #(x값,y값) scatter(점찍기)
plt.xlabel("temperature")
plt.ylabel("useBt")
#first = plt.show()
#first

# 2nd graph
startBt = data.loc[:, 'startBt']
weekday = data.loc[:, 'weekday']

startBt_sum_by_day = data.groupby('weekday')['startBt'].mean()
label = ['Mon', 'Tue', 'Wed','Thu','Fri','Sat','Sun']
index = np.arange(len(label))

plt.bar(index,startBt_sum_by_day)
plt.title("2nd graph")
plt.xlabel("weekday")
plt.ylabel("startBt")
plt.xticks(index, label, fontsize=15)
#second = plt.show()
#second

# def get_first_graph():
#     plt.title("1st graph")
#     plt.scatter(temp, useBt)
#     plt.xlabel("temperature")
#     plt.ylabel("useBt")
#     buf = io.BytesIO()
#     plt.savefig(buf, format='png')
#     buf.seek(0)
#     img_base64 = base64.b64encode(buf.read()).decode('utf-8')
#     plt.close()
#     return img_base64
#
#
# def get_second_graph():
#     plt.bar(index, startBt_sum_by_day)
#     plt.title("2nd graph")
#     plt.xlabel("weekday")
#     plt.ylabel("startBt")
#     plt.xticks(index, label, fontsize=15)
#     buf = io.BytesIO()
#     plt.savefig(buf, format='png')
#     buf.seek(0)
#     img_base64 = base64.b64encode(buf.read()).decode('utf-8')
#     plt.close()
#     return img_base64















