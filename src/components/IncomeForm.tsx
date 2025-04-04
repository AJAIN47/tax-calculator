import React from 'react';
import { DollarSign, Building2, Briefcase, PiggyBank, CreditCard, Wallet } from 'lucide-react';
import { useTaxData } from '../context/TaxDataContext';

export function IncomeForm() {
  const { incomeData, setIncomeData } = useTaxData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Only allow numbers and decimal points
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setIncomeData({
        ...incomeData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Income data submitted:', incomeData);
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
          <Wallet className="w-5 h-5 text-blue-600" />
          Personal Income
        </h3>
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Salary</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="personalSalary"
                value={incomeData.personalSalary}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {incomeData.personalSalary && (
              <p className="text-sm text-gray-500 mt-1">
                {formatCurrency(incomeData.personalSalary)}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bonuses & Commissions</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="personalBonuses"
                value={incomeData.personalBonuses}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {incomeData.personalBonuses && (
              <p className="text-sm text-gray-500 mt-1">
                {formatCurrency(incomeData.personalBonuses)}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Investment Income</label>
            <div className="relative">
              <PiggyBank className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="personalInvestments"
                value={incomeData.personalInvestments}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {incomeData.personalInvestments && (
              <p className="text-sm text-gray-500 mt-1">
                {formatCurrency(incomeData.personalInvestments)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          S Corporation Income
        </h3>
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Revenue</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="sCorpRevenue"
                value={incomeData.sCorpRevenue}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {incomeData.sCorpRevenue && (
              <p className="text-sm text-gray-500 mt-1">
                {formatCurrency(incomeData.sCorpRevenue)}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Expenses</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="sCorpExpenses"
                value={incomeData.sCorpExpenses}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {incomeData.sCorpExpenses && (
              <p className="text-sm text-gray-500 mt-1">
                {formatCurrency(incomeData.sCorpExpenses)}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Shareholder Distributions</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="sCorpDistributions"
                value={incomeData.sCorpDistributions}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {incomeData.sCorpDistributions && (
              <p className="text-sm text-gray-500 mt-1">
                {formatCurrency(incomeData.sCorpDistributions)}
              </p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
      >
        Submit Income Information
      </button>
    </form>
  );
}