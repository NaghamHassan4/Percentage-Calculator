from flask import request
from flask_socketio import emit, join_room, leave_room
from app.models import DataItem
from datetime import datetime

def register_socket_events(socketio):
    @socketio.on('connect')
    def on_connect():
        emit('connected', {'message': 'Connected to server'})

    @socketio.on('disconnect')
    def on_disconnect():
        print('Client disconnected')

    @socketio.on('join_room')
    def join(data):
        room = data.get('room', 'main')
        join_room(room)
        emit('joined_room', {'room': room}, room=request.sid)

    @socketio.on('leave_room')
    def leave(data):
        room = data.get('room', 'main')
        leave_room(room)
        emit('left_room', {'room': room}, room=request.sid)

    @socketio.on('calculate_percentage')
    def calc(data):
        item_id = data.get('item_id')
        input_value = float(data.get('input_value', 0))
        item = DataItem.query.get(item_id)
        if not item:
            emit('calculation_result', None)
            return
        db_value = item.db_value
        percentage = (input_value / db_value * 100) if db_value else float('inf')
        result = {
            'item_id': item_id,
            'input_value': input_value,
            'db_value': db_value,
            'percentage': round(percentage, 2) if percentage != float('inf') else 'Infinity',
            'difference': round(input_value - db_value, 2),
            'percentage_formatted': f"{percentage:.2f}%" if percentage != float('inf') else "∞%",
            'timestamp': datetime.utcnow().isoformat()
        }
        emit('calculation_result', result)
        emit('calculation_broadcast', result, room='main', include_self=False)

    @socketio.on('batch_calculate')
    def batch(data):
        results = []
        for calc in data.get('calculations', []):
            item = DataItem.query.get(calc.get('item_id'))
            if not item:
                continue
            db_value = item.db_value
            input_value = float(calc.get('input_value', 0))
            percentage = (input_value / db_value * 100) if db_value else float('inf')
            results.append({
                'item_id': item.id,
                'input_value': input_value,
                'db_value': db_value,
                'percentage': round(percentage, 2) if percentage != float('inf') else 'Infinity',
                'difference': round(input_value - db_value, 2),
                'percentage_formatted': f"{percentage:.2f}%" if percentage != float('inf') else "∞%"
            })
        emit('batch_calculation_result', {'results': results})

    @socketio.on('get_data')
    def get_data():
        items = DataItem.query.all()
        emit('data_response', {'success': True, 'data': [item.to_dict() for item in items]})
