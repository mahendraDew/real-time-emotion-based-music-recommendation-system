import cv2
import time
import sqlite3
import numpy as np
import pandas as pd
import ipywidgets as widgets
from keras.models import load_model
from IPython.display import display, Markdown, Image

stopButton = widgets.ToggleButton()

cascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")

fernet = load_model('fernet.h5', compile=False)

label_map = ['Happy', 'Sad']

def connect_db():
    conn = sqlite3.connect('songs.sqlite')
    df = pd.read_sql("select * from songs", conn)
    conn.commit()
    conn.close()
    return df

def recommend_songs(emotion, data):    
    if (emotion=='Happy'):
        Play = data[data['genres'] =='cheerful']
        Play = Play.sort_values(by="popularity", ascending=False)
        Play = Play[['track_id','track_name','artist_name']][:7].reset_index(drop=True)
        return Play
    if (emotion=='Sad'):
        Play = data[data['genres'] =='sombre']
        Play = Play.sort_values(by="popularity", ascending=False)
        Play = Play[['track_id','track_name','artist_name']][:7].reset_index(drop=True)
        return Play
        
def play_song(data):
    for names, ids in zip(data.track_name, data.track_id):
        display(Markdown('''[{}](https://open.spotify.com/track/{})'''.format(names, ids)))

        