export interface Post {
  id: string;
  topic: string;
  content: string;
  imageUrl: string;
  published: boolean;
  timestamp: number;
}

export interface UserSettings {
  name: string;
  generateWebhook: string;
  publishWebhook: string;
  contentPreferences: {
    tone: 'professional' | 'casual' | 'thought-leader' | 'storytelling' | 'data-driven';
    length: 'short' | 'medium' | 'long';
    includeHashtags: boolean;
    includeCallToAction: boolean;
    industry: string;
    targetAudience: string;
  };
  brandingSettings: {
    companyName: string;
    website: string;
    linkedinProfile: string;
    brandVoice: string;
  };
  automationSettings: {
    autoPublish: boolean;
    scheduledPosting: boolean;
    contentApprovalRequired: boolean;
    maxPostsPerDay: number;
  };
  integrationSettings: {
    slackWebhook: string;
    emailNotifications: boolean;
    analyticsTracking: boolean;
  };
}