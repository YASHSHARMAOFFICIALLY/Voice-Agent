import NeoButton from './NeoButton';
import { Mic, Upload, Sparkles } from 'lucide-react';
import './Upload.css';

export default function UploadButton ({onUploadAudio}) {
    return(
        <>
            <section className="upload-hero">
                {/* Left Content Column */}
                <div className="upload__content" style={{margin: "50px"}}>
                    {/* Top Tagline Badge with Sparkle */}
                    <div className="upload__badge">
                    </div>

                    {/* Main Headline Stack with Brutalist Highlight */}
                    <h1 className="upload__title">
                    <span className="upload__title-line">Already Recorded?</span>
                    <span className="upload__highlight-wrapper">
                        <span className="upload__highlight-box">Let Voxa handle the rest</span>
                    </span>
                    </h1>

                    {/* Descriptive Subtitle */}
                    <p className="upload__subtitle">
                    Record meetings, lectures, and quick thoughts. Voxa transcribes with pinpoint accuracy, generates structured summaries, and unlocks instant multilingual translations.
                    </p>
                </div>
            </section>

            <NeoButton
                variant="secondary"
                size="large"
                icon={Upload}
                onClick={onUploadAudio}
                className="voxa-hero__btn-upload"
                >
                Upload Audio
            </NeoButton>
        </>
    )
}