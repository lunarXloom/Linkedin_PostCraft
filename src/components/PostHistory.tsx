import React from 'react';
import { Post } from '../types';
import { CheckCircle, Trash2, Send, Edit, ExternalLink, Calendar, Tag, Image as ImageIcon } from 'lucide-react';

interface PostHistoryProps {
  posts: Post[];
  onPublishPost: (post: Post) => Promise<void>;
  onEditPost: (post: Post) => void;
  onDeletePost: (postId: string) => void;
}

export function PostHistory({ posts, onPublishPost, onEditPost, onDeletePost }: PostHistoryProps) {
  if (posts.length === 0) return null;

  const handleDelete = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      onDeletePost(postId);
    }
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4">
              <Calendar className="text-white" size={16} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Content Library</h2>
              <p className="text-xs sm:text-sm text-slate-600">{posts.length} posts created</p>
            </div>
          </div>
          <div className="text-xs sm:text-sm text-slate-500">
            {posts.filter(p => p.published).length} published
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        <div className="space-y-4 sm:space-y-6">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="group border border-slate-200 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:border-indigo-300 hover:shadow-md transition-all duration-200 bg-slate-50/30"
            >
              <div className="space-y-4 lg:grid lg:grid-cols-4 lg:gap-6 lg:space-y-0">
                {/* Image Preview */}
                {post.imageUrl && (
                  <div className="lg:col-span-1 order-2 lg:order-1">
                    <div className="relative">
                      <img
                        src={post.imageUrl}
                        alt="Post visual"
                        className="w-full aspect-[4/5] sm:aspect-[4/5] object-cover rounded-lg border border-slate-200"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200 rounded-lg"></div>
                    </div>
                    <a
                      href={post.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 w-full flex items-center justify-center px-2 sm:px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 transition-colors duration-200 text-xs sm:text-sm font-medium border border-slate-200 group/link"
                    >
                      <ImageIcon size={14} className="mr-1 sm:mr-2" />
                      View Image
                      <ExternalLink size={12} className="ml-1 sm:ml-2 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                    </a>
                  </div>
                )}

                {/* Content */}
                <div className={`${post.imageUrl ? 'lg:col-span-3 order-1 lg:order-2' : 'lg:col-span-4'}`}>
                  {/* Meta Information */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <div className="flex items-center text-xs sm:text-sm text-slate-500">
                        <Calendar size={14} className="mr-1 sm:mr-2" />
                        {new Date(post.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center">
                        <Tag size={14} className="mr-1 sm:mr-2 text-slate-400" />
                        <span className="px-2 sm:px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                          {post.topic.length > 30 ? `${post.topic.substring(0, 30)}...` : post.topic}
                        </span>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      {post.published ? (
                        <div className="flex items-center text-emerald-600 bg-emerald-50 px-2 sm:px-3 py-1 rounded-full">
                          <CheckCircle size={14} className="mr-1 sm:mr-2" />
                          <span className="text-xs sm:text-sm font-medium">Published</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => onPublishPost(post)}
                          className="flex items-center text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 sm:px-3 py-1 rounded-full transition-colors duration-200 group/publish"
                          title="Publish to LinkedIn"
                        >
                          <Send size={14} className="mr-1 sm:mr-2 group-hover/publish:translate-x-0.5 transition-transform duration-200" />
                          <span className="text-xs sm:text-sm font-medium">Publish</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => onEditPost(post)}
                        className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                        title="Edit post"
                      >
                        <Edit size={16} />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 sm:p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Delete post"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="bg-white rounded-lg p-3 sm:p-4 border border-slate-200">
                    <p className="text-slate-700 whitespace-pre-line font-mono text-xs sm:text-sm leading-relaxed">
                      {post.content.length > 300 ? `${post.content.substring(0, 300)}...` : post.content}
                    </p>
                    {post.content.length > 300 && (
                      <button
                        onClick={() => onEditPost(post)}
                        className="mt-2 sm:mt-3 text-indigo-600 hover:text-indigo-700 text-xs sm:text-sm font-medium"
                      >
                        Read more →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}