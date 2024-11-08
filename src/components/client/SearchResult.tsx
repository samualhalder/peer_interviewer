"use client";
import { getSearchUsers } from "@/actions/user";
import React, { useState } from "react";

export default function SearchResult({ slug }: { slug: string }) {
  const [results, setResults] = useState([]);
  const originalSlug = slug.split("-");

  const findSearchResult = async () => {
    const data = await getSearchUsers(originalSlug);
  };
  console.log(data);

  findSearchResult();

  return <></>;
}
