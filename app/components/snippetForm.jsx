import { Form } from "remix";
import Input from "~/components/input";
import Select from "~/components/select";
import Button from "~/components/button";

export default function SnippetForm({ snippet, folders }) {
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
          <Select label="Folder" name="folder" values={folders} />
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
      <Button text="Submit" />
    </Form>
  );
}
