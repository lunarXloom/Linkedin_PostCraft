import React, { useState } from 'react';
import { 
  Settings, 
  Link, 
  Shield, 
  ChevronDown, 
  ChevronUp, 
  User, 
  Briefcase, 
  Zap, 
  BarChart3,
  Globe,
  MessageSquare,
  Clock,
  Target,
  Palette,
  Bell,
  CheckCircle2
} from 'lucide-react';
import type { UserSettings } from '../types';

interface WebhookSettingsProps {
  settings: UserSettings;
  onSave: (settings: UserSettings) => void;
}

export function WebhookSettings({ settings, onSave }: WebhookSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'webhooks' | 'content' | 'branding' | 'automation' | 'integrations'>('webhooks');
  
  // Form states
  const [formData, setFormData] = useState({
    name: settings.name || '',
    generateWebhook: settings.generateWebhook || '',
    publishWebhook: settings.publishWebhook || '',
    contentPreferences: settings.contentPreferences || {
      tone: 'professional' as const,
      length: 'medium' as const,
      includeHashtags: true,
      includeCallToAction: true,
      industry: '',
      targetAudience: ''
    },
    brandingSettings: settings.brandingSettings || {
      companyName: '',
      website: '',
      linkedinProfile: '',
      brandVoice: ''
    },
    automationSettings: settings.automationSettings || {
      autoPublish: false,
      scheduledPosting: false,
      contentApprovalRequired: true,
      maxPostsPerDay: 3
    },
    integrationSettings: settings.integrationSettings || {
      slackWebhook: '',
      emailNotifications: true,
      analyticsTracking: true
    }
  });
  
  // Update form data when settings change
  React.useEffect(() => {
    setFormData({
      name: settings.name || '',
      generateWebhook: settings.generateWebhook || '',
      publishWebhook: settings.publishWebhook || '',
      contentPreferences: settings.contentPreferences || {
        tone: 'professional' as const,
        length: 'medium' as const,
        includeHashtags: true,
        includeCallToAction: true,
        industry: '',
        targetAudience: ''
      },
      brandingSettings: settings.brandingSettings || {
        companyName: '',
        website: '',
        linkedinProfile: '',
        brandVoice: ''
      },
      automationSettings: settings.automationSettings || {
        autoPublish: false,
        scheduledPosting: false,
        contentApprovalRequired: true,
        maxPostsPerDay: 3
      },
      integrationSettings: settings.integrationSettings || {
        slackWebhook: '',
        emailNotifications: true,
        analyticsTracking: true
      }
    });
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...settings,
      name: formData.name.trim(),
      generateWebhook: formData.generateWebhook.trim(),
      publishWebhook: formData.publishWebhook.trim(),
      contentPreferences: formData.contentPreferences,
      brandingSettings: formData.brandingSettings,
      automationSettings: formData.automationSettings,
      integrationSettings: formData.integrationSettings
    });
    setIsOpen(false);
  };

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User, color: 'from-slate-500 to-slate-700' },
    { id: 'webhooks' as const, label: 'API Endpoints', icon: Link, color: 'from-blue-500 to-cyan-500' },
    { id: 'content' as const, label: 'Content', icon: MessageSquare, color: 'from-purple-500 to-pink-500' },
    { id: 'branding' as const, label: 'Branding', icon: Palette, color: 'from-orange-500 to-red-500' },
    { id: 'automation' as const, label: 'Automation', icon: Zap, color: 'from-emerald-500 to-teal-500' },
    { id: 'integrations' as const, label: 'Integrations', icon: BarChart3, color: 'from-indigo-500 to-purple-500' }
  ];

  return (
    <div className="w-full">
      {/* Settings Toggle */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-slate-600 hover:text-slate-800 transition-colors duration-200 group text-sm sm:text-base"
        >
          <Settings size={16} className="mr-2 group-hover:rotate-90 transition-transform duration-200" />
          <span className="font-medium">Advanced Configuration</span>
          {isExpanded ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
        </button>
      </div>

      {/* Expanded Settings Preview */}
      {isExpanded && (
        <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200 mb-4 sm:mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                <Shield className="text-white" size={16} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Platform Configuration</h3>
                <p className="text-sm sm:text-base text-slate-600 hidden sm:block">Customize your content generation and publishing workflow</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-lg sm:rounded-xl transition-all duration-200 font-semibold shadow-lg shadow-slate-900/25 flex items-center group text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <Settings size={16} className="mr-2 group-hover:rotate-90 transition-transform duration-200" />
              Configure Platform
            </button>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="flex items-center">
                  <User size={14} className="text-slate-500 mr-1 sm:mr-2" />
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">Profile</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                {settings.name || 'Not configured'}
              </p>
            </div>

            {/* API Status */}
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="flex items-center">
                  <Link size={14} className="text-blue-500 mr-1 sm:mr-2" />
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">API Endpoints</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${settings.generateWebhook && settings.publishWebhook ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                {settings.generateWebhook && settings.publishWebhook ? 'Fully configured' : 'Needs configuration'}
              </p>
            </div>

            {/* Content Preferences */}
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="flex items-center">
                  <MessageSquare size={14} className="text-purple-500 mr-1 sm:mr-2" />
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">Content Style</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 capitalize">
                {settings.contentPreferences?.tone || 'professional'} • {settings.contentPreferences?.length || 'medium'}
              </p>
            </div>

            {/* Branding */}
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="flex items-center">
                  <Palette size={14} className="text-orange-500 mr-1 sm:mr-2" />
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">Brand Voice</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${settings.brandingSettings?.companyName ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                {settings.brandingSettings?.companyName || 'Not configured'}
              </p>
            </div>

            {/* Automation */}
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="flex items-center">
                  <Zap size={14} className="text-emerald-500 mr-1 sm:mr-2" />
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">Automation</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${settings.automationSettings?.autoPublish ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                {settings.automationSettings?.autoPublish ? 'Auto-publish enabled' : 'Manual approval'}
              </p>
            </div>

            {/* Integrations */}
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="flex items-center">
                  <BarChart3 size={14} className="text-indigo-500 mr-1 sm:mr-2" />
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">Integrations</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${settings.integrationSettings?.emailNotifications ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                {settings.integrationSettings?.emailNotifications ? 'Notifications active' : 'Basic setup'}
              </p>
            </div>

            {/* Performance */}
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="flex items-center">
                  <Target size={14} className="text-rose-500 mr-1 sm:mr-2" />
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">Performance</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                Max {settings.automationSettings?.maxPostsPerDay || 3} posts/day
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                    <Settings className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold">Platform Configuration</h3>
                    <p className="text-slate-300 text-sm sm:text-base hidden sm:block">Customize your content generation workflow</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors duration-200 text-xl sm:text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-slate-50 px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-b border-slate-200">
              <div className="flex space-x-1 overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-medium transition-all duration-200 whitespace-nowrap text-sm sm:text-base ${
                        activeTab === tab.id
                          ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                      }`}
                    >
                      <Icon size={14} className="mr-1 sm:mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[calc(90vh-200px)]">
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-slate-500 to-slate-700 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <User className="text-white" size={20} />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Profile Settings</h4>
                      <p className="text-sm sm:text-base text-slate-600 px-4">Update your personal information and preferences</p>
                    </div>

                    <div className="max-w-md mx-auto">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 sm:mb-3">
                          Display Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-xl border-2 border-slate-200 focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10 transition-all duration-200 placeholder-slate-400 text-sm sm:text-base"
                            placeholder="Enter your name"
                            required
                          />
                        </div>
                        <p className="mt-1 sm:mt-2 text-xs text-slate-500">This name will appear in your welcome message and be sent to your webhooks</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Webhooks Tab */}
                {activeTab === 'webhooks' && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Link className="text-white" size={20} />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">API Endpoints</h4>
                      <p className="text-sm sm:text-base text-slate-600 px-4">Configure your webhook URLs for content generation and publishing</p>
                    </div>

                    <div className="space-y-4 sm:space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 sm:mb-3">
                          Content Generation Webhook
                        </label>
                        <div className="relative">
                          <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                          <input
                            type="url"
                            value={formData.generateWebhook}
                            onChange={(e) => setFormData({...formData, generateWebhook: e.target.value})}
                            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder-slate-400 text-sm sm:text-base"
                            placeholder="https://hook.us1.make.com/..."
                            required
                          />
                        </div>
                        <p className="mt-1 sm:mt-2 text-xs text-slate-500">Receives topic data and returns generated content</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 sm:mb-3">
                          Publishing Webhook
                        </label>
                        <div className="relative">
                          <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                          <input
                            type="url"
                            value={formData.publishWebhook}
                            onChange={(e) => setFormData({...formData, publishWebhook: e.target.value})}
                            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder-slate-400 text-sm sm:text-base"
                            placeholder="https://hook.us1.make.com/..."
                            required
                          />
                        </div>
                        <p className="mt-1 sm:mt-2 text-xs text-slate-500">Receives final post content for LinkedIn publishing</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Content Preferences Tab */}
                {activeTab === 'content' && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <MessageSquare className="text-white" size={20} />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Content Preferences</h4>
                      <p className="text-sm sm:text-base text-slate-600 px-4">Define your content style and target audience</p>
                    </div>

                    <div className="space-y-4 sm:space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 sm:mb-3">Content Tone</label>
                        <select
                          value={formData.contentPreferences.tone}
                          onChange={(e) => setFormData({...formData, contentPreferences: {...formData.contentPreferences, tone: e.target.value as any}})}
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 text-sm sm:text-base"
                        >
                          <option value="professional">Professional</option>
                          <option value="casual">Casual & Friendly</option>
                          <option value="thought-leader">Thought Leadership</option>
                          <option value="storytelling">Storytelling</option>
                          <option value="data-driven">Data-Driven</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 sm:mb-3">Post Length</label>
                        <select
                          value={formData.contentPreferences.length}
                          onChange={(e) => setFormData({...formData, contentPreferences: {...formData.contentPreferences, length: e.target.value as any}})}
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 text-sm sm:text-base"
                        >
                          <option value="short">Short (1-2 paragraphs)</option>
                          <option value="medium">Medium (3-4 paragraphs)</option>
                          <option value="long">Long (5+ paragraphs)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 sm:mb-3">Industry/Niche</label>
                        <input
                          type="text"
                          value={formData.contentPreferences.industry}
                          onChange={(e) => setFormData({...formData, contentPreferences: {...formData.contentPreferences, industry: e.target.value}})}
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 placeholder-slate-400 text-sm sm:text-base"
                          placeholder="e.g., SaaS, Marketing, Finance"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 sm:mb-3">Target Audience</label>
                        <input
                          type="text"
                          value={formData.contentPreferences.targetAudience}
                          onChange={(e) => setFormData({...formData, contentPreferences: {...formData.contentPreferences, targetAudience: e.target.value}})}
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 placeholder-slate-400 text-sm sm:text-base"
                          placeholder="e.g., Startup founders, Marketing professionals"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                      <div className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div>
                          <div className="font-semibold text-slate-900 text-sm sm:text-base">Include Hashtags</div>
                          <div className="text-xs sm:text-sm text-slate-600">Add relevant hashtags to posts</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.contentPreferences.includeHashtags}
                            onChange={(e) => setFormData({...formData, contentPreferences: {...formData.contentPreferences, includeHashtags: e.target.checked}})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div>
                          <div className="font-semibold text-slate-900 text-sm sm:text-base">Call-to-Action</div>
                          <div className="text-xs sm:text-sm text-slate-600">Include engagement prompts</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.contentPreferences.includeCallToAction}
                            onChange={(e) => setFormData({...formData, contentPreferences: {...formData.contentPreferences, includeCallToAction: e.target.checked}})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Branding Tab */}
                {activeTab === 'branding' && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Palette className="text-white" size={20} />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Brand Identity</h4>
                      <p className="text-sm sm:text-base text-slate-600 px-4">Configure your brand voice and company information</p>
                    </div>

                    <div className="space-y-4 sm:space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 sm:mb-3">Company Name</label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                          <input
                            type="text"
                            value={formData.brandingSettings.companyName}
                            onChange={(e) => setFormData({...formData, brandingSettings: {...formData.brandingSettings, companyName: e.target.value}})}
                            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 placeholder-slate-400 text-sm sm:text-base"
                            placeholder="Your Company Name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 sm:mb-3">Website URL</label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                          <input
                            type="url"
                            value={formData.brandingSettings.website}
                            onChange={(e) => setFormData({...formData, brandingSettings: {...formData.brandingSettings, website: e.target.value}})}
                            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 placeholder-slate-400 text-sm sm:text-base"
                            placeholder="https://yourcompany.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 sm:mb-3">LinkedIn Profile</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                          <input
                            type="url"
                            value={formData.brandingSettings.linkedinProfile}
                            onChange={(e) => setFormData({...formData, brandingSettings: {...formData.brandingSettings, linkedinProfile: e.target.value}})}
                            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 placeholder-slate-400 text-sm sm:text-base"
                            placeholder="https://linkedin.com/in/yourprofile"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 sm:mb-3">Brand Voice Description</label>
                        <textarea
                          value={formData.brandingSettings.brandVoice}
                          onChange={(e) => setFormData({...formData, brandingSettings: {...formData.brandingSettings, brandVoice: e.target.value}})}
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 placeholder-slate-400 resize-none text-sm sm:text-base"
                          rows={3}
                          placeholder="Describe your brand's personality, values, and communication style..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Automation Tab */}
                {activeTab === 'automation' && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Zap className="text-white" size={20} />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Automation Settings</h4>
                      <p className="text-sm sm:text-base text-slate-600 px-4">Configure automated publishing and workflow rules</p>
                    </div>

                    <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                      <div className="flex items-center justify-between p-4 sm:p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <div>
                          <div className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">Auto-Publish Posts</div>
                          <div className="text-xs sm:text-sm text-slate-600">Automatically publish generated content</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.automationSettings.autoPublish}
                            onChange={(e) => setFormData({...formData, automationSettings: {...formData.automationSettings, autoPublish: e.target.checked}})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 sm:p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <div>
                          <div className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">Scheduled Posting</div>
                          <div className="text-xs sm:text-sm text-slate-600">Enable time-based post scheduling</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.automationSettings.scheduledPosting}
                            onChange={(e) => setFormData({...formData, automationSettings: {...formData.automationSettings, scheduledPosting: e.target.checked}})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 sm:p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <div>
                          <div className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">Content Approval Required</div>
                          <div className="text-xs sm:text-sm text-slate-600">Require manual approval before publishing</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.automationSettings.contentApprovalRequired}
                            onChange={(e) => setFormData({...formData, automationSettings: {...formData.automationSettings, contentApprovalRequired: e.target.checked}})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 sm:mb-3">Maximum Posts Per Day</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={formData.automationSettings.maxPostsPerDay}
                            onChange={(e) => setFormData({...formData, automationSettings: {...formData.automationSettings, maxPostsPerDay: parseInt(e.target.value)}})}
                            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 text-sm sm:text-base"
                          />
                        </div>
                        <p className="mt-1 sm:mt-2 text-xs text-slate-500">Limit daily posting to avoid spam detection</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Integrations Tab */}
                {activeTab === 'integrations' && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <BarChart3 className="text-white" size={20} />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Integrations & Notifications</h4>
                      <p className="text-sm sm:text-base text-slate-600 px-4">Connect with external services and configure alerts</p>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 sm:mb-3">Slack Webhook (Optional)</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                          <input
                            type="url"
                            value={formData.integrationSettings.slackWebhook}
                            onChange={(e) => setFormData({...formData, integrationSettings: {...formData.integrationSettings, slackWebhook: e.target.value}})}
                            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 placeholder-slate-400 text-sm sm:text-base"
                            placeholder="https://hooks.slack.com/services/..."
                          />
                        </div>
                        <p className="mt-1 sm:mt-2 text-xs text-slate-500">Get notified in Slack when posts are published</p>
                      </div>

                      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                        <div className="flex items-center justify-between p-4 sm:p-6 bg-slate-50 rounded-xl border border-slate-200">
                          <div>
                            <div className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">Email Notifications</div>
                            <div className="text-xs sm:text-sm text-slate-600">Receive email alerts for important events</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.integrationSettings.emailNotifications}
                              onChange={(e) => setFormData({...formData, integrationSettings: {...formData.integrationSettings, emailNotifications: e.target.checked}})}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 sm:p-6 bg-slate-50 rounded-xl border border-slate-200">
                          <div>
                            <div className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">Analytics Tracking</div>
                            <div className="text-xs sm:text-sm text-slate-600">Track post performance and engagement</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.integrationSettings.analyticsTracking}
                              onChange={(e) => setFormData({...formData, integrationSettings: {...formData.integrationSettings, analyticsTracking: e.target.checked}})}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="bg-slate-50 px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-t border-slate-200 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 sm:px-6 py-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold transition-all duration-200 hover:bg-white text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 text-white font-semibold hover:from-slate-800 hover:to-slate-600 transition-all duration-200 shadow-lg shadow-slate-900/25 flex items-center justify-center group text-sm sm:text-base"
                >
                  <CheckCircle2 size={16} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}