import React, { useState } from 'react';
import Section from './ui/Section';
import Card from './ui/Card';
import StarRating from './ui/StarRating';
import Toast from './ui/Toast';
import { sendRatingToWebhook } from '../services/discordService';
import type { RatingData, Theme } from '../types';
import { ArrowPathIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

interface RatingsProps {
  webhookUrl: string;
  theme: Theme;
}

const Ratings: React.FC<RatingsProps> = ({ webhookUrl, theme }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setToastMessage("Please select a star rating.");
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }
    setStatus('loading');

    const ratingData: RatingData = {
      stars: rating,
      title,
      message,
      visitorName,
    };

    try {
      await sendRatingToWebhook(webhookUrl, ratingData, theme);
      setStatus('success');
      setToastMessage("Thanks for your rating!");
      // Reset form
      setRating(0);
      setTitle('');
      setMessage('');
      setVisitorName('');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setToastMessage("Something went wrong. Please try again.");
    } finally {
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <Section>
      <Card className="p-8">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-2 dynamic-gradient-text">Rate My Work</h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">Leave a review! Your feedback gets sent directly to my Discord.</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Rating</label>
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Rating Title (e.g. 'Amazing Help!')" className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-sm focus:ring-2 dynamic-focus-ring dynamic-border transition" />
            <input type="text" value={visitorName} onChange={e => setVisitorName(e.target.value)} placeholder="Your Name (Optional)" className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-sm focus:ring-2 dynamic-focus-ring dynamic-border transition" />
          </div>
          
          <textarea value={message} onChange={e => setMessage(e.target.value)} maxLength={600} placeholder="Your message... (max 600 chars)" rows={4} className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-sm focus:ring-2 dynamic-focus-ring dynamic-border transition resize-none"></textarea>
          
          <button type="submit" disabled={status === 'loading'} className="w-full flex items-center justify-center font-bold py-3 px-6 rounded-lg dynamic-bg text-white dynamic-bg-hover disabled:opacity-60 disabled:cursor-not-allowed transform transition-all hover:scale-105 active:scale-100">
            {status === 'loading' && <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />}
            {status === 'success' ? <CheckCircleIcon className="w-5 h-5 mr-2" /> : null}
            {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Submit Rating'}
          </button>
        </form>
      </Card>
      { (status === 'success' || status === 'error') && <Toast message={toastMessage} type={status} onDismiss={() => setStatus('idle')} />}
    </Section>
  );
};

export default Ratings;