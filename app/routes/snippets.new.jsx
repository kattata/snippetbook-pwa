import { redirect, json, useLoaderData } from "remix";
import SnippetForm from "~/components/snippetForm";
import connectDb from "~/db/connectDb.server";

export async function action({ request, params }) {
  const db = await connectDb();
  const form = await request.formData();
  const title = form.get("title");
  const description = form.get("description");
  const language = form.get("language");
  const snippet = form.get("snippet");
  const folderId = form.get("folder");

  try {
    const result = await db.models.Snippet.create({
      title,
      description,
      language,
      snippet,
      favorite: false,
      folder_id: folderId,
      date_updated: Date.now(),
    });
    return redirect(`/folders/${folderId}/snippets/${result._id}`);
  } catch (error) {
    return json(
      { errors: error.errors, values: Object.fromEntries(form) },
      { status: 400 }
    );
  }
}

export async function loader() {
  const db = await connectDb();
  return db.models.Folder.find();
}

export default function CreateSnippet() {
  const folders = useLoaderData();
  return (
    <div className="wrapper">
      <div className="wrapper-inner">
        <h1 className="h1">Add a new code snippet</h1>
        <SnippetForm folders={folders} />
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  console.log(error);
  return (
    <>
      <p className="text-red-500">
        You're offline. This action is unavailable until you're connected again
      </p>
    </>
  );
}
