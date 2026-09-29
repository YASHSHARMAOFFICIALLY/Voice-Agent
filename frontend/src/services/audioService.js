/**
 * audioService — interface.
 */
export const audioService = {
  async upload(file) { return { id: `up_${Date.now()}`, name: file.name, size: file.size, type: file.type }; },
  async getAudioUrl(id) { return `/mock/audio/${id}.mp3`; },
};

export default audioService;
