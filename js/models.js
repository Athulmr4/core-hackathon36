/* ====================================================
   FraudShield – models.js
   Simulated "Trained" ML Model Coefficients
   ==================================================== */

const FraudShieldModels = {
  // Simple Weighted Feature Model (Simulating Logistic Regression)
  transactionModel: {
    name: "TransactionGuard v1.4 (XGBoost Simulated)",
    version: "1.4.2",
    lastTrained: "2024-04-20",
    confidence: 0.965,
    
    // Feature Weights (higher = more likely to be fraud)
    weights: {
      isUnknownRecipient: 12.5,
      isSuspiciousUPI: 35.0,
      isHighRiskPurpose: 25.0,
      isLargeAmount: 18.0,
      isUnusualHour: 15.0,
      isHighVelocity: 30.0,
      isSmurfingPattern: 20.0,
      isNewMerchant: 10.0
    },

    thresholds: {
      blocked: 75,   // Automatic block
      warning: 45,   // Show warning modal
      caution: 25    // Low-level UI warning
    }
  },

  // Phishing Detection Model
  phishingModel: {
    name: "LinkShield Neural Net (Simulated)",
    version: "2.1.0",
    confidence: 0.982,
    
    weights: {
      noHttps: 30,
      suspiciousTld: 40,
      shortenedUrl: 15,
      ipAddressUrl: 55,
      bankNameMismatch: 50,
      deceptiveKeywords: 25,
      excessiveSubdomains: 20
    }
  }
};
