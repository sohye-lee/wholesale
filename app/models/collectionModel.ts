import { Model, Schema, model, models } from "mongoose";
import { CollectionDocument } from "@lib/types";

const collectionSchema = new Schema<CollectionDocument>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const CollectionModel =
  models.Collection || model("Collection", collectionSchema);

export default CollectionModel as Model<CollectionDocument>;
