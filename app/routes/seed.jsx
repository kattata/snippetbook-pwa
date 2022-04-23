import { Form, Link, redirect, useLoaderData } from "remix";
import connectDb from "~/db/connectDb.server";
import seedData from "~/db/seed.json";

export async function loader() {
  const db = await connectDb();
  const currentSnippetsCount = await db.models.Snippet.find().countDocuments();
  const seededSnippets = seedData;
  return {
    seededSnippets,
    currentSnippetsCount,
  };
}

export async function action() {
  const db = await connectDb();
  try {
    await db.models.Snippet.deleteMany();
    await db.models.Snippet.insertMany(seedData);
    return redirect("/snippets");
  } catch (error) {
    throw new Error("Error");
  }
}

export default function Seed() {
  const { currentSnippetsCount, seededSnippets } = useLoaderData();
  return (
    <div className="wrapper">
      <div className="wrapper-inner">
        <h2 className="text-lg font-bold mb-2">Re-seed your snippets</h2>
        <p>You currently have {currentSnippetsCount} snippets.</p>
        <p>
          Do you want to delete your snippets and re-seed with{" "}
          {seededSnippets.length} snippets?
        </p>
        <div className="flex gap-3 mt-3">
          <Link to="/snippets">
            <button className="font-bold">No</button>
          </Link>
          <Form method="post">
            <button type="submit" className="font-bold">
              Yes
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
