from functions import get_colors
from os.path import join, dirname
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify
from ClusterThemes import ClusterThemes

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/generate-pallete', methods=['POST'])
def generatePallete():
  file = request.files["img"]
  n_colors = int(request.form["colors"])

  filename = file.filename.split('.')[0]
  extension = file.filename.split('.')[-1]
  filename = f'{filename}.{extension}'
  save_to2 = f'static/predict.png'
  file.save(save_to2)
  
  output = get_colors(filename="predict.png", n_colors=n_colors)
  theme = ClusterThemes().cluster(filename)

  api = {
    'code': 200,
    'message': f'Success generate {n_colors} colors from image {filename}.',
    'colors': output,
    'image': "static/predict.png",
    'theme': int(theme[-1]),
  }

  return jsonify(api)

@app.route('/result')
def test():
  return render_template("result.html")

@app.route('/test')
def tes2t():
  return render_template("backup.html")

if __name__ == "__main__":
  app.run('0.0.0.0', port=6969, debug=True)
