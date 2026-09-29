/**
 * transcriptionService — interface.
 * The AssemblyAI layer can replace these methods without UI changes.
 */
export const transcriptionService = {
  async startRecording() { return { id: `rec_${Date.now()}`, startTime: Date.now(), status: 'recording' }; },
  async stopRecording(id) { return { id, status: 'transcribing', progress: 0 }; },
  async getTranscript(id) { return [{ start: 0, speaker: 'Speaker 1', text: 'Hello world from mocked transcript.' }]; },
};

export default transcriptionService;
