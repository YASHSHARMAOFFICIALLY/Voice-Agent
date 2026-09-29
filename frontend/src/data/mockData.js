export const navigationItems = [
  { id: 'home', label: 'Home', icon: 'Home', active: true },
  { id: 'sessions', label: 'Sessions', icon: 'FolderClosed', active: false },
  { id: 'translate', label: 'Translate', icon: 'Globe', active: false },
  { id: 'library', label: 'Library', icon: 'ClipboardList', active: false },
  { id: 'settings', label: 'Settings', icon: 'Settings', active: false }
];

export const valueProps = [
  {
    id: 'transcription',
    title: 'Accurate Transcription',
    subtitle: '(99% + accuracy)',
    tag: 'Transcription',
    color: 'sage',
    iconName: 'FileText',
    bg: '#D1FAE5',
    icon_bg: '#9cffcc',
    border: '1.2px solid #9cffcc'
  },
  {
    id: 'summaries',
    title: 'AI summaries',
    subtitle: 'Key points, instantly',
    tag: 'AI Summary',
    color: 'purple',
    iconName: 'Sparkles',
    bg: '#EDE9FE',
    icon_bg: '#d3caff',
    border: '1.2px solid #d3caff'
  },
  {
    id: 'library',
    title: 'Organised Library',
    subtitle: 'Automated actionables',
    tag: 'Action Items',
    color: 'peach',
    iconName: 'CheckCircle',
    bg: '#FFEDD5',
    icon_bg: '#ffdcae',
    border: '1.2px solid #ffdcae'
  },
  {
    id: 'translation',
    title: 'Language translation',
    subtitle: 'Multiple Languages',
    tag: 'Translation',
    color: 'pink',
    iconName: 'Languages',
    bg: '#FCE7F3',
    icon_bg: '#ffceea',
    border: '1.2px solid #d3caff'
  }
];

export const recentSessions = [
  {
    id: 1,
    title: 'ESP32 Battery Discussion',
    date: 'Sept 20, 2026',
    time: '12:43',
    duration: '24:15',
    language: 'English',
    snippet: 'Discussed the battery optimization techniques for...',
    tag: 'IoT Project',
    tagColor: 'var(--accent-sage)',
    tags: ['esp32', 'Iot', 'project'],
    accentColor: '#D1FAE5'
  },
  {
    id: 2,
    title: 'UX Research: Audio Notes',
    date: 'Sept 20, 2026',
    time: '12:43',
    duration: '12:40',
    language: 'English',
    snippet: 'User testing observations on waveform scrubbing...',
    tag: 'UX Research',
    tagColor: 'purple',
    tags: ['ux', 'research', 'audio'],
    accentColor: '#EDE9FE'
  },
  {
    id: 3,
    title: 'Product Strategy Sync',
    date: 'Sept 19, 2026',
    time: '12:43',
    duration: '18:05',
    language: 'English',
    snippet: 'Roadmap prioritization for multilingual speech models...',
    tag: 'Strategy',
    tagColor: 'peach',
    tags: ['strategy', 'roadmap', 'sync'],
    accentColor: '#FFEDD5'
  },
  {
    id: 4,
    title: 'Spanish Translation Test',
    date: 'Sept 18, 2026',
    time: '12:43',
    duration: '08:22',
    language: 'Spanish',
    snippet: 'Evaluation of Spanish voice note translation fidelity...',
    tag: 'Translation',
    tagColor: 'pink',
    tags: ['spanish', 'translation', 'test'],
    accentColor: '#FCE7F3'
  }
];

export const weeklyStats = [
  { label: 'Total Recordings', value: '4', change: '+2 from last week', color: 'sage' },
  { label: 'Audio Processed', value: '2h 18m', change: '100% transcribed', color: 'purple' },
  { label: 'AI Summaries', value: '3', change: 'Instant key points', color: 'yellow' },
  { label: 'Languages', value: '2', change: 'EN • ES detected', color: 'pink' }
];
