from flask import Flask
import os

def create_app():
    app = Flask(__name__,
                template_folder=os.path.join(os.path.dirname(__file__), "templates"))

    from .views import main_views, graph
    app.register_blueprint(main_views.bp)
    app.register_blueprint(graph.bp)

    return app
