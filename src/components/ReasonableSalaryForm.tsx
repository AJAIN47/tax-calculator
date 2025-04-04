import React, { useState, useEffect } from 'react';
import { DollarSign, Briefcase, Building2, BarChart, Users, GraduationCap, Clock, Calculator } from 'lucide-react';
import { useTaxData } from '../context/TaxDataContext';

export function ReasonableSalaryForm() {
  const { salaryData, setSalaryData, incomeData } = useTaxData();
  const [taxCalculations, setTaxCalculations] = useState({
    reasonableSalary: 0,
    federalTax: 0,
    stateTax: 0,
    medicareTax: 0,
    socialSecurityTax: 0,
    totalTax: 0,
    netIncome: 0
  });
  const [showCalculations, setShowCalculations] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'industry' || name === 'education') {
      setSalaryData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      // Only allow numbers for numeric fields
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setSalaryData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    }
  };

  const calculateTax = () => {
    // Parse salary inputs
    const revenue = parseFloat(salaryData.annualRevenue) || 0;
    const marketSalary = parseFloat(salaryData.similarPositionSalary) || 0;
    const yearsExp = parseFloat(salaryData.yearsExperience) || 0;
    const hoursWorked = parseFloat(salaryData.hoursWorked) || 0;

    // Calculate reasonable salary based on multiple factors
    let reasonableSalary = marketSalary;
    
    // Adjust for experience
    reasonableSalary *= (1 + (yearsExp * 0.02)); // 2% increase per year of experience
    
    // Adjust for hours worked (assuming 40 hours is standard)
    reasonableSalary *= (hoursWorked / 40);
    
    // Adjust for revenue (shouldn't exceed 50% of revenue)
    reasonableSalary = Math.min(reasonableSalary, revenue * 0.5);

    // Calculate taxes
    const federalTaxRate = 0.22; // Simplified federal tax rate
    const stateTaxRate = 0.05; // Example state tax rate
    const medicareTaxRate = 0.0145;
    const socialSecurityTaxRate = 0.062;
    const socialSecurityWageCap = 160200; // 2023 wage cap

    const federalTax = reasonableSalary * federalTaxRate;
    const stateTax = reasonableSalary * stateTaxRate;
    const medicareTax = reasonableSalary * medicareTaxRate;
    const socialSecurityTax = Math.min(reasonableSalary, socialSecurityWageCap) * socialSecurityTaxRate;

    const totalTax = federalTax + stateTax + medicareTax + socialSecurityTax;
    const netIncome = reasonableSalary - totalTax;

    setTaxCalculations({
      reasonableSalary,
      federalTax,
      stateTax,
      medicareTax,
      socialSecurityTax,
      totalTax,
      netIncome
    });
    setShowCalculations(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          Professional Background
        </h3>
        
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                name="industry"
                value={salaryData.industry}
                onChange={handleChange}
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="construction">Construction</option>
                <option value="services">Professional Services</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="yearsExperience"
                value={salaryData.yearsExperience}
                onChange={handleChange}
                placeholder="0"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                name="education"
                value={salaryData.education}
                onChange={handleChange}
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Education Level</option>
                <option value="highschool">High School</option>
                <option value="associate">Associate's Degree</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="doctorate">Doctorate</option>
                <option value="professional">Professional Degree</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart className="w-5 h-5 text-blue-600" />
          Business Metrics
        </h3>
        
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hours Worked per Week</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="hoursWorked"
                value={salaryData.hoursWorked}
                onChange={handleChange}
                placeholder="0"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Employees</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="employeeCount"
                value={salaryData.employeeCount}
                onChange={handleChange}
                placeholder="0"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Business Revenue</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="annualRevenue"
                value={salaryData.annualRevenue}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Similar Position Market Salary</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="similarPositionSalary"
                value={salaryData.similarPositionSalary}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={calculateTax}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
      >
        <Calculator className="w-5 h-5" />
        Calculate Reasonable Salary & Taxes
      </button>

      {showCalculations && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            Tax Calculations
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Reasonable Salary:</span>
              <span className="font-semibold text-gray-800">{formatCurrency(taxCalculations.reasonableSalary)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Federal Tax (22%):</span>
              <span className="font-semibold text-gray-800">{formatCurrency(taxCalculations.federalTax)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">State Tax (5%):</span>
              <span className="font-semibold text-gray-800">{formatCurrency(taxCalculations.stateTax)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Medicare Tax (1.45%):</span>
              <span className="font-semibold text-gray-800">{formatCurrency(taxCalculations.medicareTax)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Social Security Tax (6.2%):</span>
              <span className="font-semibold text-gray-800">{formatCurrency(taxCalculations.socialSecurityTax)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 text-lg font-bold">
              <span className="text-gray-800">Total Tax:</span>
              <span className="text-gray-800">{formatCurrency(taxCalculations.totalTax)}</span>
            </div>
            <div className="flex justify-between items-center py-2 text-lg font-bold text-blue-600">
              <span>Net Income:</span>
              <span>{formatCurrency(taxCalculations.netIncome)}</span>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}