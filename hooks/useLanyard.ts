import { useState, useEffect, useRef } from 'react';
import type { LanyardData } from '../types';

const LANYARD_WEBSOCKET_URL = 'wss://api.lanyard.rest/socket';

export const useLanyard = (userId: string) => {
  const [data, setData] = useState<LanyardData | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const heartbeatInterval = useRef<number | null>(null);

  useEffect(() => {
    if (!userId) return;

    const connect = () => {
      ws.current = new WebSocket(LANYARD_WEBSOCKET_URL);

      ws.current.onopen = () => {
        console.log('Lanyard WebSocket connected');
        
        // Subscribe to user
        ws.current?.send(JSON.stringify({
          op: 2,
          d: { subscribe_to_id: userId }
        }));
      };

      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        
        if (message.op === 1) { // Hello, contains heartbeat interval
          const newInterval = message.d.heartbeat_interval;
          if (heartbeatInterval.current) clearInterval(heartbeatInterval.current);
          heartbeatInterval.current = window.setInterval(() => {
            ws.current?.send(JSON.stringify({ op: 3 }));
          }, newInterval);
        }

        if (message.op === 0) { // Event
          if (message.t === 'INIT_STATE') {
            setData(message.d);
          } else {
            // For PRESENCE_UPDATE events, which are partial, we use the
            // functional update form of `useState` to merge with previous state.
            // This prevents overwriting the full state (like `discord_user`)
            // with just a partial update (like `discord_status`).
            setData(prevData => {
              if (!prevData) return message.d; // Should not happen if INIT_STATE comes first.
              return { ...prevData, ...message.d };
            });
          }
        }
      };
      
      ws.current.onclose = () => {
        console.log('Lanyard WebSocket disconnected. Reconnecting...');
        if (heartbeatInterval.current) clearInterval(heartbeatInterval.current);
        setData(prev => prev ? { ...prev, discord_status: 'offline' } : null);
        setTimeout(connect, 5000); // Reconnect after 5s
      };

      ws.current.onerror = (error) => {
        console.error('Lanyard WebSocket error:', error);
        ws.current?.close();
      };
    };

    connect();

    return () => {
      if (heartbeatInterval.current) {
        clearInterval(heartbeatInterval.current);
      }
      ws.current?.close();
    };
  }, [userId]);

  return data;
};
