import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useTaxData } from '../context/TaxDataContext';

interface SubmitFormButtonProps {
  onSuccess: () => void;
}

export function SubmitFormButton({ onSuccess }: SubmitFormButtonProps) {
  const [result, setResult] = useState("");
  const { personalInfo, incomeData, expenseData, salaryData } = useTaxData();

  const calculateTaxes = () => {
    // Parse salary inputs
    const revenue = parseFloat(salaryData.annualRevenue) || 0;
    const marketSalary = parseFloat(salaryData.similarPositionSalary) || 0;
    const yearsExp = parseFloat(salaryData.yearsExperience) || 0;
    const hoursWorked = parseFloat(salaryData.hoursWorked) || 0;

    // Calculate reasonable salary based on multiple factors
    let reasonableSalary = marketSalary;
    reasonableSalary *= (1 + (yearsExp * 0.02)); // 2% increase per year of experience
    reasonableSalary *= (hoursWorked / 40); // Adjust for hours worked
    reasonableSalary = Math.min(reasonableSalary, revenue * 0.5); // Cap at 50% of revenue

    // Calculate taxes
    const federalTaxRate = 0.22;
    const stateTaxRate = 0.05;
    const medicareTaxRate = 0.0145;
    const socialSecurityTaxRate = 0.062;
    const socialSecurityWageCap = 160200;

    const federalTax = reasonableSalary * federalTaxRate;
    const stateTax = reasonableSalary * stateTaxRate;
    const medicareTax = reasonableSalary * medicareTaxRate;
    const socialSecurityTax = Math.min(reasonableSalary, socialSecurityWageCap) * socialSecurityTaxRate;

    const totalTax = federalTax + stateTax + medicareTax + socialSecurityTax;
    const netIncome = reasonableSalary - totalTax;

    return {
      reasonableSalary,
      federalTax,
      stateTax,
      medicareTax,
      socialSecurityTax,
      totalTax,
      netIncome
    };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setResult("Sending....");

    const taxCalculations = calculateTaxes();
    const formData = new FormData();

    // Add access key
    formData.append("access_key", "9bbfe151-112c-42cf-b506-88ec416f1c8c");

    // Add personal info
    Object.entries(personalInfo).forEach(([key, value]) => {
      formData.append(`personal_${key}`, value);
    });

    // Add income data
    Object.entries(incomeData).forEach(([key, value]) => {
      formData.append(`income_${key}`, value);
    });

    // Add expense data
    Object.entries(expenseData).forEach(([key, value]) => {
      formData.append(`expense_${key}`, value);
    });

    // Add salary data
    Object.entries(salaryData).forEach(([key, value]) => {
      formData.append(`salary_${key}`, value);
    });

    // Add tax calculations
    formData.append("tax_reasonable_salary", formatCurrency(taxCalculations.reasonableSalary));
    formData.append("tax_federal", formatCurrency(taxCalculations.federalTax));
    formData.append("tax_state", formatCurrency(taxCalculations.stateTax));
    formData.append("tax_medicare", formatCurrency(taxCalculations.medicareTax));
    formData.append("tax_social_security", formatCurrency(taxCalculations.socialSecurityTax));
    formData.append("tax_total", formatCurrency(taxCalculations.totalTax));
    formData.append("tax_net_income", formatCurrency(taxCalculations.netIncome));

    // Create a summary for the email body
    const emailBody = `
Tax Calculation Summary:
-----------------------
Reasonable Salary: ${formatCurrency(taxCalculations.reasonableSalary)}
Federal Tax (22%): ${formatCurrency(taxCalculations.federalTax)}
State Tax (5%): ${formatCurrency(taxCalculations.stateTax)}
Medicare Tax (1.45%): ${formatCurrency(taxCalculations.medicareTax)}
Social Security Tax (6.2%): ${formatCurrency(taxCalculations.socialSecurityTax)}
Total Tax: ${formatCurrency(taxCalculations.totalTax)}
Net Income: ${formatCurrency(taxCalculations.netIncome)}

Personal Information:
-------------------
Name: ${personalInfo.firstName} ${personalInfo.lastName}
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
Occupation: ${personalInfo.occupation}
Employer: ${personalInfo.employer}

Income Information:
-----------------
Personal Salary: ${incomeData.personalSalary}
Personal Bonuses: ${incomeData.personalBonuses}
Personal Investments: ${incomeData.personalInvestments}
S Corp Revenue: ${incomeData.sCorpRevenue}
S Corp Expenses: ${incomeData.sCorpExpenses}
S Corp Distributions: ${incomeData.sCorpDistributions}
    `;

    formData.append("message", emailBody);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        // Use the callback for navigation
        setTimeout(() => {
          onSuccess();
        }, 1000);
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={onSubmit}
        className="bg-green-600 text-white py-3 px-8 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2 w-full"
      >
        <Send className="w-5 h-5" />
        Submit All Information
      </button>
      {result && (
        <p className={`mt-4 text-sm font-medium ${
          result === "Sending...." ? "text-blue-600" :
          result === "Form Submitted Successfully" ? "text-green-600" :
          "text-red-600"
        }`}>
          {result}
        </p>
      )}
    </div>
  );
}