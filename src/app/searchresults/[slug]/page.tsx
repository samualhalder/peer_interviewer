import React from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const searchSlug = slug.split("-");
  return <>{searchSlug}</>;
}
