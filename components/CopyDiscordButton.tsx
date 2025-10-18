import React, { useState, useEffect } from 'react';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import { DISCORD_USERNAME } from '../constants';

const CopyDiscordButton: React.FC = () => {
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    const handleCopy = () => {
        navigator.clipboard.writeText(DISCORD_USERNAME);
        setIsCopied(true);
    };

    return (
        <div className="relative inline-flex">
            <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transform hover:scale-105"
            >
                {isCopied ? (
                    <CheckIcon className="w-5 h-5 text-green-400" />
                ) : (
                    <ClipboardIcon className="w-5 h-5" />
                )}
                Discord: @{DISCORD_USERNAME}
            </button>
            <div
                className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md shadow-lg transition-all duration-300 ${
                    isCopied ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
            >
                ✅ Copied!
            </div>
        </div>
    );
};

export default CopyDiscordButton;
