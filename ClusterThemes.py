from keras_preprocessing.image import load_img 
from keras.applications.vgg16 import preprocess_input 
from keras.applications.vgg16 import VGG16 
from keras.models import Model
from sklearn.decomposition import PCA
import os
import numpy as np
import pickle

class ClusterThemes:  

  model = VGG16()
  model = Model(inputs=model.inputs, outputs=model.layers[-2].output)

  def extract_features(self, file):

      img = load_img(file, target_size=(224,224))
      img = np.array(img) 
      reshaped_img = img.reshape(1,224,224,3) 
      imgx = preprocess_input(reshaped_img)
      features = self.model.predict(imgx, use_multiprocessing=True)

      return features

  def cluster(self, img):
    os.chdir("D:\Projects\ColorPallete")
    path = r"D:\Projects\ColorPallete\static"
    os.chdir(path)

    predict_img = []

    with os.scandir(path) as files:
        for file in files:
            if file.name.endswith(".png"):
                print(file.name)
                predict_img.append(file.name)

    predict_img

    predict_data = {}
    p = r"D:\Projects\ColorPallete"

    for image in predict_img:
        try:
            feat = self.extract_features(image)
            predict_data[image] = feat
        except:
            with open(p,'wb') as file:
                pickle.dump(predict_data,file)
              
    predictFeat = np.array(list(predict_data.values()))
    predictFeat.shape

    predictFeat = predictFeat.reshape(-1,4096)
    predictFeat.shape

    pca = PCA(n_components=43, random_state=22)
    pca.fit(predictFeat)
    pred = pca.transform(predictFeat)

    os.chdir("D:\Projects\ColorPallete")
    loaded_model = pickle.load(open("k-Means.pkl", 'rb'))

    result = loaded_model.predict(pred)

    return result

