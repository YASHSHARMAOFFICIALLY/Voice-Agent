/**
 * Mock session data.
 * Shape mirrors the eventual API payload so the mock layer can be
 * swapped for a real backend without touching the UI.
 */

export const LANGUAGES = [
  { code: 'auto', label: 'Auto Detect' },
  { code: 'en', label: 'English' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ja', label: '日本語' },
];

export const EXPORT_FORMATS = ['TXT', 'SRT', 'VTT'];
export const AUDIO_FORMATS = ['MP3', 'WAV'];

export const MOCK_SESSIONS = [
  {
    id: 'ses_001',
    title: 'ESP32 Battery Discussion',
    date: '2026-09-20T12:43:00Z',
    durationSec: 763,
    language: 'en',
    tags: ['esp32', 'meeting'],
    color: 'sage',
    status: 'completed',
    snippet:
      'Battery optimization strategies for the IoT sensor project, covering deep sleep cycles and duty cycling.',
    transcript: [
      { id: 't1', start: 0, speaker: 'Speaker 1', text: 'Alright, let us start with the battery numbers from last week.' },
      { id: 't2', start: 12, speaker: 'Speaker 2', text: 'We measured about eleven days on a single charge with the current firmware.' },
      { id: 't3', start: 31, speaker: 'Speaker 1', text: 'That is lower than the two weeks we projected. What changed?' },
      { id: 't4', start: 48, speaker: 'Speaker 2', text: 'The radio stays awake longer than expected during reconnect attempts.' },
      { id: 't5', start: 72, speaker: 'Speaker 1', text: 'So the fix is on the reconnect backoff, not the sleep cycle.' },
      { id: 't6', start: 95, speaker: 'Speaker 2', text: 'Right. Exponential backoff should cut the awake window roughly in half.' },
    ],
    summary: [
      'Battery life measured at 11 days, below the 14-day target.',
      'Root cause is extended radio awake time during reconnect attempts.',
      'Proposed fix: exponential backoff on reconnect to halve the awake window.',
      'Deep sleep and duty cycling are already tuned correctly.',
    ],
    nextSteps: [
      'Implement exponential backoff in the reconnect handler.',
      'Re-run the 14-day battery soak test.',
    ],
  },
  {
    id: 'ses_002',
    title: 'Sensor Network Planning',
    date: '2026-09-19T09:15:00Z',
    durationSec: 1425,
    language: 'en',
    tags: ['iot'],
    color: 'pink',
    status: 'completed',
    snippet:
      'Planning the distributed sensor network deployment across three floors and the mesh topology.',
    transcript: [
      { id: 't1', start: 0, speaker: 'Speaker 1', text: 'Three floors, roughly forty nodes each. Do we go mesh or star?' },
      { id: 't2', start: 18, speaker: 'Speaker 2', text: 'Mesh, given the concrete between floors kills direct links.' },
    ],
    summary: [
      'Deployment scope: three floors, ~40 nodes per floor.',
      'Mesh topology chosen over star due to concrete signal attenuation.',
    ],
    nextSteps: ['Draft the mesh routing table layout.'],
  },
  {
    id: 'ses_003',
    title: 'UI Design Review',
    date: '2026-09-18T14:30:00Z',
    durationSec: 2100,
    language: 'en',
    tags: ['design'],
    color: 'yellow',
    status: 'completed',
    snippet:
      'Component library updates, design token changes, and the new motion guidelines.',
    transcript: [
      { id: 't1', start: 0, speaker: 'Speaker 1', text: 'The token rename is the biggest breaking change for the team.' },
    ],
    summary: [
      'Design token rename is the largest breaking change.',
      'Motion guidelines standardised at 150–300ms.',
    ],
    nextSteps: ['Publish the migration guide for renamed tokens.'],
  },
  {
    id: 'ses_004',
    title: 'Hackathon Kickoff',
    date: '2026-09-17T10:00:00Z',
    durationSec: 3270,
    language: 'en',
    tags: ['project'],
    color: 'blue',
    status: 'completed',
    snippet: 'Initial planning and ideation for Voxa, scope and the demo plan.',
    transcript: [
      { id: 't1', start: 0, speaker: 'Speaker 1', text: 'Let us keep the demo to one flow: record, transcribe, summarize.' },
    ],
    summary: [
      'Demo scoped to a single flow: record → transcribe → summarize.',
      'Translation shown as the follow-on capability.',
    ],
    nextSteps: ['Lock the demo script.'],
  },
];

export function formatDuration(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}:${String(sec).padStart(2, '0')}`;
}

export function formatClock(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
