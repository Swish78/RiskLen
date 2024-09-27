import React, { useState } from 'react';

interface FormData {
    Age: number | string;
    AnnualIncome: number | string;
    CreditScore: number | string;
    EmploymentStatus: string;
    EducationLevel: string;
    Experience: number | string;
    LoanAmount: number | string;
    LoanDuration: number | string;
    MaritalStatus: string;
    NumberOfDependents: number | string;
    HomeOwnershipStatus: string;
    MonthlyDebtPayments: number | string;
    CreditCardUtilizationRate: number | string;
    NumberOfOpenCreditLines: number | string;
    NumberOfCreditInquiries: number | string;
    DebtToIncomeRatio: number | string;
    BankruptcyHistory: number | string;
    LoanPurpose: string;
    PreviousLoanDefaults: number | string;
    PaymentHistory: number | string;
    LengthOfCreditHistory: number | string;
    SavingsAccountBalance: number | string;
    CheckingAccountBalance: number | string;
    TotalAssets: number | string;
    TotalLiabilities: number | string;
    MonthlyIncome: number | string;
    UtilityBillsPaymentHistory: number | string;
    JobTenure: number | string;
    NetWorth: number | string;
    BaseInterestRate: number | string;
    InterestRate: number | string;
    MonthlyLoanPayment: number | string;
    TotalDebtToIncomeRatio: number | string;
}

const App: React.FC = () => {
    const initialFormState: FormData = {
        Age: 35,
        AnnualIncome: 50000,
        CreditScore: 700,
        EmploymentStatus: 'Employed',
        EducationLevel: 'Bachelor',
        Experience: 5,
        LoanAmount: 30000,
        LoanDuration: 30,
        MaritalStatus: 'Married',
        NumberOfDependents: 2,
        HomeOwnershipStatus: 'Mortgage',
        MonthlyDebtPayments: 500,
        CreditCardUtilizationRate: 30,
        NumberOfOpenCreditLines: 3,
        NumberOfCreditInquiries: 1,
        DebtToIncomeRatio: 35,
        BankruptcyHistory: 0,
        LoanPurpose: 'Home',
        PreviousLoanDefaults: 0,
        PaymentHistory: 95,
        LengthOfCreditHistory: 10,
        SavingsAccountBalance: 5000,
        CheckingAccountBalance: 2000,
        TotalAssets: 100000,
        TotalLiabilities: 50000,
        MonthlyIncome: 4000,
        UtilityBillsPaymentHistory: 90,
        JobTenure: 5,
        NetWorth: 50000,
        BaseInterestRate: 3.5,
        InterestRate: 4.0,
        MonthlyLoanPayment: 650,
        TotalDebtToIncomeRatio: 40,
    };

    const [formData, setFormData] = useState<FormData>(initialFormState);
    const [riskScore, setRiskScore] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch risk score');
            }

            const data = await response.json();
            setRiskScore(data.RiskScore);
        } catch (err) {
            setError('An error occurred while predicting the risk score. Please try again.');
            console.error('Error predicting risk score:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const renderFormField = (key: keyof FormData, label: string) => {
        const isSelect = ['EmploymentStatus', 'EducationLevel', 'MaritalStatus', 'HomeOwnershipStatus', 'LoanPurpose'].includes(key);

        return (
            <div className="sm:col-span-3">
                <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <div className="mt-1">
                    {isSelect ? (
                        <select
                            id={key}
                            name={key}
                            value={formData[key] as string}
                            onChange={handleInputChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                            {key === 'EmploymentStatus' && (
                                <>
                                    <option value="Employed">Employed</option>
                                    <option value="Self-Employed">Self-Employed</option>
                                    <option value="Unemployed">Unemployed</option>
                                </>
                            )}
                            {key === 'EducationLevel' && (
                                <>
                                    <option value="High School">High School</option>
                                    <option value="Bachelor">Bachelor</option>
                                    <option value="Master">Master</option>
                                    <option value="Doctorate">Doctorate</option>
                                </>
                            )}
                            {key === 'MaritalStatus' && (
                                <>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                </>
                            )}
                            {key === 'HomeOwnershipStatus' && (
                                <>
                                    <option value="Own">Own</option>
                                    <option value="Mortgage">Mortgage</option>
                                    <option value="Rent">Rent</option>
                                </>
                            )}
                            {key === 'LoanPurpose' && (
                                <>
                                    <option value="Home">Home</option>
                                    <option value="Business">Business</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Education">Education</option>
                                    <option value="Debt Consolidation">Debt Consolidation</option>
                                </>
                            )}
                        </select>
                    ) : (
                        <input
                            type="number"
                            id={key}
                            name={key}
                            value={formData[key]}
                            onChange={handleInputChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Risk Assessment App</h1>
                </div>
            </header>

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <section className="mb-8 p-4 bg-white shadow sm:rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-900">About This App</h2>
                        <p className="mt-2 text-gray-700">
                            This Risk Assessment App helps users evaluate their financial risks based on personal and
                            financial information.
                            By entering the required details, users can receive a risk score that can guide their
                            financial decisions.
                        </p>
                        <div className="mt-4">
                            <h3 className="text-md font-semibold text-gray-800">How It Works:</h3>
                            <p className="mt-2 text-gray-700">
                                Simply fill out the form with your personal and financial details. Once submitted, the
                                app will
                                analyze the information and provide you with a risk score, helping you understand your
                                financial standing
                                and make informed decisions.
                            </p>
                        </div>
                    </section>

                    <div className="px-4 py-6 sm:px-0">
                        <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
                            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                                {/* Personal Information */}
                                <div>
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Personal
                                            Information</h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Please provide your personal
                                            details.</p>
                                    </div>
                                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        {renderFormField('Age', 'Age')}
                                        {renderFormField('MaritalStatus', 'Marital Status')}
                                        {renderFormField('NumberOfDependents', 'Number of Dependents')}
                                        {renderFormField('EducationLevel', 'Education Level')}
                                        {renderFormField('EmploymentStatus', 'Employment Status')}
                                        {renderFormField('JobTenure', 'Job Tenure (years)')}
                                        {renderFormField('Experience', 'Experience')}
                                    </div>
                                </div>

                                {/* Financial Information */}
                                <div className="pt-8 sm:pt-10">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Financial
                                            Information</h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Provide details about your
                                            financial status.</p>
                                    </div>
                                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        {renderFormField('AnnualIncome', 'Annual Income')}
                                        {renderFormField('MonthlyIncome', 'Monthly Income')}
                                        {renderFormField('NetWorth', 'Net Worth')}
                                        {renderFormField('TotalAssets', 'Total Assets')}
                                        {renderFormField('TotalLiabilities', 'Total Liabilities')}
                                        {renderFormField('CreditScore', 'Credit Score')}
                                        {renderFormField('MonthlyDebtPayments', 'Monthly Debt Payments')}
                                        {renderFormField('CreditCardUtilizationRate', 'Credit Card Utilization Rate')}
                                        {renderFormField('DebtToIncomeRatio', 'Debt To Income Ratio')}
                                        {renderFormField('BankruptcyHistory', 'Bankruptcy history')}
                                        {renderFormField('PreviousLoanDefaults', 'Previous Loans Defaults')}
                                        {renderFormField('SavingsAccountBalance', 'Saving Account Balance')}
                                        {renderFormField('CheckingAccountBalance' ,'Checking Account Balance')}
                                        {renderFormField('TotalDebtToIncomeRatio', 'Total Debt To Income Ratio')}

                                    </div>
                                </div>

                                {/* Loan Details */}
                                <div className="pt-8 sm:pt-10">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Loan Details</h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Specify the details of the
                                            loan you're applying for.</p>
                                    </div>
                                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        {renderFormField('LoanAmount', 'Loan Amount')}
                                        {renderFormField('LoanDuration', 'Loan Duration (months)')}
                                        {renderFormField('LoanPurpose', 'Loan Purpose')}
                                        {renderFormField('InterestRate', 'Interest Rate (%)')}
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-5">
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        {isLoading ? 'Predicting...' : 'Predict Risk Score'}
                                    </button>
                                </div>
                            </div>
                        </form>

                        {error && (
                            <div
                                className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                role="alert">
                                <strong className="font-bold">Error: </strong>
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                        {riskScore !== null && (
                            <div className="mt-8 bg-white shadow sm:rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Risk Score
                                        Prediction</h3>
                                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                                        <p>Based on the information provided, here is the predicted risk score:</p>
                                    </div>
                                    <div className="mt-5">
                                        <div className="text-4xl font-bold text-indigo-600">{riskScore}</div>
                                    </div>
                                    <div className="mt-3 text-sm text-gray-500">
                                        <p>This score is on a scale from 0 to 100, where lower scores indicate lower
                                            risk.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center">
                    <p>&copy; {new Date().getFullYear()} Risk Assessment App. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default App;