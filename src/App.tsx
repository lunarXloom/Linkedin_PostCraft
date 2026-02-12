import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { NameDialog } from './components/NameDialog';
import { PostEditor } from './components/PostEditor';
import { PostHistory } from './components/PostHistory';
import { WebhookSettings } from './components/WebhookSettings';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Post, UserSettings } from './types';

function App() {
  const [settings, setSettings] = useLocalStorage<UserSettings | null>('user-settings', null);
  const [posts, setPosts] = useLocalStorage<Post[]>('posts', []);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [postToPublish, setPostToPublish] = useState<Post | null>(null);

  const generatePost = async (topic: string) => {
    setIsLoading(true);
    try {
      const requestData = {
        topic: topic,
        timestamp: new Date().toISOString(),
        user_name: settings?.name || '',
        content_preferences: {
          tone: settings?.contentPreferences?.tone || 'professional',
          length: settings?.contentPreferences?.length || 'medium',
          include_hashtags: settings?.contentPreferences?.includeHashtags || true,
          include_call_to_action: settings?.contentPreferences?.includeCallToAction || true,
          industry: settings?.contentPreferences?.industry || '',
          target_audience: settings?.contentPreferences?.targetAudience || ''
        },
        branding_settings: {
          company_name: settings?.brandingSettings?.companyName || '',
          website: settings?.brandingSettings?.website || '',
          linkedin_profile: settings?.brandingSettings?.linkedinProfile || '',
          brand_voice: settings?.brandingSettings?.brandVoice || ''
        }
      };

      const response = await fetch(settings!.generateWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let text = await response.text();
      
      // Remove any control characters that might break JSON parsing
      text = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('Failed to parse response:', text);
        throw new Error('Invalid response format from server');
      }
      
      if (!data.post_content || !data.image_url) {
        throw new Error('Invalid response data: missing required fields');
      }
      
      const newPost: Post = {
        id: Date.now().toString(),
        topic,
        content: data.post_content 
          ? data.post_content
              .replace(/([.!?])\s+/g, '$1\n\n') // Add double newline after each sentence
              .replace(/\n\s*\n/g, '\n\n') // Normalize multiple newlines to exactly two
              .trim()
          : '',
        imageUrl: data.image_url,
        published: false,
        timestamp: Date.now(),
      };
      setCurrentPost(newPost);
      setPosts((prev) => [newPost, ...prev]);
    } catch (error) {
      console.error('Error generating post:', error instanceof Error ? error.message : error);
      alert('Failed to generate post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublishConfirm = (post: Post) => {
    setPostToPublish(post);
    setShowConfirmDialog(true);
  };

  const handlePublishCancel = () => {
    setPostToPublish(null);
    setShowConfirmDialog(false);
  };

  const publishPost = async (post: Post) => {
    setIsPublishing(true);
    try {
      const publishData = {
        post_content: post.content,
        image_url: post.imageUrl,
        timestamp: new Date().toISOString(),
        user_name: settings?.name || '',
        branding_settings: {
          company_name: settings?.brandingSettings?.companyName || '',
          website: settings?.brandingSettings?.website || '',
          linkedin_profile: settings?.brandingSettings?.linkedinProfile || '',
          brand_voice: settings?.brandingSettings?.brandVoice || ''
        },
        automation_settings: {
          auto_publish: settings?.automationSettings?.autoPublish || false,
          scheduled_posting: settings?.automationSettings?.scheduledPosting || false,
          content_approval_required: settings?.automationSettings?.contentApprovalRequired || true,
          max_posts_per_day: settings?.automationSettings?.maxPostsPerDay || 3
        }
      };

      await fetch(settings!.publishWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(publishData),
      });
      const updatedPost = { ...post, published: true };
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? updatedPost : p))
      );
      setCurrentPost(null);
      alert('Post published successfully!');
      
      // Send Slack notification if configured
      if (settings?.integrationSettings?.slackWebhook) {
        try {
          await fetch(settings.integrationSettings.slackWebhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: `🚀 New LinkedIn post published: "${post.topic.substring(0, 50)}..."`
            }),
          });
        } catch (slackError) {
          console.warn('Failed to send Slack notification:', slackError);
        }
      }
    } catch (error) {
      console.error('Error publishing post:', error);
      alert('Failed to publish post. Please try again.');
    } finally {
      setShowConfirmDialog(false);
      setPostToPublish(null);
      setIsPublishing(false);
    }
  };

  const updatePost = (updatedPost: Post) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
    if (currentPost?.id === updatedPost.id) {
      setCurrentPost(updatedPost);
    }
  };

  const deletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    if (currentPost?.id === postId) {
      setCurrentPost(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.15)_1px,transparent_0)] [background-size:16px_16px] sm:[background-size:24px_24px] opacity-30"></div>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-3 py-4 sm:px-4 sm:py-6 md:px-8 md:py-12">
        {!settings ? (
          <NameDialog onSave={setSettings} />
        ) : (
          <>
            {/* Header Section */}
            <div className="w-full max-w-4xl text-center mb-8 sm:mb-12 md:mb-16">
              {/* Logo Section */}
              <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-10">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl sm:rounded-3xl flex items-center justify-center">
                    <Sparkles className="text-white w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11" />
                  </div>
                </div>
              </div>
              
              {/* Brand & Welcome Section */}
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                {/* Brand Name */}
                <div className="space-y-1 sm:space-y-2">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-wide">
                    PostCraft AI
                  </h2>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
                </div>
                
                {/* Welcome Message */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                  Welcome back,{' '}
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                    {settings.name}
                  </span>
                </h1>
                
                {/* Tagline */}
                <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed px-4 sm:px-6">
                  Transform your ideas into compelling LinkedIn content with{' '}
                  <span className="text-slate-800 font-semibold">AI-powered precision</span>
                </p>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full max-w-6xl space-y-4 sm:space-y-6 md:space-y-8">
              <PostEditor
                onGeneratePost={generatePost}
                onPublishPost={handlePublishConfirm}
                currentPost={currentPost}
                isLoading={isLoading}
                isPublishing={isPublishing}
                onUpdatePost={updatePost}
              />

              <PostHistory
                posts={posts}
                onPublishPost={handlePublishConfirm}
                onEditPost={setCurrentPost}
                onDeletePost={deletePost}
              />
            </div>

            {/* Confirmation Dialog */}
            {showConfirmDialog && postToPublish && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full shadow-2xl border border-slate-200 mx-3">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="text-white" size={20} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Ready to Publish?</h3>
                    <p className="text-sm sm:text-base text-slate-600">
                      Your post will be published to LinkedIn immediately.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handlePublishCancel}
                      className="flex-1 px-4 sm:px-6 py-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold transition-all duration-200 hover:bg-slate-50 text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => publishPost(postToPublish)}
                      className="flex-1 px-4 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-indigo-500/25 text-sm sm:text-base"
                    >
                      Publish Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <footer className="mt-8 sm:mt-12 md:mt-16 w-full max-w-4xl">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 md:p-8 shadow-sm">
                <WebhookSettings settings={settings} onSave={setSettings} />
                <div className="text-center text-slate-500 text-xs sm:text-sm mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200">
                  <p>
                    © 2025{' '}
                    <a 
                      href="https://irvincruz.com/" 
                      className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                    >
                      Irvin Cruz
                    </a>
                    {' • '}
                    <a 
                      href="https://www.Futurecrafters.ai/" 
                      className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                    >
                      FutureCrafters.AI
                    </a>
                  </p>
                </div>
              </div>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

export default App;