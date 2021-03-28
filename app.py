from flask import Flask, render_template, redirect, url_for
from flask_pymongo import PyMongo

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/piechart")
def piechart():
    return render_template("piechart.html")

@app.route("/map")
def map():
    return render_template("map.html")

@app.route("/barchart")
def barchart():
    return render_template("barchart.html")


if __name__ == "__main__":
    app.run(debug=True)
