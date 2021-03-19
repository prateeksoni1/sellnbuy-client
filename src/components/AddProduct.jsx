import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";

const AddProduct = ({history, userEmail }) => {
  const { register, handleSubmit, errors } = useForm();
  const [error, setError] = useState();

  const onAdd = async (values) => {
    try {
      let ownerId = 0;
      const response = await axios
        .get("http://localhost:8000/api/v1/users", {
          params: { email: userEmail },
        })
        .then(function (response) {
          ownerId = response.data.users[0].id;
        });
      values["ownerId"] = ownerId;
      const res = await axios.post(
        "http://localhost:8000/api/v1/products",
        values,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if(res.data.ok){
          alert("PRODUCT CREATED");
        history.push("/dashboard");
      }
    } catch (err) {
      if (!err.response) {
        setError("Internal Server Error");
      } else setError(err.response.data.message);
    }
  };

  return (
    <>
      <div className="mt-5 container" style={{ maxWidth: "30vw" }}>
        <h3 className="display-5 mb-4">Add your Product</h3>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(onAdd)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Product Name
            </label>
            <input
              type="name"
              className="form-control"
              id="name"
              name="name"
              ref={register({
                required: true,
                minLength: 4,
              })}
              placeholder="Enter your product's name"
            />
            <p className="text-danger">
              {errors.name && "Invalid Name provided"}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="tel"
              className="form-control"
              id="price"
              name="price"
              placeholder="Enter the price for your product"
              ref={register({
                required: true,
                min: 1,
              })}
            />
            <p className="text-danger">{errors.price && "Minimum $1"}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              name="category"
              id="category"
              ref={register({
                required: true,
              })}
            >
              <option selected>Choose your product's category</option>
              <option value="a">a</option>
              <option value="b">b</option>
            </select>
            <p className="text-danger">
              {errors.category && "Categories are required."}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="name"
              className="form-control"
              id="image"
              name="image"
              placeholder="Enter your Image's URL"
              ref={register({
                required: true,
              })}
            />
            <p className="text-danger">
              {errors.image && "Images are required."}
            </p>
          </div>
          <button type="submit" className="mt-3 btn btn-primary w-100 btn-lg">
            Add
          </button>
        </form>
      </div>
    </>
  );
};
export default AddProduct;
