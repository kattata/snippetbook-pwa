import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  redirect,
  json,
} from "remix";
import styles from "~/tailwind.css";
import favicon from "~/assets/bi_code-slash.svg";
import { toggleFavorite } from "./components/favorite";
import connectDb from "./db/connectDb.server";
import SnippetList from "./components/snippetList";
import FolderList from "./components/folderList";
import SideBar from "./components/sidebar";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "icon",
    type: "image/x-icon",
    href: favicon,
  },
];

export function meta() {
  return {
    charset: "utf-8",
    title: "SnippetBook",
    viewport: "width=device-width,initial-scale=1",
  };
}

export async function loader() {
  const db = await connectDb();
  const data = {
    snippets: await db.models.Snippet.find(),
    folders: await db.models.Folder.find(),
  };
  return data;
}

export async function action({ request }) {
  const form = await request.formData();
  const snippetId = form.get("_id");
  const folderId = form.get("folderId");
  const id = form.get("folder");
  const db = await connectDb();

  if (form.get("_method") === "delete") {
    console.log(id);
    try {
      await db.models.Folder.findByIdAndDelete({
        _id: id,
      });
      return redirect(`/`);
    } catch (error) {
      return json(
        { errors: error.errors, values: Object.fromEntries(form) },
        { status: 400 }
      );
    }
  }

  if (toggleFavorite(form, snippetId)) {
    return redirect(`/folders/${folderId}/snippets/${snippetId}`);
  } else {
    throw new Response("Not Found", {
      status: 404,
    });
  }
}

export default function App() {
  const data = useLoaderData();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="font-lato bg-slate-100 flex justify-between">
        <SideBar data={data} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
