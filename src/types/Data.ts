export type User = {
  image: string;
  name: string;
  username: string;
};

export type Comment_ = {
  id: number | string;
  content: string;
  user: User;
  replies?: Reply_[];
};

export type Reply_ = {
  content: string;
  replyingTo: string;
  user: User;
};

export type ProductRequest = {
  id: number | string;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: Comment_[];
};

export type Data = {
  currentUser: User;
  productRequests: ProductRequest[];
};

export type AddReply = (
  reply: Reply_,
  title_: string | undefined,
  commentId: string | number | undefined
) => void;
