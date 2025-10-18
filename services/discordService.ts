import type { DiscordEmbed, RatingData, Theme } from '../types';
import { DEFAULT_AVATAR_URL, THEME_COLORS } from '../constants';

export const sendRatingToWebhook = async (
    webhookUrl: string, 
    ratingData: RatingData,
    theme: Theme,
) => {
  const { stars, title, message, visitorName, server } = ratingData;

  const starRatingVisual = '⭐'.repeat(stars) + '☆'.repeat(5 - stars);

  const fields = [
    { name: "Stars", value: `${starRatingVisual} (${stars})`, inline: true },
  ];

  if (server) {
    fields.push({ name: "Server", value: server, inline: true });
  }

  fields.push({ name: "Message", value: message || "—", inline: false });
  
  const embed: DiscordEmbed = {
    title: title || "New Rating Received!",
    author: { name: visitorName || "Anonymous" },
    fields: fields,
    timestamp: new Date().toISOString(),
    color: THEME_COLORS[theme],
    thumbnail: { url: DEFAULT_AVATAR_URL }, // Always use the default avatar
  };
  
  const payload = { embeds: [embed] };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Webhook failed: ${response.status} ${response.statusText}. Details: ${errorText}`);
  }
};