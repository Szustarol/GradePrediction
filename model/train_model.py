import numpy as np
import pandas as pd
import pickle
import matplotlib.pyplot as plt

from dataset_metadata import dropped_columns, target_columns
from sklearn.metrics import mean_squared_error
from sklearn.utils import shuffle

from interpret.glassbox import ExplainableBoostingRegressor

def main():
    dataset = pd.read_csv("student-por.csv", sep=";")
    
    dataset = dataset.drop(dropped_columns, axis=1)
    dataset = shuffle(dataset)
    dataset.reset_index(inplace=True, drop=True)
    dataset['G3'] *= 5

    dataset_X, dataset_y = dataset.drop(target_columns, axis=1), dataset[target_columns]
    dataset_train_X, dataset_train_y = dataset_X[:600], dataset_y[:600]
    dataset_test_X, dataset_test_y = dataset_X[600:], dataset_y[600:]
    
    best_regressor = None
    best_score = 0
    for idx in range(10):
        dataset_train_X, dataset_train_y = shuffle(dataset_train_X, dataset_train_y)
        regressor = ExplainableBoostingRegressor(early_stopping_rounds=300)
        regressor.fit(dataset_train_X, dataset_train_y)
        score = regressor.score(dataset_train_X, dataset_train_y)
        print(f"Model {idx+1}, score: {score:1f}")
        if score > best_score:
            best_score = score
            best_regressor = regressor
    
    test_score = best_regressor.score(dataset_test_X, dataset_test_y)
    test_pred = best_regressor.predict(dataset_test_X)
    test_rmse = mean_squared_error(test_pred, dataset_test_y, squared=False)

    print("Final test R^2:", test_score)
    print("Final test RMSE:", test_rmse)

    with open('regressor.pickle', 'wb') as p_f:
        pickle.dump(best_regressor, p_f)
    residual = dataset_train_y.to_numpy().reshape(-1) - best_regressor.predict(dataset_train_X)

    plt.scatter(dataset_train_y.to_numpy(), residual)
    plt.xlabel("Ocena końcowa")
    plt.ylabel("Ocena końcowa - Ocena przewidziana")
    plt.title("Wartości residualne")
    plt.show()

if __name__ == "__main__":
    main()