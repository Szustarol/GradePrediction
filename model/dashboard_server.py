from interpret.provider import DashProvider
import dataset_metadata
import pickle
from interpret import show, set_visualize_provider
from flask import Flask, jsonify
from flask_cors import cross_origin

with open(dataset_metadata.file_name, 'rb') as f:
    model = pickle.load(f)


dashboard_address = ('127.0.0.1', 7001)
dash_provider = DashProvider.from_address(dashboard_address)
set_visualize_provider(dash_provider)
show(model.explain_global())

app = Flask(__name__)


@app.get("/dashboards")
@cross_origin()
def dashboards():
    prefix = f"http://{dashboard_address[0]}:{dashboard_address[1]}/"
    dashboard_keys = list(dash_provider.app_runner.app.pool.keys())
    return jsonify([prefix + key for key in dashboard_keys])


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8001)
