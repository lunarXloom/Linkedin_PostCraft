import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { UserSettings } from '../types';

interface NameDialogProps {
  onSave: (settings: UserSettings) => void;
}

export function NameDialog({ onSave }: NameDialogProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave({
        name: name.trim(),
        generateWebhook: 'https://hook.us1.make.com/rhwob8qgtu9ia7t1q7y3o6dfma7b3qc8',
        publishWebhook: 'https://hook.us1.make.com/dpx1jdi9aqkku5xu9mnv6jq0pyfbi3yw',
        contentPreferences: {
          tone: 'professional',
          length: 'medium',
          includeHashtags: true,
          includeCallToAction: true,
          industry: '',
          targetAudience: ''
        },
        brandingSettings: {
          companyName: '',
          website: '',
          linkedinProfile: '',
          brandVoice: ''
        },
        automationSettings: {
          autoPublish: false,
          scheduledPosting: false,
          contentApprovalRequired: true,
          maxPostsPerDay: 3
        },
        integrationSettings: {
          slackWebhook: '',
          emailNotifications: true,
          analyticsTracking: true
        }
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 w-full max-w-sm sm:max-w-lg shadow-2xl border border-slate-200 relative overflow-hidden mx-3">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full -translate-y-12 translate-x-12 sm:-translate-y-16 sm:translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tr from-pink-500/10 to-orange-500/10 rounded-full translate-y-8 -translate-x-8 sm:translate-y-12 sm:-translate-x-12"></div>
        
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Sparkles className="text-white" size={24} />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl sm:rounded-2xl blur opacity-30 animate-pulse"></div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              Welcome to PostCraft AI
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed px-2">
              Your intelligent LinkedIn content companion. Let's get started by personalizing your experience.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2 sm:mb-3">
                What should we call you?
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 sm:py-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 text-base sm:text-lg placeholder-slate-400 bg-slate-50/50"
                placeholder="Enter your first name"
                autoFocus
              />
            </div>
            
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 sm:py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-base sm:text-lg shadow-lg shadow-indigo-500/25 flex items-center justify-center group"
            >
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={18} />
            </button>
          </form>

          {/* Features Preview */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
              <div className="p-2 sm:p-3 rounded-lg bg-slate-50">
                <div className="text-xl sm:text-2xl mb-1">🚀</div>
                <div className="text-xs font-medium text-slate-600">AI-Powered</div>
              </div>
              <div className="p-2 sm:p-3 rounded-lg bg-slate-50">
                <div className="text-xl sm:text-2xl mb-1">⚡</div>
                <div className="text-xs font-medium text-slate-600">Instant Publishing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}