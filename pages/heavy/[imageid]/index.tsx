import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";

import abenezer from "@/public/abenezer-shewaga-unsplash-3MB.jpg";
import samsung1 from "@/public/samsung-uk-unsplash-6MB.jpg";
import samsung2 from "@/public/samsung-uk-unsplash-7MB.jpg";
import swainson from "@/public/sarah-swainson-unsplash-4MB.jpg";

export default function HeavyImages() {
  const router = useRouter();
  const { imageid } = router.query;

  const getImageOptimized = () => {
    switch (imageid) {
      case "abenezer":
        return <Image src={abenezer} alt="Abenezer Shewaga" width={1530} />;
      case "samsung1":
        return <Image src={samsung1} alt="Samsung UK" width={1530} />;
      case "samsung2":
        return <Image src={samsung2} alt="Samsung UK" width={1530} />;
      case "swainson":
        return <Image src={swainson} alt="Sarah Swainson" width={1530} />;
    }
  };

  const getRawImage = () => {
    switch (imageid) {
      case "abenezer":
        return (
          <img
            src="/abenezer-shewaga-unsplash-3MB.jpg"
            alt="Abenezer Shewaga"
            width="100%"
          />
        );
      case "samsung1":
        return <img src="/samsung-uk-unsplash-6MB.jpg" alt="Samsung UK" width="100%" />;
      case "samsung2":
        return <img src="/samsung-uk-unsplash-7MB.jpg" alt="Samsung UK" width="100%" />;
      case "swainson":
        return (
          <img src="/sarah-swainson-unsplash-4MB.jpg" alt="Sarah Swainson" width="100%" />
        );
    }
  };

  return (
    <>
      <Head>
        <title>Heavy Images</title>
      </Head>
      <main className={styles.main}>
        <h1>Optimized</h1>
        {getImageOptimized()}
        <h1>Unoptimized</h1>
        {getRawImage()}
      </main>
    </>
  );
}
