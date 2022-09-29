function CreateComment({ setForm, handleComment, post, form }) {
  return (
    <>
      <input
        name="content"
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <button onClick={() => handleComment(post._id)}>Comentar!</button>
    </>
  );
}

export default CreateComment;
