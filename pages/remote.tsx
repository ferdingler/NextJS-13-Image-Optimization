import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

export default function RemoteImage() {
  return (
    <>
      <Head>
        <title>Remote Image</title>
      </Head>
      <main className={styles.main}>
        <Image
          src="https://images.unsplash.com/photo-1542223616-740d5dff7f56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1708&q=80"
          alt="Seattle"
          fill
        />
      </main>
    </>
  );
}
