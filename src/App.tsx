import React, { useState } from 'react';
import { Calculator, CheckCircle2 } from 'lucide-react';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { IncomeForm } from './components/IncomeForm';
import { SCorpExpensesForm } from './components/SCorpExpensesForm';
import { ReasonableSalaryForm } from './components/ReasonableSalaryForm';
import { SubmitFormButton } from './components/SubmitFormButton';
import { SuccessPage } from './components/SuccessPage';
import { TaxDataProvider } from './context/TaxDataContext';

type Step = 'personal' | 'income' | 'expenses' | 'salary' | 'success';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('personal');

  const steps: { id: Step; title: string }[] = [
    { id: 'personal', title: 'Personal Info' },
    { id: 'income', title: 'Income' },
    { id: 'expenses', title: 'Expenses' },
    { id: 'salary', title: 'Reasonable Salary' },
  ];

  const getStepNumber = (stepId: Step) => {
    return steps.findIndex(step => step.id === stepId) + 1;
  };

  const isStepComplete = (stepId: Step) => {
    const stepOrder = steps.map(step => step.id);
    return stepOrder.indexOf(stepId) < stepOrder.indexOf(currentStep);
  };

  const handleSuccessNavigation = () => {
    setCurrentStep('success');
  };

  // If we're on the success page, show the SuccessPage component
  if (currentStep === 'success') {
    return (
      <TaxDataProvider>
        <SuccessPage onBack={() => setCurrentStep('personal')} />
      </TaxDataProvider>
    );
  }

  return (
    <TaxDataProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center py-12">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full mx-4">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">TaxCalc</h1>
          </div>

          <div className="mb-8">
            {/* Progress Bar */}
            <div className="relative mb-8">
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1 bg-gray-200"></div>
              <div 
                className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-blue-600 transition-all duration-300"
                style={{ width: `${((getStepNumber(currentStep) - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
              <div className="relative flex justify-between">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className="flex flex-col items-center group"
                  >
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-200
                        ${currentStep === step.id 
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : isStepComplete(step.id)
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-white border-gray-300 text-gray-500'}`}
                    >
                      {isStepComplete(step.id) ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        getStepNumber(step.id)
                      )}
                    </div>
                    <span 
                      className={`mt-2 text-sm font-medium transition-colors duration-200
                        ${currentStep === step.id 
                          ? 'text-blue-600'
                          : isStepComplete(step.id)
                            ? 'text-blue-600'
                            : 'text-gray-500'}`}
                    >
                      {step.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="mb-6">
              {currentStep === 'personal' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">Personal Information</h2>
                  <p className="text-gray-600 mb-6">
                    Please provide your personal details to get started with your tax calculation.
                  </p>
                  <PersonalInfoForm />
                </>
              )}

              {currentStep === 'income' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">Income Information</h2>
                  <p className="text-gray-600 mb-6">
                    Please provide your income details from both personal and business sources.
                  </p>
                  <IncomeForm />
                </>
              )}

              {currentStep === 'expenses' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">Business Expenses</h2>
                  <p className="text-gray-600 mb-6">
                    Enter your S Corporation expenses and distributions.
                  </p>
                  <SCorpExpensesForm />
                </>
              )}

              {currentStep === 'salary' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">Reasonable Salary Calculator</h2>
                  <p className="text-gray-600 mb-6">
                    Calculate a reasonable salary based on your industry and business metrics.
                  </p>
                  <ReasonableSalaryForm />
                </>
              )}
            </div>

            {/* Navigation and Submit Buttons */}
            <div className="space-y-4">
              <div className="flex justify-between gap-4">
                <button
                  onClick={() => {
                    const currentIndex = steps.findIndex(step => step.id === currentStep);
                    if (currentIndex > 0) {
                      setCurrentStep(steps[currentIndex - 1].id);
                    }
                  }}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200
                    ${getStepNumber(currentStep) === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  disabled={getStepNumber(currentStep) === 1}
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    const currentIndex = steps.findIndex(step => step.id === currentStep);
                    if (currentIndex < steps.length - 1) {
                      setCurrentStep(steps[currentIndex + 1].id);
                    }
                  }}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200
                    ${getStepNumber(currentStep) === steps.length
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  disabled={getStepNumber(currentStep) === steps.length}
                >
                  {getStepNumber(currentStep) === steps.length ? 'Complete' : 'Next'}
                </button>
              </div>

              {/* Show submit button on the last step */}
              {currentStep === 'salary' && (
                <SubmitFormButton onSuccess={handleSuccessNavigation} />
              )}
            </div>
          </div>
        </div>
      </div>
    </TaxDataProvider>
  );
}

export default App;