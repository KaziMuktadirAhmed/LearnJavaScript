import Head from "next/head";
import Link from "next/Link";
import Layout from "../../components/layout";
import React from "react";

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First post</title>
      </Head>

      <h1>First Post</h1>
      <pre>This is good</pre>
      <h2>
        Go back to <Link href="/">title page</Link>
      </h2>
    </Layout>
  );
}
