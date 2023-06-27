import numpy as np
import pandas as pd
import pickle
import matplotlib.pyplot as plt

from dataset_metadata import dropped_columns, target_columns
from sklearn.metrics import mean_squared_error
from sklearn.utils import shuffle

from interpret.glassbox import ExplainableBoostingRegressor
from interpret import show

def main():
    dataset = pd.read_csv("student-por.csv", sep=";")
    
    dataset = dataset.drop(dropped_columns, axis=1)
    dataset = shuffle(dataset)
    dataset.reset_index(inplace=True, drop=True)
    dataset['G3'] *= 5

    sample = dataset[:1]

    with open('regressor.pickle', 'rb') as regressor_file:
        regressor = pickle.load(regressor_file) 

    explanation = regressor.explain_local(sample)
    print(explanation.data)
    vis = explanation.visualize(0)

if __name__ == "__main__":
    main()