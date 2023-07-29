import React, { ReactNode } from "react";
import jsonData from "../lib/data.json";
const product = jsonData.productRequests;
import { Comment_, ProductRequest, Reply_ } from "../types/Data";
import { useState, useEffect } from "react";
import ProductContext from "./product-context";
const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ProductRequest[]>(product);
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("");
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mobileQuery = matchMedia("(max-width:520px)");
    setMobile(mobileQuery.matches);
    const mobileChange = (event: MediaQueryListEvent) => {
      setMobile(event.matches);
    };
    mobileQuery.addListener(mobileChange);
    return () => {
      mobileQuery.removeListener(mobileChange);
    };
  }, []);
  useEffect(() => {
    const mobileQuery = matchMedia("(max-width:520px)");
    setMobile(mobileQuery.matches);
    const mobileChange = (event: MediaQueryListEvent) => {
      setMobile(event.matches);
    };
    mobileQuery.addListener(mobileChange);
    return () => {
      mobileQuery.removeListener(mobileChange);
    };
  }, []);
  const typeHandler: (type_: string) => void = (type_) => {
    setType(type_);
  };
  const bug = data.filter(({ category }) => category === "bug");
  const enhancement = data?.filter(
    ({ category }) => category === "enhancement"
  );
  const feature = data.filter(({ category }) => category === "feature");
  const ui = data.filter(({ category }) => category === "ui");
  const ux = data.filter(({ category }) => category === "ux");
  const filterData =
    type === "bug"
      ? bug
      : type === "enhancement"
      ? enhancement
      : type === "feature"
      ? feature
      : type === "ux"
      ? ux
      : type === "ui"
      ? ui
      : type === "all"
      ? data
      : data;
  const sortHandler: (sort_: string) => void = (sort_) => {
    setSort(sort_);
  };
  if (sort === "least upvotes") {
    filterData.sort((a, b) => a.upvotes - b.upvotes);
  } else if (sort === "most upvotes") {
    filterData.sort((a, b) => b.upvotes - a.upvotes);
  } else if (sort === "least comments") {
    filterData.sort((a, b) => {
      const a_length = a.comments ? a.comments.length : 0;
      const b_length = b.comments ? b.comments.length : 0;
      return a_length - b_length;
    });
  } else if (sort === "most comments") {
    filterData.sort((a, b) => {
      const a_length = a.comments ? a.comments.length : 0;
      const b_length = b.comments ? b.comments.length : 0;
      return b_length - a_length;
    });
  }
  const addFeedback: (payload: ProductRequest) => void = (payload) => {
    setData([...data, payload]);
  };
  const addComment: (title_: string | undefined, comment: Comment_) => void = (
    title_,
    comment
  ) => {
    if (title_ !== undefined) {
      setData((prevState) => {
        const filter = prevState.find(({ title }) => title === title_);
        if (filter !== undefined && comment !== undefined) {
          if (filter.comments === undefined) {
            filter.comments = [];
            filter.comments = [...filter.comments, comment];
          } else {
            filter.comments = [...filter.comments, comment];
          }
          return [...prevState];
        }
        return prevState;
      });
    }
  };
  const editFeedback = (
    title_: string | undefined,
    payload: {
      title: string;
      status: string;
      description: string;
      id: string | number;
    }
  ) => {
    if (title_ !== undefined) {
      setData(
        data.map((data_) =>
          data_.title === title_
            ? {
                ...data_,
                title: payload.title,
                status: payload.status,
                id: payload.id,
                description: payload.description,
              }
            : data_
        )
      );
    }
  };
  const deleteFeedback = (title_: string | undefined) => {
    setData((prevState) => {
      if (title_ !== undefined) {
        const filter = prevState.findIndex(({ title }) => title === title_);
        prevState.splice(filter, 1);
      }
      return prevState;
    });
  };
  const addReply: (
    reply: Reply_,
    title_: string | undefined,
    commentId: string | number | undefined
  ) => void = (reply, title_, commentId) => {
    if (title_ !== undefined) {
      setData((prevState) => {
        const feedback = prevState.find(({ title }) => title === title_);
        if (feedback !== undefined) {
          if (feedback.comments !== undefined) {
            const comments = feedback.comments.find(
              ({ id }) => id === commentId
            );
            if (comments !== undefined) {
              if (comments.replies === undefined) {
                comments.replies = [];
                comments.replies = [...comments.replies, reply];
              } else {
                comments.replies = [...comments.replies, reply];
              }
            }
          }
          return [...prevState];
        }
        return prevState;
      });
    }
  };
  const productContext = {
    data: data,
    type: type,
    sort: sort,
    filterData: filterData,
    addFeedback: addFeedback,
    addComment: addComment,
    addReply: addReply,
    typeHandler,
    sortHandler,
    editFeedback,
    deleteFeedback,
    mobile,
  };
  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
};
export default ProductProvider;
