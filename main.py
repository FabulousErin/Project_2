
from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:myAkina93!@database-1.c6qqzgohsabf.us-east-2.rds.amazonaws.com:5432/project2"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
db.reflect()
class Production(db.Model):
    __tablename__ = 'production_data'
class CropArea(db.Model):
    __tablename__ = 'area_cleaned_data'
# db = SQLAlchemy(app)
# # from models import db
# # db.init_app(app)

# class Production(db.Model):
#     __tablename__ = 'production_data'

#     Id = db.Column(db.Integer, primary_key=True)
#     State= db.Column(db.String())
#     Year = db.Column(db.String())
#     Commodity= db.Column(db.String())
#     Data_Item= db.Column(db.String())
#     value= db.Column(db.String())
 
        
#     def __repr__(self):
#         return '<Production %r>' % self.state

@app.route('/test')
def test():
    results=db.session.query(Production.State, Production.Commodity).all()
    print(results[26][0])
    return jsonify(results)



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
