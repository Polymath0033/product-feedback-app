import classes_ from "./Reply.module.css";
import { Reply_ } from "../types/Data";
import ReplyList from "./UI/ReplyList";
const Reply: React.FC<{
  replies?: Reply_[];
  title: string | undefined;
  id: string | number | undefined;
}> = ({ replies, title, id }) => {
  return (
    <ul className={classes_.replies}>
      {replies?.map((reply) => (
        <ReplyList
          title={title}
          commentId={id}
          name={reply.user.name}
          username={reply.user.username}
          content={reply.content}
          image={reply.user.image}
          replyingTo={reply.replyingTo}
        />
      ))}
    </ul>
  );
};
export default Reply;
