from interpret.provider import DashProvider
import dataset_metadata
import pickle
from interpret import show, set_visualize_provider
from flask import Flask, jsonify, request, redirect
from flask_cors import cross_origin
from dataset_metadata import column_description
import pandas as pd
import plotly
with open(dataset_metadata.file_name, 'rb') as f:
    model = pickle.load(f)


# dashboard_address = ('127.0.0.1', 7001)
# dash_provider = DashProvider.from_address(dashboard_address)
# set_visualize_provider(dash_provider)
# show(model.explain_global())

app = Flask(__name__)

LAST_EXPLANATION = None


@app.get("/dashboards")
@cross_origin()
def dashboards():
    prefix = f"http://{dashboard_address[0]}:{dashboard_address[1]}/"
    dashboard_keys = list(dash_provider.app_runner.app.pool.keys())
    return jsonify({"redirect_top": prefix + dashboard_keys[-1], "data": LAST_EXPLANATION})


@app.post("/data")
@cross_origin()
def data():
    with open('regressor.pickle', 'rb') as regressor_file:
        regressor = pickle.load(regressor_file)

    columns = ['sex', 'age', 'famsize', 'Pstatus', 'Medu', 'Fedu', 'Mjob', 'Fjob',
               'reason', 'guardian', 'traveltime', 'studytime', 'failures',
               'schoolsup', 'famsup', 'paid', 'activities', 'nursery', 'higher',
               'internet', 'romantic', 'famrel', 'freetime', 'goout', 'Dalc', 'Walc',
               'health', 'absences']
    df = pd.DataFrame(columns=columns)
    df = df.append(request.json, ignore_index=True)
    explanation = regressor.explain_local(df).visualize(0)
    explanation['data'][0]['marker']['color'] = explanation['data'][0]['marker']['color'][:-1]
    explanation['data'][0]['x'] = explanation['data'][0]['x'][:-1]
    explanation['data'][0]['y'] = explanation['data'][0]['y'][:-1]

    r_max = max(explanation['data'][0]['x'])*1.1
    r_min = min(explanation['data'][0]['x'])*1.1
    explanation['layout']['xaxis']['range'] = [r_min, r_max]
    html_plot = plotly.io.to_html(explanation)
    html_plot = html_plot.replace("Predicted", "Przewidywana ocena w procentach: ").\
                    replace("Local Explanation", "Wyjaśnienie wyniku")
    for column, desc in column_description.items():
        html_plot = html_plot.replace(f"{column} (", f"{desc} (")
        html_plot = html_plot.replace(f"{column} &", f"{desc} &")
        html_plot = html_plot.replace(f"& {column}", f"& {desc}")
    html_plot = html_plot.replace("Contribution to Prediction", "Wpływ na wynik")
    return html_plot
    # print(df)
    # print(request.json)
    # return redirect("http://localhost:3000/dashboard")


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8001)
