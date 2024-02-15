"use client"

import { useEffect, useState } from "react";
import ArticleForm from "@/components/articleForm";

export default function Edit({ params }) {
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/articles/${params.slug}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setArticleData(data.article);
      })
  }, [params.slug])

  if (!articleData) {
    return <div>Loading...</div>
  }

  // articleData に値が入ったのを検知して、再レンダリングされるため以下が実行される
  return (
    <ArticleForm
      originalTitle={articleData.title}
      originalDescription={articleData.description}
      originalBody={articleData.body}
      originalTagList={articleData.tag_list}
      endpoint={`http://localhost:3000/api/articles/${params.slug}`}
      method="PUT"
    />
  );
}