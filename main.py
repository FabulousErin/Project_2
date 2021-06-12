
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URl'] = "postgresql:myAkina93!@database-1.c6qqzgohsabf.us-east-2.rds.amazonaws.com:5432/project2"
db = SQLAlchemy(app)
# from models import db
# db.init_app(app)

class Production(db.Model):
    __tablename__ = 'production_data'

    id = db.Column(db.Integer, primary_key=True)
    state= db.Column(db.String())
    year = db.Column(db.String())
    commodity= db.Column(db.String())
    data_Item= db.Column(db.String())
    value= db.Column(db.String())
 
        
    def __repr__(self):
        return '<Production %r>' % self.state

@app.route('/test')
def test():
    results=db.session.query(Production.state, Production.commodity).all()
    return results[0][0]



@app.route('/')
@app.route('/home')
def home():
    return render_template('home.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


if __name__ == '__main__':

    # Run this when running on LOCAL server...
    app.run(debug=True)

    # ...OR run this when PRODUCTION server.
    # app.run(debug=False)
