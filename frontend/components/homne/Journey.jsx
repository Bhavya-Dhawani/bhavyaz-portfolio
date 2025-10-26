import React from 'react';
import styles from '@/css/components/home/Jounery.module.css'
import Head from '@/ui/Head';
import Timeline from '@/SubCOmponents/journey/Timeline';

const Journey = () => {
  return (
    <div className={styles.journey}>
      <section className={styles.journeyHead}>
        <Head>Journey</Head>
      </section>

      <section className={styles.journeyTimeline}>
        <Timeline />
      </section>
      {/* <section></section> */}
    </div>
  )
};


export default Journey
