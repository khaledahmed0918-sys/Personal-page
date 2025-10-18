import React from 'react';
import { useLanyard } from '../hooks/useLanyard';
import { useTypewriter } from '../hooks/useTypewriter';
import { DISCORD_USER_ID, FEATURE_FLAGS } from '../constants';
import CopyDiscordButton from './CopyDiscordButton';
import { CodeBracketIcon } from '@heroicons/react/24/solid';

interface HeaderProps {
  name: string;
  tagline: string;
}

const SpotifyPill: React.FC<{ track_id: string; song: string; artist: string; album_art_url: string; }> = ({ track_id, song, artist, album_art_url }) => (
    <a href={`httpshttps://open.spotify.com/track/${track_id}`} target="_blank" rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-3 px-3 py-2 bg-black/20 backdrop-blur-md rounded-lg hover:bg-black/30 transition-colors duration-300">
        <img src={album_art_url} alt="Spotify album art" className="w-10 h-10 rounded-md" />
        <div>
            <p className="font-semibold text-sm text-white truncate">{song}</p>
            <p className="text-xs text-gray-300 truncate">by {artist}</p>
        </div>
    </a>
);

const VSCodePill: React.FC<{ details?: string; state?: string; }> = ({ details, state }) => (
    <div className="mt-4 inline-flex items-center gap-3 px-3 py-2 bg-black/20 backdrop-blur-md rounded-lg">
        <CodeBracketIcon className="w-8 h-8 text-blue-400" />
        <div>
            <p className="font-semibold text-sm text-white truncate">{details}</p>
            <p className="text-xs text-gray-300 truncate">{state}</p>
        </div>
    </div>
);


const Header: React.FC<HeaderProps> = ({ name, tagline }) => {
    const lanyardData = useLanyard(DISCORD_USER_ID);
    const spotifyData = lanyardData?.listening_to_spotify ? lanyardData.spotify : null;
    const vsCodeActivity = lanyardData?.activities?.find(activity => activity.name === "Visual Studio Code");
    const typedTagline = useTypewriter(tagline, 50, 500); // 50ms speed, 500ms start delay

    return (
        <header className="text-center pt-24 pb-16">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 motion-safe:animate-fade-in-down">
                {name}
            </h1>
            <p className="mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-300 tracking-wide min-h-[28px] md:min-h-[30px]">
                {typedTagline}
                {typedTagline.length < tagline.length && (
                    <span className="motion-safe:animate-blink-cursor ml-1">|</span>
                )}
            </p>
            {FEATURE_FLAGS.copyDiscord && (
                <div 
                    className="mt-6 flex justify-center opacity-0 motion-safe:animate-fade-in-up"
                    style={{ animationDelay: '2500ms', animationFillMode: 'forwards' }}
                >
                    <CopyDiscordButton />
                </div>
            )}

            {FEATURE_FLAGS.liveStatus && (
                <div 
                    className="mt-8 h-16 opacity-0 motion-safe:animate-fade-in-up"
                    style={{ animationDelay: '2700ms', animationFillMode: 'forwards' }}
                >
                    {spotifyData && (
                        <SpotifyPill 
                            track_id={spotifyData.track_id} 
                            song={spotifyData.song}
                            artist={spotifyData.artist}
                            album_art_url={spotifyData.album_art_url}
                        />
                    )}
                    {vsCodeActivity && !spotifyData && (
                        <VSCodePill details={vsCodeActivity.details} state={vsCodeActivity.state} />
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;