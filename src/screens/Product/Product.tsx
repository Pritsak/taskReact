import { useState } from "react";
import styles from "./styles.module.scss";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Modal,
  TextField,
} from "@mui/material";
import { productsApi } from "../../api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import CreateProduct from "../../components/CreateProduct";
import Comment from "../../components/Comment";
import { toast } from "react-toastify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Product() {
  const { id } = useParams();
  const { data, isLoading } = productsApi.useGetProductQuery(id);
  const [updateProduct] = productsApi.useUpdateProductMutation();
  const [openModal, setOpenModal] = useState(false);
  const [comment, setComment] = useState<string>("");
  const navigate = useNavigate();

  const handleUpdateProduct = async () => {
    data &&
      (await updateProduct({
        id: data.id,
        body: {
          imageUrl: data.imageUrl,
          name: data.name,
          count: data.count,
          size: {
            width: data.size.width,
            height: data.size.height,
          },
          weight: data.weight,
          comments: [
            ...data.comments,
            {
              productId: data.id,
              date: new Date(),
              description: comment,
            },
          ],
        },
      }).then(() => {
        setComment("");
        toast.success("Your comment was added!");
      }));
  };

  if (isLoading) {
    return <CircularProgress color="secondary" />;
  }

  return (
    <Container className={styles.product} maxWidth="sm">
      <div className={styles.btn_wrapper}>
        <Button
          onClick={() => navigate("/")}
          className={styles.back_button}
          variant="contained"
          color="secondary"
        >
          Back
        </Button>
        <Button
          onClick={() => setOpenModal(true)}
          className={styles.update_button}
          variant="contained"
          color="secondary"
        >
          Update
        </Button>
      </div>
      <img
        className={styles.product__image}
        src={data?.imageUrl}
        alt="product"
      />
      <div className={styles.product__name}>{data?.name}</div>
      <div>Count: {data?.count}</div>
      <div>
        Size: {data?.size.width} x {data?.size.height}
      </div>
      <div>Weight: {data?.weight}</div>
      <div className={styles.add_comments_container}>
        <TextField
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment..."
          color="secondary"
          fullWidth
          type="textarea"
        />
        <Button
          onClick={handleUpdateProduct}
          variant="contained"
          color="secondary"
        >
          Add Comment
        </Button>
      </div>
      <div className={styles.product__comments}>
        {data?.comments.map((elem) => [
          <Comment
            key={elem.id}
            date={elem.date}
            description={elem.description}
          />,
        ])}
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateProduct product={data} onClose={() => setOpenModal(false)} />
        </Box>
      </Modal>
    </Container>
  );
}

export default Product;
