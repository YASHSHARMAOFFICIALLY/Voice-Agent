/**
 * exportService — interface.
 */
import { EXPORT_FORMATS, AUDIO_FORMATS } from '../data/mockSessions.js';

export const exportService = {
  async export({ sessionId, format }) {
    if (!EXPORT_FORMATS.includes(format)) throw new Error(`Unknown format: ${format}`);
    return { url: `/mock/export/${sessionId}.${format.toLowerCase()}`, format };
  },
  async exportAudio({ sessionId, format }) {
    if (!AUDIO_FORMATS.includes(format)) throw new Error(`Unknown audio format: ${format}`);
    return { url: `/mock/audio-export/${sessionId}.${format.toLowerCase()}`, format };
  },
};

export default exportService;
