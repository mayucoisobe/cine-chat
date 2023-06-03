import styles from '../styles/splash.module.css';
// 'use client';
import { useLayoutEffect } from 'react';

// GSAP のインポート
// import gsap from 'gsap';
import { gsap } from 'gsap';

export default function Splash() {
  const tl = gsap.timeline();
  useLayoutEffect(() => {
    gsap.to('.left', {
      x: '-70%',
      duration: 1.5,
      ease: 'power2.out',
    });

    tl.to('.right', {
      x: '70%',
      duration: 1.5,
      ease: 'power2.out',
    }).to('.curtain', {
      autoAlpha: 0,
      duration: 0.5,
      ease: 'power4.out',
    });
  }, []);

  return (
    <div className={styles.splash}>
      <div className={styles.curtainWraper}>
        <h2 className={styles.splashTitle}>
          CINEMY=ROOM <br></br>
          <span className={styles.splashTitleSm}>マイシネマ</span>
        </h2>
        <div className={`${styles.curtainLeft} curtain left`}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className={styles.curtainElement}></div>
          ))}
        </div>
        <div className={`${styles.curtainRight} curtain right`}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className={styles.curtainElement}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
