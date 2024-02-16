import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";


export default function Article({ params }) {
  const [article, setArticle] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
    author: "",
    createdAt: ""
  });
  const [messages, setMessages] = useState([]);

  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:3000/api/articles/${params.slug}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setArticle({
          title: data.article.title,
          description: data.article.description,
          body: data.article.body,
          tagList: data.article.tag_list,
          author: data.article.author.username,
          createdAt: data.article.created_at,
        });
      })
  }, [params.slug]);

  function onClickEditArticlePage() {
    router.push(`/article/${params.slug}/edit`);
  }

  async function onClickDeleteArticle() {
    const token = await getCookieValue("token");
    const res = await fetch(`http://localhost:3000/api/articles/${params.slug}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (res.ok) {
      router.push("/");
    } else {
      const data = await res.json();
      setMessages(data.errors);
    }
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

          <div className="article-meta">
            <Link href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></Link>
            <div className="info">
              <Link href="" className="author">{article.author}</Link>
              <span className="date">{article.createdAt}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow {article.author} <span className="counter">(10)</span>
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Post <span className="counter">(29)</span>
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-secondary" onClick={onClickEditArticlePage}>
              <i className="ion-edit"></i> Edit Article
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-danger" onClick={onClickDeleteArticle}>
              <i className="ion-trash-a"></i> Delete Article
            </button>
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <h2 id="introducing-ionic">{article.description}</h2>
            <p>{article.body}</p>
            <ul className="tag-list">
              {article.tagList.map((tag, index) => {
                return <li className="tag-default tag-pill tag-outline" key={index}>{tag}</li>
              })}
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}