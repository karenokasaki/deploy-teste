import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../api/api";

function CreatePost({ setReload, reload }) {
  const [form, setForm] = useState({
    content: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/posts/create", form);
      setForm({
        content: "",
      });
      setReload(!reload);

      toast.success("Post criado com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar o post");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Post</label>
      <input
        type="text"
        required
        name="content"
        value={form.content}
        onChange={handleChange}
      />

      <button type="submit">Enviar</button>
    </form>
  );
}

export default CreatePost;
