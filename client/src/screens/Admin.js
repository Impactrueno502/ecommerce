import React, { useEffect, useState } from "react";
import { getAllOrders } from "../Redux/Actions/ProductActions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Navar = styled.div`
 display: flex;
  width: 100vw;
  height: 50px;
  background: #212f45;
  justify-content: space-around;
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
const Conteinerpadre=styled.div`
width: 100vw;
height: 100vh;
background:#3a537a;`;

const Admin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar la llamada a la acción para obtener los datos
        const perros = await dispatch(getAllOrders());
        setDatos(perros);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Conteinerpadre>
    <Navar>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
       
          <p className="navbar-brand"> PANEL DEL ADMINISTRADOR</p>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit"></button>
          </form>
          <Asd 
          //className="btn btn-primary"
                  to="/ProductAdmin"
                >
                  Productos ingresados
                </Asd>
          

          <Asd 
          //className="btn btn-primary"
                  to="/"
                >
                 Salir
                </Asd>

        </div>
      </nav>
      </Navar>
      {loading ? (
        <div className="mb-5">Loading...</div>
      ) : (
        <>
          {console.log(datos)}

          {datos.map((orden) => (
            <ul className="list-group d-flex" key={orden._id}>
              <li className="list-group-item d-flex justify-content-between mx-5 px-5 align-items-center">
                {orden._id}
                <Link
                  className="btn btn-primary"
                  to={`/orderadmin/${orden._id}`}
                >
                  VER ORDEN
                </Link>
              </li>
            </ul>
          ))}
        </>
      )}
    </Conteinerpadre>
  );
};

export default Admin;
