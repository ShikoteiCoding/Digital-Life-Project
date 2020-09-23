# Digital Life Project

## Introduction
This project is a personnal attempt to simulate a digital environment for virtual living creatures.
The project is divided in three parts:
- Graphics
- Neuro Evolutive of Augmented Topologies (NN)
- Genes

## Techs
Server-Client architecture using [Flask](https://flask.palletsprojects.com/en/1.1.x/) as a python microframework.
All code is coded in javascript and running client side.

## Graphics
The graphics are kept basic using [p5.js](https://p5js.org) and are meant to change towards more powerfull tools as the project grows.
The graphics is still an important part as it is use for the creatures to interact with the environment.

Features implemented :
- Basic design of entities (living creatures, food, eggs ...).
- Collision of entities.
- Entity detection as a vision for the living creatures.
- Basic statistics to overview the environment.

## Neural Network
The neural network is meant to be the brain of the living creatures. A real time decision is computed from environmental inputs.
The neural network is a rtNEAT. See the articles provided for further information.

## Genes
The genetic part is key because it's the way the weight / connexions of the neural network are decided through generation of simulated evolution.
The gene of a living creature is divided between :
- Encoded neural network
- Physical traits
The evolution of a neural network is deeply dependant on the encoding strategy.

## TODO
- Change the neural network layered data structure as a DAG data structure.
- Encoding the NN with direct method - according to the article.
- Code the mutate function.
- Add installation process to TODO.