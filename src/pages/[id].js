import Head from "next/head";

import connectToDeta from "@/lib/deta";

export default function Page({}) {
  return <></>;
}

export async function getServerSideProps(req) {
  const id = req.query.id;
  // connect to database look for the certain id then if the id exists redirect it to that url
  const getIdData = async (id) => {
    const db = connectToDeta()

    const url = await db.get(id);
    
    return url
  };

  const url = await getIdData(id);

  if (url !== null){
    return {
      redirect: {
        destination: url.page,
        permanent: false,
      },
    };
  } else {
    return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
  }

  return {
    props: {},
  };
}
