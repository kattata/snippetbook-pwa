import { Form, json, redirect, useLoaderData } from "remix";
import Input from "~/components/input";
import SnippetForm from "~/components/snippetForm";
import connectDb from "~/db/connectDb.server";

export async function action({ request, params }) {
  const db = await connectDb();
  const form = await request.formData();
  const title = form.get("title");
  const description = form.get("description");
  const language = form.get("language");
  const snippet = form.get("snippet");

  try {
    await db.models.Snippet.findByIdAndUpdate(
      { _id: params.snippetId },
      {
        title,
        description,
        language,
        snippet,
        date_updated: Date.now(),
      }
    );
    return redirect(`/snippets/${params.snippetId}`);
  } catch (error) {
    return json(
      { errors: error.errors, values: Object.fromEntries(form) },
      { status: 400 }
    );
  }
}

export async function loader({ params }) {
  const db = await connectDb();
  return db.models.Snippet.findById(params.snippetId);
}

export default function EditSnippet() {
  const snippet = useLoaderData();
  return (
    <>
      <h1 className="h1">Edit a code snippet</h1>
      <SnippetForm snippet={snippet} />
    </>
  );
}
