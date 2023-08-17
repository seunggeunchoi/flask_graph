from flask import Blueprint, render_template, url_for
from werkzeug.utils import redirect
import pandas as pd
import plotly.express as px
import numpy as np
import plotly.io as pio

data = pd.read_csv(r'C:\projects\nice\pybo\data\sample.csv', encoding='cp949')


bp = Blueprint('main', __name__, url_prefix='/')

@bp.route('/hello')
def hello_pybo():
    return '어 많이 반갑다'

@bp.route('/')
def index():
    return render_template('main.html')

@bp.route('/graph')
def gogogo():
    fig = drawFisrGraph()
    fig2 = drawSecondGraph()
    graph1_html = pio.to_html(fig, full_html=False)
    graph2_html = pio.to_html(fig2, full_html=False)
    lala = data.loc[:, 'temperature']
    print(lala)
    return render_template('graph.html', graph1=graph1_html, graph2 = graph2_html, lala=list(lala) )


def drawFisrGraph():
    # 첫 번째 그래프
    temp = data.loc[:, 'temperature']
    useBt = data.loc[:, 'useBt']

    fig = px.scatter(data, x=temp, y=useBt)
    fig.update_layout(title='기온에 따른 사용배터리')

    return fig

def drawSecondGraph():
    # 두 번째 그래프
    # startBt = data.loc[:, 'startBt']
    # weekday = data.loc[:, 'weekday']

    startBt_sum_by_day = data.groupby('weekday')['startBt'].mean()
    label = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    index = np.arange(len(label))

    fig2 = px.bar(x=index, y=startBt_sum_by_day)
    fig2.update_xaxes(title_text="요일")
    fig2.update_yaxes(title_text="시작배터리 평균")
    fig2.update_layout(title='요일에 따른 시작배터리의 평균')
    return fig2


