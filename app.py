from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)
preprocessing_pipeline = joblib.load('preprocessing_pipeline.pkl')
voting_regressor = joblib.load('voting_regressor_model.pkl')


@app.route('/predict', methods=['POST'])
def predict_risk_score():
    data = request.get_json()

    features = {
        'Age': data['Age'],
        'AnnualIncome': data['AnnualIncome'],
        'CreditScore': data['CreditScore'],
        'EmploymentStatus': data['EmploymentStatus'],
        'EducationLevel': data['EducationLevel'],
        'Experience': data['Experience'],
        'LoanAmount': data['LoanAmount'],
        'LoanDuration': data['LoanDuration'],
        'MaritalStatus': data['MaritalStatus'],
        'NumberOfDependents': data['NumberOfDependents'],
        'HomeOwnershipStatus': data['HomeOwnershipStatus'],
        'MonthlyDebtPayments': data['MonthlyDebtPayments'],
        'CreditCardUtilizationRate': data['CreditCardUtilizationRate'],
        'NumberOfOpenCreditLines': data['NumberOfOpenCreditLines'],
        'NumberOfCreditInquiries': data['NumberOfCreditInquiries'],
        'DebtToIncomeRatio': data['DebtToIncomeRatio'],
        'BankruptcyHistory': data['BankruptcyHistory'],
        'LoanPurpose': data['LoanPurpose'],
        'PreviousLoanDefaults': data['PreviousLoanDefaults'],
        'PaymentHistory': data['PaymentHistory'],
        'LengthOfCreditHistory': data['LengthOfCreditHistory'],
        'SavingsAccountBalance': data['SavingsAccountBalance'],
        'CheckingAccountBalance': data['CheckingAccountBalance'],
        'TotalAssets': data['TotalAssets'],
        'TotalLiabilities': data['TotalLiabilities'],
        'MonthlyIncome': data['MonthlyIncome'],
        'UtilityBillsPaymentHistory': data['UtilityBillsPaymentHistory'],
        'JobTenure': data['JobTenure'],
        'NetWorth': data['NetWorth'],
        'BaseInterestRate': data['BaseInterestRate'],
        'InterestRate': data['InterestRate'],
        'MonthlyLoanPayment': data['MonthlyLoanPayment'],
        'TotalDebtToIncomeRatio': data['TotalDebtToIncomeRatio']
    }

    features_df = pd.DataFrame([features])
    processed_features = preprocessing_pipeline.transform(features_df)
    risk_score = voting_regressor.predict(processed_features)
    return jsonify({'RiskScore': risk_score[0]})


if __name__ == '__main__':
    app.run(debug=True)

# ssh -i "serverkey.pem" ec2-user@ec2-3-6-86-78.ap-south-1.compute.amazonaws.com https://github.com/Swish78/RiskLens.git