import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/homeComponents/Rating";
import Pagination from "../components/homeComponents/pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../Redux/Actions/ProductActions";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import styled from "styled-components";
const Navar = styled.div`
display: flex;
  width: 100vw;
  height: 50px;
  background: #212f45;
 
  align-items: center;
  color: white;
`;
const Asd = styled(Link)`
 text-decoration: none;
  color: #ffe29a;
  font-size: 25px;
  transition: 200ms;
  margin: 20px;
  justify-content: space-around;
&:hover {
    color: #a5b7d4;
}
`;
const Ingreso = styled.div`
  display: block;
  width: 100vw;
  height: 410px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background:#3a537a;
`;
const Ingresopro = styled.input`
width: 300px;
height: 40px;
 background-color: #dae1ed;
 border-radius: 5px;
 box-shadow: 0 5px 15px 0px;
  font-size: 20px;
  padding: 10px 5px;
  margin: 10px;
  transition: 200ms;
&:hover {
    color: #213046;

}
`;

const Conteinerpadre=styled.div`
width: 100vw;
height: 850px;
background:#3a537a;
`;
const Conteinerproductos=styled.div`
margin: 0 auto;
width: 100vh;
height: auto;
background:#3a537a;
`;
const ConteinerPro = styled.div`
display: flex;
justify-content: center;
align-items: center;
text-align: center;
padding: 12px 12px;
font-size: 20px;
width: 100vh;
height: 800px;
overflow-y: auto;
background:#314869;
`;

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword, pagenumber));
  }, [dispatch, keyword, pagenumber]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    description: "",
    rating: 0,
    numReviews: 0,
    price: 0,
    countInStock: 0,
  });

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = () => {
    // Aquí puedes realizar la lógica para agregar el nuevo producto al sistema
    // Utiliza el objeto newProduct para obtener los valores de los campos de entrada
    console.log("Nuevo producto:", newProduct);
    // Restablecer los campos de entrada
    setNewProduct({
      name: "",
      image: "",
      description: "",
      rating: 0,
      numReviews: 0,
      price: 0,
      countInStock: 0,
    });
  };

  return (
    <>
      <Navar>
        <Asd  to="/Admin">
          Regresar
        </Asd>
      </Navar>
      <Ingreso>
        <h2>Ingreso de nuevo prodcto</h2>
        <div>
          <Ingresopro 
            type="text"
            name="name"
            placeholder="Nombre"
            value={newProduct.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Ingresopro
            type="text"
            name="image"
            placeholder="URL de la imagen"
            value={newProduct.image}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Ingresopro
            type="text"
            name="description"
            placeholder="Descripción"
            value={newProduct.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Ingresopro
            type="number"
            name="price"
            placeholder="Precio"
            value={newProduct.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Ingresopro
            type="number"
            name="countInStock"
            placeholder="Cantidad en stock"
            value={newProduct.countInStock}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleAddProduct}>Agregar</button>
      </Ingreso>
      <Conteinerpadre>
      <Conteinerproductos>
      <ConteinerPro>      
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : products.length === 0 ? (
                  <div className="col-12 alert alert-info text-center mt-3">
                    No products found
                  </div>
                ) : (
                  <ul className="product-list">
                    {products.map((product) => (
                      <li className="product-item" key={product._id}>
                        <Link to={`/products/${product._id}`}>
                          <div className="product-image">
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{ width: "100px" }}
                            />
                          </div>
                        </Link>
                        <div className="product-info">
                          <p>{product.name}</p>
                          <p>Stock: {product.countInStock}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Pagination */}
                <Pagination
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      </ConteinerPro>
      </Conteinerproductos>
      </Conteinerpadre>
    </>
  );
};

export default ShopSection;
