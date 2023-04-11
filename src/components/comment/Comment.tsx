import styles from "./styles.module.scss";

interface Props {
  description: string;
  date: Date;
}

function Comment(props: Props) {
  return (
    <div className={styles.root}>
      <h4 className={styles.date}>{new Date(props.date).toLocaleString()}</h4>
      <p>{props.description}</p>
    </div>
  );
}

export default Comment;
