import React, { createContext, useContext, useState } from 'react';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  employer: string;
}

interface IncomeData {
  personalSalary: string;
  personalBonuses: string;
  personalInvestments: string;
  sCorpRevenue: string;
  sCorpExpenses: string;
  sCorpDistributions: string;
}

interface SCorpExpenseData {
  officeRent: string;
  utilities: string;
  supplies: string;
  employeeSalaries: string;
  employeeBenefits: string;
  insurance: string;
  marketing: string;
  travelExpenses: string;
  professionalFees: string;
  equipmentPurchases: string;
  ownerSalary: string;
  ownerWithdrawals: string;
  profitDistribution: string;
  retainedEarnings: string;
}

interface SalaryData {
  industry: string;
  yearsExperience: string;
  education: string;
  hoursWorked: string;
  employeeCount: string;
  annualRevenue: string;
  similarPositionSalary: string;
}

interface TaxDataContextType {
  personalInfo: PersonalInfo;
  setPersonalInfo: (data: PersonalInfo) => void;
  incomeData: IncomeData;
  setIncomeData: (data: IncomeData) => void;
  expenseData: SCorpExpenseData;
  setExpenseData: (data: SCorpExpenseData) => void;
  salaryData: SalaryData;
  setSalaryData: (data: SalaryData) => void;
}

const TaxDataContext = createContext<TaxDataContextType | undefined>(undefined);

export function TaxDataProvider({ children }: { children: React.ReactNode }) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    occupation: '',
    employer: ''
  });

  const [incomeData, setIncomeData] = useState<IncomeData>({
    personalSalary: '',
    personalBonuses: '',
    personalInvestments: '',
    sCorpRevenue: '',
    sCorpExpenses: '',
    sCorpDistributions: ''
  });

  const [expenseData, setExpenseData] = useState<SCorpExpenseData>({
    officeRent: '',
    utilities: '',
    supplies: '',
    employeeSalaries: '',
    employeeBenefits: '',
    insurance: '',
    marketing: '',
    travelExpenses: '',
    professionalFees: '',
    equipmentPurchases: '',
    ownerSalary: '',
    ownerWithdrawals: '',
    profitDistribution: '',
    retainedEarnings: ''
  });

  const [salaryData, setSalaryData] = useState<SalaryData>({
    industry: '',
    yearsExperience: '',
    education: '',
    hoursWorked: '',
    employeeCount: '',
    annualRevenue: '',
    similarPositionSalary: ''
  });

  return (
    <TaxDataContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,
        incomeData,
        setIncomeData,
        expenseData,
        setExpenseData,
        salaryData,
        setSalaryData
      }}
    >
      {children}
    </TaxDataContext.Provider>
  );
}

export function useTaxData() {
  const context = useContext(TaxDataContext);
  if (context === undefined) {
    throw new Error('useTaxData must be used within a TaxDataProvider');
  }
  return context;
}