"use client"

import { useState } from "react";
import { useRouter } from "next/router";

export default function ArticleForm({ originalTitle, originalDescription, originalBody, originalTagList, endpoint, method }) {
  const [title, setTitle] = useState(originalTitle);
  const [description, setDescription] = useState(originalDescription);
  const [body, setBody] = useState(originalBody);
  const [tagList, setTagList] = useState(originalTagList);
  const [messages, setMessages] = useState([]);

  const router = useRouter();

  async function onSubmitArticle(e) {
    e.preventDefault();

    const article = {
      article: {
        title: title,
        description: description,
        body: body,
        tag_list: tagList.split(",")
      }
    }

    const res = await fetch(endpoint, {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(article)
    });

    const data = await res.json();
    if (res.ok) {
      router.push(`/article/${data.article.slug}`)
    } else {
      setMessages(data.errors);
    }
  }

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ul className="error-messages">
              {messages && messages.map((message, index) => {
                return <li key={index}>{message}</li>
              })}
            </ul>

            <form onSubmit={onSubmitArticle}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    onChange={(e) => { setTitle(e.target.value) }}
                    value={title}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    onChange={(e) => { setDescription(e.target.value) }}
                    value={description}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article"
                    onChange={(e) => { setBody(e.target.value) }}
                    value={body}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags separated by commas as tag1,tag2,tag3"
                    onChange={(e) => { setTagList(e.target.value) }}
                    value={tagList}
                  />
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}