import React, { useRef } from 'react';
import type { DotLottie } from '@lottiefiles/dotlottie-web';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface AppLoadingAnimationProps {
  onComplete: () => void;
}

const AppLoadingAnimation: React.FC<AppLoadingAnimationProps> = ({ onComplete }) => {
  const dotLottieRef = useRef<DotLottie | null>(null);

  const handleDotLottieRef = (instance: DotLottie | null) => {
    if (!instance) return;
    dotLottieRef.current = instance;
    instance.addEventListener('complete', () => {
      onComplete();
    });
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center m-0 p-0">
      <DotLottieReact
        src="https://lottie.host/8589bd8f-48bc-4af1-9805-5a54bbe753ca/ZJz9Ksucnw.lottie"
        loop={false}
        autoplay
        dotLottieRefCallback={handleDotLottieRef}
      />
    </div>
  );
};

export default AppLoadingAnimation;
