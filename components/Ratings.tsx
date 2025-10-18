import React, { useState } from 'react';
import Section from './ui/Section';
import Card from './ui/Card';
import StarRating from './ui/StarRating';
import Toast from './ui/Toast';
import { sendRatingToWebhook } from '../services/discordService';
import type { RatingData, Server, Theme } from '../types';
import { ArrowPathIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

interface RatingsProps {
  servers: Server[];
  webhookUrl: string;
  theme: Theme;
}

const Ratings: React.FC<RatingsProps> = ({ servers, webhookUrl, theme }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [selectedServer, setSelectedServer] = useState('');
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
      server: selectedServer,
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
      setSelectedServer('');
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
        <h2 className="text-3xl font-bold tracking-tight text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">Rate My Work</h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">Leave a review! Your feedback gets sent directly to my Discord.</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Rating</label>
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Rating Title (e.g. 'Amazing Help!')" className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition" />
            <input type="text" value={visitorName} onChange={e => setVisitorName(e.target.value)} placeholder="Your Name (Optional)" className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition" />
          </div>
          
          <textarea value={message} onChange={e => setMessage(e.target.value)} maxLength={600} placeholder="Your message... (max 600 chars)" rows={4} className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition resize-none"></textarea>

          <select value={selectedServer} onChange={e => setSelectedServer(e.target.value)} className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition">
            <option value="">Select a Server (Optional)</option>
            {servers.map(s => <option key={s.name} value={`${s.name} - ${s.role}`}>{s.name}</option>)}
          </select>
          
          <button type="submit" disabled={status === 'loading'} className="w-full flex items-center justify-center font-bold py-3 px-6 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 disabled:bg-cyan-800 disabled:cursor-not-allowed transform transition-all hover:scale-105 active:scale-100">
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