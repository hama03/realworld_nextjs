import ArticleForm from "@/components/articleForm";

export default function New() {
  return (
    <ArticleForm
      originalTitle=""
      originalDescription=""
      originalBody=""
      originalTagList={[]}
      endpoint="http://localhost:3000/api/articles"
      method="POST"
    />
  );
}