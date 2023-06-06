'use client';
import styles from '../styles/splashScreen.module.css';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

type SplashScreenProps = {
  finishLoading: () => void;
};

export default function SplashScreen({ finishLoading }: SplashScreenProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const animation = () => {
    const loader = gsap.timeline({
      onComplete: () => finishLoading(),
    });

    loader
      .to('#left', {
        x: '-70%',
        duration: 1.2,
        ease: 'power2.out',
        delay: '.3',
      })
      .to(
        '#right',
        {
          x: '70%',
          duration: 1.2,
          ease: 'power2.out',
        },
        '<'
      )
      .to('#left, #right', {
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power4.out',
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animation();
    return () => clearTimeout(timeout);
  });

  return (
    <div className={styles.splash}>
      <div className={styles.curtainWraper}>
        <h2 className={`${styles.splashTitle} title`}>
          CINEMY=ROOM <br></br>
          <span className={styles.splashTitleSm}>マイシネマ</span>
        </h2>
        <div id="left" className={`${styles.curtainLeft}`}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className={styles.curtainElement}></div>
          ))}
        </div>
        <div id="right" className={`${styles.curtainRight}`}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className={styles.curtainElement}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
