import React from "react";
import { Comment_, ProductRequest, Reply_ } from "../types/Data";
type Context = {
  data: ProductRequest[];
  filterData: ProductRequest[];
  type: string;
  sort: string;
  addFeedback: (payload: ProductRequest) => void;
  addComment: (title_: string | undefined, comment: Comment_) => void;
  addReply: (
    reply: Reply_,
    title_: string | undefined,
    commentId: string | number | undefined
  ) => void;
  typeHandler: (type: string) => void;
  sortHandler: (sort: string) => void;
  editFeedback: (
    title: string | undefined,
    payload: {
      title: string;
      status: string;
      description: string;
      id: string | number;
    }
  ) => void;
  deleteFeedback: (title_: string | undefined) => void;
};
const ProductContext = React.createContext<Context>({
  data: [],
  filterData: [],
  type: "",
  sort: "",
  addFeedback: () => {},
  addComment: () => {},
  addReply: () => {},
  typeHandler: () => {},
  sortHandler: () => {},
  editFeedback: () => {},
  deleteFeedback: () => {},
});
export default ProductContext;
