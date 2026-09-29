import HeroSection from '../components/HeroSection';
import ValueProps from '../components/ValueProps';
import RecentSessions from '../components/RecentSessions';
import StatsBar from '../components/StatsBar';
import UploadButton from '../components/Upload';
import Voice from '../components/Voice'
import FAQ from '../components/FAQ';
import './LandingPage.css';

export default function LandingPage({
  onStartRecord,
  onUploadAudio,
  onViewAllSessions,
  onSelectSession
}) {
  return (
    <div className="voxa-landing-page">
      {/* Main Hero Card */}
      <HeroSection
        onStartRecord={onStartRecord}
        onUploadAudio={onUploadAudio}
      />

      

      {/* 4 Core Value Propositions */}
      <ValueProps />
      <div className='landing-quote'></div>
      <Voice onConversationEnd={(conversation)=>{console.log(conversation)}}/>

      <UploadButton onUploadAudio={onUploadAudio}/>

      {/* Recent Sessions List */}
      <RecentSessions
        onViewAll={onViewAllSessions}
        onSelectSession={onSelectSession}
      />

      {/* Weekly Activity Summary Bar */}
      <StatsBar />

      <FAQ/>
      
    </div>
  );
}
