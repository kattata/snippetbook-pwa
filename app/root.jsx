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
import NavBar from "./components/navbar";
import { useState } from "react";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/manifest/apple-touch-icon.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/manifest/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/manifest/favicon-16x16.png",
  },
  {
    rel: "manifest",
    href: "/manifest/site.webmanifest",
  },
  {
    rel: "mask-icon",
    href: "/manifest/safari-pinned-tab.svg",
    color: "#5bbad5",
  },
];

export const meta = () => [
  {
    charset: "utf-8",
    title: "SnippetBook",
    viewport: "width=device-width,initial-scale=1",
  },
  {
    name: "msapplication-TileColor",
    content: "#9f00a7",
  },
  {
    name: "theme-color",
    content: "#ffffff"
  },
];

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
  const [menuOpen, setMenuOpen] = useState();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="font-lato bg-slate-100 flex justify-between">
        <NavBar data={data} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <SideBar data={data} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
