import type { AnalyticsEvent, AnalyticsEventName, EventPayload } from '../types';

class AnalyticsService {
    private userId: string | null = null;
    private sessionId: string | null = null;
    private eventQueue: AnalyticsEvent[] = [];
    private batchSize = 10;
    private flushInterval = 5000; // 5 seconds
    private flushTimeout: number | null = null;

    init(userId: string, sessionId: string) {
        this.userId = userId;
        this.sessionId = sessionId;
        console.log(`Analytics Service Initialized for user: ${userId}, session: ${sessionId}`);
    }

    track<T extends AnalyticsEventName>(eventName: T, payload: EventPayload<T>) {
        if (!this.userId || !this.sessionId) {
            console.warn('Analytics service not initialized. Call init() first.');
            return;
        }

        const event: AnalyticsEvent = {
            event_name: eventName,
            timestamp: new Date().toISOString(),
            user_id: this.userId,
            session_id: this.sessionId,
            // In a real app, context would be richer (geo, device, etc.)
            context: {
                device: 'web',
                browser: 'Unknown' // Could use a library to detect this
            },
            payload: payload,
        };
        
        this.eventQueue.push(event);

        if (this.eventQueue.length >= this.batchSize) {
            this.flush();
        } else if (!this.flushTimeout) {
            this.flushTimeout = window.setTimeout(() => this.flush(), this.flushInterval);
        }
    }

    private flush() {
        if (this.flushTimeout) {
            clearTimeout(this.flushTimeout);
            this.flushTimeout = null;
        }

        if (this.eventQueue.length === 0) {
            return;
        }

        const eventsToSend = [...this.eventQueue];
        this.eventQueue = [];

        console.log('Analytics Event Batch Sent:', eventsToSend);
        // In a real application, this would be an API call
        // fetch('/api/analytics/events', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ events: eventsToSend })
        // });
    }
}

export const analyticsService = new AnalyticsService();
