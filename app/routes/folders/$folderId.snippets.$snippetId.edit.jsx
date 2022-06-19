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
  const folderId = form.get("folder");

  try {
    await db.models.Snippet.findByIdAndUpdate(
      { _id: params.snippetId },
      {
        title,
        description,
        language,
        snippet,
        folder_id: folderId,
        date_updated: Date.now(),
      }
    );
    return redirect(`/folders/${folderId}/snippets/${params.snippetId}`);
  } catch (error) {
    return json(
      { errors: error.errors, values: Object.fromEntries(form) },
      { status: 400 }
    );
  }
}

export async function loader({ params }) {
  const db = await connectDb();
  const data = {
    snippet: await db.models.Snippet.findById(params.snippetId),
    folders: await db.models.Folder.find(),
  };
  return data;
}

export default function EditSnippet() {
  const data = useLoaderData();
  console.log(data);
  return (
    <>
      <h1 className="h1">Edit a code snippet</h1>
      <SnippetForm snippet={data.snippet} folders={data.folders} />
    </>
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
