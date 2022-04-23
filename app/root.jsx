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
  const id = form.get("_id");
  if (toggleFavorite(form, id)) {
    return redirect(`/snippets/${id}`);
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
