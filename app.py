from flask import Flask, render_template, redirect, url_for
import os

app = Flask(__name__)
app._static_folder = os.path.abspath("static")

menu = ["home", "app"]


@app.route('/')
def redirect_home():
    return redirect(url_for('home'))


@app.route('/home')
def home():
    return render_template('home.html', active="home")


@app.route('/visualization')
def visualization():
    return render_template('visualization.html', active="visualization")


@app.route('/neuralnetwork')
def neural_network():
    return render_template('neural_network.html', active="neural_network")


@app.route('/direction')
def direction():
    return render_template('direction.html', active="direction")


if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1", port=4040)
