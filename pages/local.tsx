import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

import seattle from "@/public/thom-milkovic-unsplash.jpg";

export default function LocalImage() {
  return (
    <>
      <Head>
        <title>Local Image</title>
      </Head>
      <main className={styles.main}>
        <h1>With import from public</h1>
        <Image src={seattle} alt="Seattle" fill placeholder="blur" />
        <h1>With src=/thom-milkovic-unsplash.jpg</h1>
        <Image src="/thom-milkovic-unsplash.jpg" alt="Seattle" fill placeholder="blur" />
      </main>
    </>
  );
}
