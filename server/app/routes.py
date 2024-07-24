from flask import Blueprint, jsonify, request
from .models import TestCase
from . import db

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return 'Server is running!'

@bp.route('/testcases', methods=['GET'])
def get_testcases():
    testcases = TestCase.query.all()
    return jsonify([{
        'id': testcase.id,
        'name': testcase.name,
        'description': testcase.description
    } for testcase in testcases])

@bp.route('/add_testcase', methods=['POST'])
def add_testcase():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    new_testcase = TestCase(name=name, description=description)
    db.session.add(new_testcase)
    db.session.commit()
    return jsonify({'message': 'Test case added successfully!'})

@bp.route('/testcases/<int:id>', methods=['PUT'])
def update_testcase(id):
    data = request.get_json()
    testcase = TestCase.query.get(id)
    if not testcase:
        return jsonify({'message': 'Test case not found'}), 404
    testcase.description = data.get('description', testcase.description)
    db.session.commit()
    return jsonify({'message': 'Test case updated successfully!'})
