import { redirect, json, Form, useActionData } from "remix";
import Input from "~/components/input";
import SnippetForm from "~/components/snippetForm";
import connectDb from "~/db/connectDb.server";

export async function action({ request }) {
  const db = await connectDb();
  const form = await request.formData();
  const title = form.get("title");
  const description = form.get("description");
  const language = form.get("language");
  const snippet = form.get("snippet");

  try {
    const result = await db.models.Snippet.create({
      title,
      description,
      language,
      snippet,
      favorite: false,
      date_updated: Date.now(),
    });
    return redirect(`/snippets/${result._id}`);
  } catch (error) {
    return json(
      { errors: error.errors, values: Object.fromEntries(form) },
      { status: 400 }
    );
  }
}

export default function CreateSnippet() {
  return (
    <div className="wrapper">
      <div className="wrapper-inner">
        <h1 className="h1">Add a new code snippet</h1>
        <SnippetForm />
      </div>
    </div>
  );
}
