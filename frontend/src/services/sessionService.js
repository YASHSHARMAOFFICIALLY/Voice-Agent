/**
 * sessionService — interface for session operations.
 * Mocked implementation. Replace with real backend when ready.
 */
import { MOCK_SESSIONS } from '../data/mockSessions.js';

const LATENCY = 420;
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

export const sessionService = {
  async list() {
    await delay(LATENCY);
    return [...MOCK_SESSIONS];
  },
  async get(id) {
    await delay(LATENCY);
    const s = MOCK_SESSIONS.find(x => x.id === id);
    if (!s) throw new Error(`Session not found: ${id}`);
    return { ...s };
  },
  async create({ title, language }) {
    await delay(LATENCY);
    return { id: `ses_${Date.now()}`, title, language: language || 'auto', status: 'processing' };
  },
};

export default sessionService;
