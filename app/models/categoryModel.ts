import { Model, Schema, model, models } from "mongoose";
import { CategoryDocument } from "@lib/types";

const categorySchema = new Schema<CategoryDocument>({
  name: {
    type: String,
    required: true,
  },
});

const CategoryModel = models.Category || model("Category", categorySchema);

export default CategoryModel as Model<CategoryDocument>;
