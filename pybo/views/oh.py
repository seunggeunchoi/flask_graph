import plotly
from plotly.graph_objs import Scatter, Layout
import pandas as pd
import plotly.express as px
import numpy as np

data = pd.read_csv(r'C:\projects\nice\pybo\data\sample.csv', encoding='cp949')

def drawFisrGraph():
    # 첫 번째 그래프
    temp = data.loc[:, 'temperature']
    useBt = data.loc[:, 'useBt']

    fig = px.scatter(data, x=temp, y=useBt)
    fig.update_layout(title='기온에 따른 사용배터리')
    return fig

def drawSecondGraph():
    # 두 번째 그래프
    startBt = data.loc[:, 'startBt']
    weekday = data.loc[:, 'weekday']

    startBt_sum_by_day = data.groupby('weekday')['startBt'].mean()
    label = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    index = np.arange(len(label))

    fig2 = px.bar(x=label, y=startBt_sum_by_day)
    fig2.update_xaxes(title_text="요일")
    fig2.update_yaxes(title_text="시작배터리 평균")
    fig2.update_layout(title='요일에 따른 시작배터리의 평균')
    return fig2


route_values = data['routeNo'].unique().tolist()
print(route_values)

