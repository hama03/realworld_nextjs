import React from "react";

const ArticlePage = ({ article }) => {
  // 記事のデータが正しく取得できているか確認する
  if (!article) {
    return <div>記事が見つかりません。</div>;
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.description}</p>
            <p>{article.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  // URLから記事のスラッグを取得
  const { slug } = context.query;

  try {
    // APIから記事データを取得
    const res = await fetch(`http://localhost:3000/api/articles/${slug}`);
    const data = await res.json();

    if (res.ok) {
      // 記事データをページコンポーネントに渡す
      return {
        props: {
          article: data.article,
        },
      };
    } else {
      // 記事が見つからない場合はエラーメッセージを表示
      return {
        props: {
          article: null,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching article data:", error);
    // エラーが発生した場合もエラーメッセージを表示
    return {
      props: {
        article: null,
      },
    };
  }
}

export default ArticlePage;
