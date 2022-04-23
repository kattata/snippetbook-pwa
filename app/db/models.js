import { mongoose } from "mongoose";

const { Schema } = mongoose;

const snippetSchema = new Schema({
  title: String,
  description: String,
  language: String,
  date_updated: Date,
  favorite: Boolean,
  snippet: String,
});

const folderSchema = new Schema({
  name: String,
});

export const models = [
  {
    name: "Snippet",
    schema: snippetSchema,
    collection: "snippets",
  },
  {
    name: "Folder",
    schema: folderSchema,
    collection: "folders",
  },
];
