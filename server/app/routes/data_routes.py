from flask import Blueprint, jsonify
from app.models import DataItem

data_bp = Blueprint('data', __name__)

@data_bp.route('/', methods=['GET'])
def get_all_data():
    items = DataItem.query.all()
    return jsonify({'success': True, 'data': [item.to_dict() for item in items]})

@data_bp.route('/<int:item_id>', methods=['GET'])
def get_data_item(item_id):
    item = DataItem.query.get_or_404(item_id)
    return jsonify({'success': True, 'data': item.to_dict()})
