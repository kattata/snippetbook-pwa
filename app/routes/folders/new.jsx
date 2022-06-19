import Input from "~/components/input";
import Button from "~/components/button";
import { Form, json, redirect } from "remix";
import connectDb from "~/db/connectDb.server";

export async function action({ request }) {
  const db = await connectDb();
  const form = await request.formData();
  const name = form.get("name");

  try {
    const result = await db.models.Folder.create({
      name,
      date_created: Date.now(),
    });
    return redirect(`/folders/${result._id}/snippets`);
  } catch (error) {
    return json(
      { errors: error.errors, values: Object.fromEntries(form) },
      { status: 400 }
    );
  }
}

export default function CreateFolder() {
  return (
    <>
      <h1 className="h1">Create a new folder</h1>
      <Form method="post">
        <Input label="Name" name="name" />
        <Button text="Submit" />
      </Form>
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
