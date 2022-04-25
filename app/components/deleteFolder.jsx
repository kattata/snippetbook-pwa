import { Form, json, redirect } from "remix";
import trash from "~/assets/ant-design_delete-outlined.svg";
import connectDb from "~/db/connectDb.server";

export default function DeleteFolder({ folder }) {
  return (
    <Form method="post" className="absolute right-2 top-2 z-10">
      <input type="hidden" name="_method" value="delete" />
      <input type="hidden" name="folder" value={folder._id} />
      <button className="p-1" type="submit">
        <img src={trash} alt="Delete Folder" className="h-5" />
      </button>
    </Form>
  );
}
