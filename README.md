## Rice-Leaf-Disease-Analyzer
Ai powered web app that uses computer vision to detect three kinds of rice leaf diseases.

Live Web App: http://rice.test.woza.work/

<br>

<img src="http://rice.test.woza.work/assets/app_pic.png" width="350"></img>

<br>

This is a prototype for an online tool that can classify three types of rice leaf diseases:
- Leaf smut
- Brown spot
- Bacterial leaf blight

The dataset used to train the model consists of 120 images, which is quite small. Although the accuracy and F1 score are consistently greater than 90%, I'm uncertain of how well this model will generalize. Therefore, at the moment this is more of an experiment than something that can be used in the real world.

Model F1 score: 100%<br>
Model Accuracy: 100%

The process used to build and train the model is described in this Kaggle kernel:<br>
https://www.kaggle.com/vbookshelf/rice-leaf-disease-analyzer-tensorflow-js-web-app


The dataset used for the training can be found here:<br>
https://www.kaggle.com/vbookshelf/rice-leaf-diseases

All javascript, html and css files used to create the web app are available in this repo.
