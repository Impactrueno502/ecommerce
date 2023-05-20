import React, { useEffect, useState } from "react";
import { getOrderDetails1 } from "../Redux/Actions/OrderActions";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
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
const Conteinerpadre=styled.div`
width: 100vw;
height: 100vh;
background:#3a537a;`;


const AdminOrder = () => {
  const id = document.URL;
  const indice = id.split("/").at(-1);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar la llamada a la acción para obtener los datos
        const perros = await dispatch(getOrderDetails1(indice));
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
    <Asd 
          //className="btn btn-primary"
                  to="/Admin"
                >
                 Regresar
                </Asd>
    </Navar>
      {loading ? (
        <div className="mb-5">Loading...</div>
      ) : (
        <>
          {console.log(datos)}
          <div>
            AdminOrder
            <h1>Su codigo es: {indice}</h1>
            <h1>Su nombre es: {datos.user.name}</h1>
            <h3>EL USUARIO SOLICITO:</h3>
            <h1>Placa asus</h1>
            <h1>pc gamer</h1>
            <h1>Producto 1</h1>
            <h1>Procesador</h1>
            <input type="radio" name="opcion" id="opcion1" />
            <label for="opcion1">Entregado</label>
            <h1></h1>
            <input type="radio" name="opcion" id="opcion2" />
            <label for="opcion2">Enproceso</label>
          
          </div>
        </>
      )}
    </Conteinerpadre>
  );
};

export default AdminOrder;
