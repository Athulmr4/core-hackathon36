from flask import Flask, request, jsonify
from risk_engine import calculate_risk

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json

    sender = data.get("sender")
    receiver = data.get("receiver")
    amount = data.get("amount")

    result = calculate_risk(sender, receiver, amount)

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)