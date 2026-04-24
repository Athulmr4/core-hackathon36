from datetime import datetime
def analyze_transaction(sender_id, receiver_id, amount, transaction_history):
    score = 0
    reasons = []

    # 1️⃣ New Receiver Check
    if is_new_receiver(sender_id, receiver_id, transaction_history):
        score += 40
        reasons.append("First-time transaction with this receiver")

    # 2️⃣ Amount Risk
    if amount > 5000:
        score += 30
        reasons.append("High transaction amount")

    if amount > 10000:
        score += 20
        reasons.append("Very high transaction amount")

    # 3️⃣ Night Time Risk
    if is_night_time():
        score += 10
        reasons.append("Transaction at unusual hours")

    # 4️⃣ ✅ ADD IT HERE (Frequent Transactions Spike)
    if len(transaction_history) > 5 and amount > 3000:
        score += 10
        reasons.append("Multiple recent transactions with high amount")

    # -----------------------------
    # Determine Risk Level
    # -----------------------------
    if score < 30:
        risk_level = "LOW"
    elif score < 70:
        risk_level = "MEDIUM"
    else:
        risk_level = "HIGH"

    return {
        "risk_level": risk_level,
        "risk_score": score,
        "reasons": reasons if reasons else ["No suspicious activity detected"]
    }

    
def is_new_receiver(sender_id, receiver_id, transaction_history):
    for txn in transaction_history:
        if txn["sender"] == sender_id and txn["receiver"] == receiver_id:
            return False
    return True

def is_night_time():
    hour = datetime.now().hour
    return hour < 6 or hour > 22