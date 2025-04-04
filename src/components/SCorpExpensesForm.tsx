import React from 'react';
import { DollarSign, Building2, Briefcase, Receipt, CreditCard, Wallet, ArrowDownToLine, Banknote, FileSpreadsheet, Calculator } from 'lucide-react';
import { useTaxData } from '../context/TaxDataContext';

export function SCorpExpensesForm() {
  const { expenseData, setExpenseData } = useTaxData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Only allow numbers and decimal points
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setExpenseData({
        ...expenseData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('S Corp expense data submitted:', expenseData);
  };

  const formatCurrency = (value: string) => {
    if (!value) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(parseFloat(value));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          Operating Expenses
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Office Rent</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="officeRent"
                value={expenseData.officeRent}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {expenseData.officeRent && (
              <p className="text-sm text-gray-500 mt-1">{formatCurrency(expenseData.officeRent)}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Utilities</label>
            <div className="relative">
              <Receipt className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="utilities"
                value={expenseData.utilities}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {expenseData.utilities && (
              <p className="text-sm text-gray-500 mt-1">{formatCurrency(expenseData.utilities)}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Office Supplies</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="supplies"
                value={expenseData.supplies}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {expenseData.supplies && (
              <p className="text-sm text-gray-500 mt-1">{formatCurrency(expenseData.supplies)}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee Salaries</label>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="employeeSalaries"
                value={expenseData.employeeSalaries}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {expenseData.employeeSalaries && (
              <p className="text-sm text-gray-500 mt-1">{formatCurrency(expenseData.employeeSalaries)}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee Benefits</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="employeeBenefits"
                value={expenseData.employeeBenefits}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {expenseData.employeeBenefits && (
              <p className="text-sm text-gray-500 mt-1">{formatCurrency(expenseData.employeeBenefits)}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Insurance</label>
            <div className="relative">
              <FileSpreadsheet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="insurance"
                value={expenseData.insurance}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {expenseData.insurance && (
              <p className="text-sm text-gray-500 mt-1">{formatCurrency(expenseData.insurance)}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Marketing & Advertising</label>
            <div className="relative">
              <ArrowDownToLine className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="marketing"
                value={expenseData.marketing}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {expenseData.marketing && (
              <p className="text-sm text-gray-500 mt-1">{formatCurrency(expenseData.marketing)}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Travel Expenses</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="travelExpenses"
                value={expenseData.travelExpenses}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {expenseData.travelExpenses && (
              <p className="text-sm text-gray-500 mt-1">{formatCurrency(expenseData.travelExpenses)}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Fees</label>
            <div className="relative">
              <Calculator className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="professionalFees"
                value={expenseData.professionalFees}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {expenseData.professionalFees && (
              <p className="text-sm text-gray-500 mt-1">{formatCurrency(expenseData.professionalFees)}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Purchases</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="equipmentPurchases"
                value={expenseData.equipmentPurchases}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {expenseData.equipmentPurchases && (
              <p className="text-sm text-gray-500 mt-1">{formatCurrency(expenseData.equipmentPurchases)}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Banknote className="w-5 h-5 text-blue-600" />
          Owner Transactions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner Salary</label>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="ownerSalary"
                value={expenseData.ownerSalary}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {expenseData.ownerSalary && (
              <p className="text-sm text-gray-500 mt-1">{formatCurrency(expenseData.ownerSalary)}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner Withdrawals</label>
            <div className="relative">
              <ArrowDownToLine className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="ownerWithdrawals"
                value={expenseData.ownerWithdrawals}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {expenseData.ownerWithdrawals && (
              <p className="text-sm text-gray-500 mt-1">{formatCurrency(expenseData.ownerWithdrawals)}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Profit Distribution</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="profitDistribution"
                value={expenseData.profitDistribution}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {expenseData.profitDistribution && (
              <p className="text-sm text-gray-500 mt-1">{formatCurrency(expenseData.profitDistribution)}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Retained Earnings</label>
            <div className="relative">
              <Calculator className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="retainedEarnings"
                value={expenseData.retainedEarnings}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {expenseData.retainedEarnings && (
              <p className="text-sm text-gray-500 mt-1">{formatCurrency(expenseData.retainedEarnings)}</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
      >
        Submit S Corp Expenses
      </button>
    </form>
  );
}