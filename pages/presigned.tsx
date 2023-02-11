import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { GetServerSideProps } from "next";

interface Props {
  presignedUrl: string;
}

export default function PresignedImage(props: Props) {
  return (
    <>
      <Head>
        <title>Presigned Image</title>
      </Head>
      <main className={styles.main}>
        <Image src={props.presignedUrl} alt="Seattle" fill />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const s3Client = new S3Client({
    region: "us-west-2",
    credentials: {
      accessKeyId: process.env.SSR_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.SSR_SECRET_ACCESS_KEY as string,
    },
  });

  const command = new GetObjectCommand({
    Bucket: process.env.IMAGE_S3_BUCKET as string,
    Key: process.env.IMAGE_S3_KEY as string,
  });

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 300,
  });

  return {
    props: {
      presignedUrl,
    },
  };
};
