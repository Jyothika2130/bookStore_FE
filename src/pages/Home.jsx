/* eslint-disable react-hooks/immutability */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Footer from "../componenets/Footer";
import { toast } from "react-toastify";
import { getlimitedBook } from "../services/allApi";
import Header from "../componenets/Header";

const Home = () => {
  const [bookdata, setBookData] = useState([]);
  useEffect(() => {
    getBookdata();
  }, []);
  const getBookdata = async () => {
    try {
      let apiResponse = await getlimitedBook();
      console.log(apiResponse);
      if (apiResponse.status == 200) {
        setBookData(apiResponse.data.limitedData);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting data ");
    }
  };

  return (
    <>
      <Header />
      <div className="home-page">
        <section className="hero-section">
          <div className="hero-overlay">
            <h1 className="hero-title">Wonderful Gifts</h1>
            <p className="hero-subtitle">Give your family and friends a book</p>

            <div className="search-box mb-4">
              <input
                className="py-2 px-4 bg-white rounded-3xl placeholder-gray-400 text-black w-full"
                type="text"
                placeholder="Search Books"
              />
            </div>
          </div>
        </section>

        <section className="mt-5">
          <div className="explore-books">
            <h1 className="text-center text-xl">NEW ARRIVALS</h1>
            <h3 className="text-center text-2xl">
              Explore Our Latest Collection
            </h3>
          </div>

          {bookdata?.length > 0 && (
            <div
              className="books-section flex justify-center"
              style={{ marginTop: "80px" }}
            >
              {bookdata?.map((eachBook) => (
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={eachBook.imgUrl
} />
                  <Card.Body>
                    <Card.Title>{eachBook.title}</Card.Title>
                    <Card.Text>
                     {eachBook.abstract}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
          <div className="flex justify-center mt-30">
            <button className="p-2 bg-blue-800 text-white hover:bg-white hover:text-blue-800 border border-blue-800">
              Explore More
            </button>
          </div>
        </section>

        <section className="featured-authors py-10 mt-15">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-20">
              <div className="flex-1">
                <h5 className="text-center font-semibold mb-2">
                  FEATURED AUTHORS
                </h5>

                <h2 className="text-center text-2xl  mb-4">
                  Captivates with every word
                </h2>

                <p className="mb-3 text-justify">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt fuga nostrum illum distinctio eum quidem recusandae
                  soluta aliquam laboriosam odit quas, nam molestias fugiat
                  culpa rem nulla iste? Modi, molestias. Lorem ipsum dolor sit
                  amet, consectetur adipisicing elit. Sunt earum possimus
                  accusantium necessitatibus id neque soluta quibusdam explicabo
                  laborum? Deserunt vel quia voluptates dicta incidunt illo fuga
                  pariatur sequi error.
                </p>

                <p className="text-justify">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt fuga nostrum illum distinctio eum quidem recusandae
                  soluta aliquam laboriosam odit quas, nam molestias fugiat
                  culpa rem nulla iste? Modi, molestias. Lorem ipsum dolor sit
                  amet, consectetur adipisicing elit. Sunt earum possimus
                  accusantium necessitatibus id neque soluta quibusdam explicabo
                  laborum? Deserunt vel quia voluptates dicta incidunt illo fuga
                  pariatur sequi error.
                </p>
              </div>

              <div className="flex-1 flex justify-center">
                <img
                  src="https://thumbs.dreamstime.com/b/portrait-male-african-american-professional-possibly-business-executive-corporate-ceo-finance-attorney-lawyer-sales-stylish-155546880.jpg"
                  className="w-full  shadow-lg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials mt-25">
          <div className="text-center">
            <h4 className="text-xl">TESTIMONIALS</h4>
            <h6 className="text-2xl">See What Others Are Saying</h6>
          </div>
          <div className="flex justify-center mt-6">
            <img
              src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
          </div>
          <h6 className="text-center mt-2">Treesa Joseph</h6>
          <p className="ml-40 mr-40 text-left mt-2 ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
            perspiciatis porro eveniet. Optio necessitatibus provident autem,
            quam qui, dicta molestiae quis quia deleniti aliquam magnam
            temporibus mollitia ex repellendus! Dicta. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Consequuntur, deserunt optio eum
            dolorum iure consectetur quia facilis porro modi placeat ea quis
            explicabo maxime voluptatum unde animi nemo aperiam quos!
          </p>
        </section>
      </div>
      <hr />
      <Footer />
    </>
  );
};

export default Home;
