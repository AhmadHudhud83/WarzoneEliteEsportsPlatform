import "./Carousel.css";
import { useTranslation } from 'react-i18next'
const Carousel = () => {
  const { t, i18n } = useTranslation()

  const carouselItems = [

    { img: "https://i.imgur.com/xf0YhHj.jpeg", caption: t(" Welcome to the future of gaming   platform where competition meets community and innovation fuels growth.") },


    { img: "https://i.imgur.com/2MLRj63.jpeg", caption: t("Discover the journey we're embarking on to redefine video games & eSports titles.") },

    { img: "https://i.imgur.com/QnrDhhp.jpeg", caption: t("Enter the battlefield of champions. Our arena is where legends are forged, and the brave rise to become the elite.") },


  ]
  return (
    <div className=" carousel ">
      <div
        id="carouselExampleIndicators"
        className="carousel slide h-25 w-100  rounded"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner  ">
          {carouselItems.map((item, index) => {
            return (<div key={index} className={`carousel-item  rounded ${index === 0 ? "active" : ""}`}>
              <img
                src={item.img}
                className="d-block img-fluid rounded rounded-3     "
                style={{ width: "1300px", height: "600px", filter: "brightness(50%)" }}
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">

                <h2 className="text-white text-center ">
                  {item.caption}
                </h2>
              </div>
            </div>)
          })}

        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
export default Carousel;
