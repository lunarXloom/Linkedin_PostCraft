import React, { useState } from 'react';
import { Send, Loader2, ExternalLink, Wand2, Image as ImageIcon, Mic, MicOff, AlertCircle } from 'lucide-react';
import { Post } from '../types';

interface PostEditorProps {
  onGeneratePost: (topic: string) => Promise<void>;
  onPublishPost: (post: Post) => Promise<void>;
  onUpdatePost: (post: Post) => void;
  currentPost: Post | null;
  isLoading: boolean;
  isPublishing: boolean;
}

export function PostEditor({
  onGeneratePost,
  onPublishPost,
  onUpdatePost,
  currentPost,
  isLoading,
  isPublishing,
}: PostEditorProps) {
  const [topic, setTopic] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [transcript, setTranscript] = useState('');

  // Check speech recognition support on component mount
  React.useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setSpeechSupported(!!SpeechRecognition);
  }, []);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
        setRecognition(null);
      }
    };
  }, [recognition]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      await onGeneratePost(topic.trim());
    }
  };

  const handlePublish = async () => {
    if (currentPost) {
      const updatedPost = {
        ...currentPost,
        content: editedContent,
      };
      onUpdatePost(updatedPost);
      onPublishPost(updatedPost);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
    if (currentPost) {
      onUpdatePost({
        ...currentPost,
        content: e.target.value,
      });
    }
  };

  React.useEffect(() => {
    if (currentPost) {
      setEditedContent(currentPost.content);
    }
  }, [currentPost]);

  const startRecording = async () => {
    try {
      // First, explicitly request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the stream immediately - we only needed it to verify permission
      stream.getTracks().forEach(track => track.stop());

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        alert('Speech recognition is not supported in your browser. Please try Chrome, Edge, or Safari.');
        return;
      }

      const newRecognition = new SpeechRecognition();
      newRecognition.continuous = true;
      newRecognition.interimResults = true;
      newRecognition.lang = 'en-US';

      let finalTranscript = '';

      newRecognition.onstart = () => {
        setIsRecording(true);
        setTranscript('');
      };

      newRecognition.onresult = (event) => {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        
        setTranscript(finalTranscript + interimTranscript);
      };

      newRecognition.onend = () => {
        setIsRecording(false);
        if (finalTranscript.trim()) {
          const newText = topic + (topic ? ' ' : '') + finalTranscript.trim();
          setTopic(newText);
        }
        setTranscript('');
        setRecognition(null);
      };

      newRecognition.onerror = (event) => {
        setIsRecording(false);
        setTranscript('');
        setRecognition(null);
        
        if (event.error === 'no-speech') {
          alert('No speech detected. Please try again and speak clearly.');
        } else if (event.error === 'audio-capture') {
          alert('Microphone not found. Please check your microphone connection.');
        } else if (event.error === 'network') {
          alert('Network error occurred. Please check your internet connection.');
        } else {
          alert(`Speech recognition error: ${event.error}`);
        }
      };

      setRecognition(newRecognition);
      newRecognition.start();

    } catch (error: any) {
      if (error.name === 'NotAllowedError' || error.message?.includes('Permission denied')) {
        alert(`Microphone access denied. Please:

1. Click the microphone icon in your browser's address bar and allow access
2. Check your browser's site settings for microphone permissions
3. On macOS: System Preferences > Security & Privacy > Privacy > Microphone
4. On Windows: Settings > Privacy > Microphone
5. Try refreshing the page and granting permission again`);
      } else if (error.name === 'NotFoundError') {
        alert('No microphone found. Please connect a microphone and try again.');
      } else {
        console.error('Microphone access error:', error);
        alert('Unable to access microphone. Please check your browser settings and try again.');
      }
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 border-b border-slate-200">
        <div className="flex items-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4">
            <Wand2 className="text-white" size={16} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Content Creator</h2>
            <p className="text-xs sm:text-sm text-slate-600 hidden sm:block">Transform your ideas into engaging LinkedIn posts</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        {/* Topic Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-3">
            <label htmlFor="topic" className="block text-sm font-semibold text-slate-700 mb-2 sm:mb-3">
              What's on your mind?
            </label>
            <div className="relative">
              <textarea
                id="topic"
                className={`w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl border-2 transition-all duration-300 resize-none text-sm sm:text-base ${
                  isRecording
                    ? 'border-red-400 bg-red-50 placeholder-red-500 shadow-lg shadow-red-500/20' 
                    : 'border-slate-200 bg-slate-50/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder-slate-400 hover:border-slate-300'
                }`}
                rows={4}
                placeholder={isRecording ? "🎤 Listening... Your words will appear here as you speak!" : "Share your thoughts, insights, or experiences... Or use voice input below!"}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              
              {/* Browser Compatibility Warning */}
              {!speechSupported && (
                <div className="absolute right-2 sm:right-3 top-2 sm:top-3 p-2 text-amber-500" title="Speech recognition not supported in this browser">
                  <AlertCircle size={16} />
                </div>
              )}
            </div>
            
            {/* Real-time Transcript Display */}
            {isRecording && transcript && (
              <div className="mt-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="relative mr-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="text-sm font-semibold text-red-700">🎤 Recording in progress...</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 mb-3">
                  <p className="text-sm text-slate-700 italic">"{transcript}"</p>
                </div>
                <p className="text-xs text-red-600">💡 Tip: Speak clearly and pause between sentences for best results</p>
              </div>
            )}
            
            {/* Recording Status */}
            {isRecording && !transcript && (
              <div className="mt-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="relative mr-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="text-sm font-semibold text-red-700">🎤 Ready to listen...</span>
                  </div>
                </div>
                <p className="text-xs text-red-600">💬 Start speaking now - your words will appear above</p>
              </div>
            )}
            
            {/* Prominent Speech-to-Text Button */}
            {speechSupported && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center px-6 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                    isRecording
                      ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-500/25 animate-pulse'
                     : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-indigo-500/25 hover:shadow-indigo-500/35'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="mr-3" size={20} />
                      <span>Stop Recording</span>
                      <div className="ml-3 flex space-x-1">
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Mic className="mr-3" size={20} />
                      <span>🎤 Start Voice Input</span>
                    </>
                  )}
                </button>
              </div>
            )}
            
            {/* Browser Compatibility Message */}
            {!speechSupported && (
              <p className="mt-3 text-xs text-amber-600 flex items-center justify-center bg-amber-50 border border-amber-200 rounded-lg p-3">
                <AlertCircle size={14} className="mr-1" />
                🌐 Speech-to-text requires Chrome, Edge, or Safari browser
              </p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-indigo-500/25 flex items-center justify-center group text-sm sm:text-base"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-indigo-500/30 flex items-center justify-center group text-sm sm:text-base"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 sm:mr-3" size={18} />
                <span>Crafting your post...</span>
              </>
            ) : (
              <>
                <Wand2 className="mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-200" size={18} />
                Generate LinkedIn Post
              </>
            )}
          </button>
        </form>

        {/* Generated Post Preview */}
        {currentPost && (
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                <Send className="text-white" size={16} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Your Generated Post</h3>
            </div>

            <div className="space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 xl:gap-8 lg:space-y-0">
              {/* Image Preview */}
              {currentPost.imageUrl && (
                <div className="lg:col-span-1 order-2 lg:order-1">
                  <div className="relative group">
                    <img
                      src={currentPost.imageUrl}
                      alt="Generated post visual"
                      className="w-full aspect-[4/5] object-cover rounded-xl border border-slate-200 shadow-sm"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-xl"></div>
                  </div>
                  <a
                    href={currentPost.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors duration-200 font-medium group text-sm sm:text-base"
                  >
                    <ImageIcon size={16} className="mr-2" />
                    View Full Image
                    <ExternalLink size={14} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                </div>
              )}

              {/* Content Editor */}
              <div className={`${currentPost.imageUrl ? 'lg:col-span-2 order-1 lg:order-2' : 'lg:col-span-3'}`}>
                <label htmlFor="content" className="block text-sm font-semibold text-slate-700 mb-2 sm:mb-3">
                  Fine-tune your message
                </label>
                <div className="relative">
                  <textarea
                    id="content"
                    value={editedContent}
                    onChange={handleContentChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 resize-none font-mono text-xs sm:text-sm leading-relaxed bg-slate-50/50"
                    rows={12}
                    disabled={isPublishing}
                  />
                  
                  {/* Recording Status Indicator */}
                  {isRecording && (
                    <div className="absolute top-2 right-2 flex items-center">
                      <div className="relative mr-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
                      </div>
                      <span className="text-xs font-medium text-red-600">REC</span>
                    </div>
                  )}
                </div>

                {/* Speech-to-Text Control */}
                {speechSupported ? (
                  <div className="space-y-3">
                    {/* Main Voice Button */}
                    <button
                      type="button"
                      onClick={isRecording ? stopRecording : startRecording}
                      disabled={isLoading}
                      className={`w-full flex items-center justify-center px-6 py-4 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] ${
                        isRecording
                          ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-500/30 ring-4 ring-red-500/20'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-500/30 hover:shadow-indigo-500/40'
                      }`}
                    >
                      {isRecording ? (
                        <>
                          <div className="relative mr-3">
                            <MicOff size={20} />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                          <span>Stop Recording</span>
                          <div className="ml-3 flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </>
                      ) : (
                        <>
                          <Mic className="mr-3" size={20} />
                          <span>🎤 Start Voice Input</span>
                          <div className="ml-3 text-sm opacity-75">Click to speak</div>
                        </>
                      )}
                    </button>

                    {/* Recording Status Card */}
                    {isRecording && (
                      <div className="bg-gradient-to-r from-red-50 via-pink-50 to-red-50 border-2 border-red-200 rounded-xl p-4 animate-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="relative mr-3">
                              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                              <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-60"></div>
                            </div>
                            <span className="font-semibold text-red-700">🎤 Listening...</span>
                          </div>
                          <div className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                            LIVE
                          </div>
                        </div>
                        
                        {transcript ? (
                          <div className="bg-white rounded-lg p-3 mb-3 border border-red-200">
                            <p className="text-sm text-slate-700 font-medium">"{transcript}"</p>
                          </div>
                        ) : (
                          <div className="bg-white/50 rounded-lg p-3 mb-3 border border-red-200 border-dashed">
                            <p className="text-sm text-slate-500 italic">Waiting for speech...</p>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-red-600 flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                            Speak clearly for best results
                          </span>
                          <span className="text-slate-500">
                            Click "Stop Recording" when done
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                    <AlertCircle className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                    <p className="text-sm text-amber-700 font-medium mb-1">Speech-to-text not available</p>
                    <p className="text-xs text-amber-600">Please use Chrome, Edge, or Safari browser</p>
                  </div>
                )}
              </div>
            </div>

            {/* Publish Button */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200">
              <button
                onClick={handlePublish}
                disabled={isPublishing || !editedContent.trim()}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-emerald-500/25 flex items-center justify-center group text-sm sm:text-base"
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="animate-spin mr-2 sm:mr-3" size={18} />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Send className="mr-2 sm:mr-3 group-hover:translate-x-1 transition-transform duration-200" size={18} />
                    Publish to LinkedIn
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}