import { Form } from "remix";
import Input from "~/components/input";

export default function SnippetForm({ snippet }) {
  return (
    <Form method="post">
      <div className="flex justify-between gap-5">
        <div className="w-1/2">
          <Input label="Title" name="title" value={snippet?.title} />
          <Input
            label="Description"
            isTextarea="true"
            name="description"
            rows="5"
            value={snippet?.description}
          />
          <Input label="Language" name="language" value={snippet?.language} />
        </div>
        <div className="w-full">
          <Input
            label="Code snippet"
            isTextarea="true"
            name="snippet"
            rows="20"
            value={snippet?.snippet}
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-slate-800 text-white uppercase py-2 px-7 rounded text-sm font-bold ml-auto mr-0 mt-4 block"
      >
        Submit
      </button>
    </Form>
  );
}
