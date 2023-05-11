//import PrimaryNavbar from "../components/TopNavbar";
import Search from "../components/Search";
import ProductCard from "../components/ProductCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import environment from "../environment";

function Home() {
  const [Products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  function getProducts() {
    fetch(`${environment.api}/products`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        
        const products = res.map((product) => {
          product.selected = false;
          return product;
        });
        setProducts(products);
        setData(products);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("API call is completed");
      });
  }
  function onSearched(term) {
    console.log(term);
    if (!term) {
      setProducts(data);
      return;
    }
    const filtered = data.filter((item) => {
      const titleLowerCased = item.title.toLowerCase();
      const termLowereCased = term.toLowerCase();
      return titleLowerCased.indexOf(termLowereCased) !== -1;
    });
    setProducts(filtered);
  }

  //const Products = ["a","b","c","d"];
  function renderCols() {
    return Products.map(function (Products, index) {
      return (
        <Col md={4} lg={3} key={index}>
          <ProductCard item={Products} reload={getProducts} />
        </Col>
      );
    });
  }
  return (
    <>
      <Search onSearch={onSearched} />
      <Container>
        <Row>{renderCols()}</Row>
      </Container>
    </>
  );
}

export default Home;
