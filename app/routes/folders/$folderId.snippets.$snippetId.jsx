import { Form, json, Link, redirect, useLoaderData, useParams } from "remix";
import connectDb from "~/db/connectDb.server";
import trash from "~/assets/ant-design_delete-outlined.svg";
import edit from "~/assets/ant-design_edit-outlined.svg";
import copy from "~/assets/ant-design_copy-outlined.svg";
import { formatDate } from "~/utils/helpers";
import Favorite, { toggleFavorite } from "~/components/favorite";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";
import light from "react-syntax-highlighter/dist/cjs/styles/prism/one-light";

export async function loader({ params }) {
  const db = await connectDb();
  return db.models.Snippet.findById(params.snippetId);
}

export const action = async function ({ request, params }) {
  const form = await request.formData();
  const db = await connectDb();
  const id = params.snippetId;

  if (form.get("_method") === "delete") {
    try {
      await db.models.Snippet.findByIdAndDelete({
        _id: id,
      });
      return redirect(`/folders/${params.folderId}`);
    } catch (error) {
      return json(
        { errors: error.errors, values: Object.fromEntries(form) },
        { status: 400 }
      );
    }
  }

  if (toggleFavorite(form, id)) {
    return null;
  }
};

export default function Snippet() {
  const snippet = useLoaderData();
  const params = useParams();
  const [copyTo, setCopyTo] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.snippet);
    setCopyTo(true);
    setTimeout(() => {
      setCopyTo(false);
    }, 1000);
  };
  function handleThisShit() {
    switch (snippet?.language.toLowerCase()) {
      case "javascript":
        return "javascript";
      case "react":
        return "jsx";
      case "php":
        return "php";
      case "mysql":
        return "sql";
      case "csharp":
        return "csharp";
      case "json":
        return "json";
      case "markdown":
        return "markdown";
      case "python":
        return "python";
      case "scss" || "sass":
        return "scss";
      case "typescript" || "sass":
        return "typescript";
      case "html":
        return "html";
      case "css":
        return "css";
      default:
        return "javascript";
    }
  }
  let snippetLanguage = handleThisShit();

  return (
    <>
      <div className="flex justify-between items-center text-slate-400 text-xs">
        <p className="uppercase">{snippet?.language}</p>
        <div className="flex gap-2">
          <Favorite snippet={snippet} />
          <Link
            to={`/folders/${params.folderId}/snippets/${params.snippetId}/edit`}
          >
            <button className="p-1">
              <img src={edit} alt="Edit" className="h-5" />
            </button>
          </Link>
          <Form method="post">
            <input type="hidden" name="_method" value="delete" />
            <button type="submit" className="p-1">
              <img src={trash} alt="Delete" className="h-5" />
            </button>
          </Form>
        </div>
      </div>
      <span className="bg-slate-300 block h-[1px] w-full mt-2 mb-3"></span>
      <p className="text-slate-400 text-xs absolute right-10">
        {formatDate(snippet?.date_updated)}
      </p>
      <h1 className="h1">{snippet?.title}</h1>
      <p className="mb-8">{snippet?.description}</p>
      <div className="grey-border p-6 relative">
        <button
          className="absolute right-2 top-2 flex gap-2"
          onClick={copyToClipboard}
        >
          <p
            className={` transition-all duration-300 text-slate-400 ${
              copyTo ? "opacity-100" : "opacity-0"
            }`}
          >
            Copied!
          </p>
          <img src={copy} alt="Copy to Clipboard" className="h-5" />
        </button>
        <pre className="overflow-x-auto whitespace-pre-wrap">
          <code>
            <SyntaxHighlighter language={snippetLanguage} style={light}>
              {snippet?.snippet}
            </SyntaxHighlighter>
          </code>
        </pre>
      </div>
    </>
  );
}
