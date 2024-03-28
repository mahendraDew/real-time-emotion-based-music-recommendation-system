import cv2
import sqlite3
import numpy as np
import pandas as pd
from keras.models import load_model
from flask import Flask, Response, render_template, request, jsonify, url_for

app = Flask(__name__)

fernet = load_model('fernet.h5', compile=False)

global roi
global emotion
global emotion_img_path

def process_video():
    cap = cv2.VideoCapture(0)
    while True:
        ret, frame = cap.read()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
        faces = face_cascade.detectMultiScale(gray, 1.3, 2)
        for x,y,w,h in faces:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 255, 255), 2)
            face_roi = gray[y:y+h, x:x+w] 
            face_roi = np.reshape((cv2.resize(face_roi, (48,48))) / 255.0, (1,48,48,1))
            global roi
            roi = face_roi
        
        ret, jpeg = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n' 
               b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')
    cap.release()

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
 
          
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start_streaming', methods=['GET','POST'])
def start_streaming():
    return Response(process_video(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/stop_streaming', methods=['GET','POST'])
def stop_streaming():
    return jsonify({'success': True})
               
@app.route('/emotion_prediction_function', methods=['POST', 'GET'])
def emotion_prediction_function():
    global roi
    model = load_model('fernet.h5', compile=False)
    label_map = ['Happy', 'Sad']
    img_path = ['css/Happy.png' , 'css/Sad.png']
    model_pred = fernet.predict(roi, verbose=0)
    label = np.where(model_pred > 0.5, 1, 0)
    global emotion
    emotion = label_map[label[0][0]]
    global emotion_img_path
    emotion_img_path = img_path[label[0][0]]
    return render_template('index.html', emotion_prediction_label=emotion, image_path=emotion_img_path)    

@app.route('/static/<path:path>', methods=['GET'])
def send_static(path):
    return send_from_directory('static', path)

@app.route('/recommend_tracks_function', methods=['POST', 'GET'])
def recommend_tracks_function():
    song_data = connect_db()
    global emotion
    data = recommend_songs(emotion, song_data)
    song_dict = {}
    for i in range(7):
        names = data.iloc[i,1] + ' - '+ data.iloc[i,2]
        url = "https://open.spotify.com/track/" + data.iloc[i,0]
        song_dict[names] = url
    return render_template("index.html", emotion_prediction_label=emotion, image_path=emotion_img_path, results=song_dict)

if __name__ == '__main__':
    app.run(debug=True,  use_reloader=False)
    