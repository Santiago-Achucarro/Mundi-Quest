import Head from "next/head";
import react from "react";

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="./icon-world.svg" type="image/x-icon" />
      </Head>
      {children}
    </>
  );
};

export { Layout };
