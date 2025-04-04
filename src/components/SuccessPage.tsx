import React from 'react';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { useTaxData } from '../context/TaxDataContext';

interface SuccessPageProps {
  onBack: () => void;
}

export function SuccessPage({ onBack }: SuccessPageProps) {
  const { personalInfo } = useTaxData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center py-12">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full mx-4 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Thank You, {personalInfo.firstName}!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Your tax information has been successfully submitted. We'll process your data and send a detailed report to your email at {personalInfo.email}.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-700">
            A confirmation email has been sent with your submission details.
          </p>
        </div>

        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Return Home
        </button>
      </div>
    </div>
  );
}