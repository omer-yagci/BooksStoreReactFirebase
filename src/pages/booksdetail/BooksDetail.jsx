import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import detailsStyles from "../booksdetail/details.module.scss";

//! For Second Modal Window
// !import defaultImage from "../../assests/default.jpg";
// !import ModalImage from "react-modal-image";

import { SweetAlertsModal } from "../../helpers/SweetAlerts";

const BooksDetail = () => {
  const location = useLocation();
  const [readMore, setReadMore] = useState(false);

  // !Get data with using useLocation func.

  const booksData = location.state;

  //TODO console.log(booksData);

  const {
    //! searchInfo: { textSnippet },
    accessInfo: {
      webReaderLink,
      epub: { isAvailable, acsTokenLink },
      pdf: { isAvailable: pdfAvailable, acsTokenLink: pdfTokenLink },
    },
    saleInfo: {
      saleability,
      buyLink,
      listPrice: { amount, currencyCode },
    },
    volumeInfo: {
      authors,
      categories,
      description,
      language,
      title,
      previewLink: onlineLink,
      imageLinks: { thumbnail },
      publishedDate,
      pageCount,
    },
  } = booksData;
  console.log(amount);
  return (
    <div className={detailsStyles.wrapper}>
      <div className="container py-5 ">
        <h1 className="text-center">{title}</h1>
        <h4 className="text-center">{saleability}</h4>

        <div className="col-md-4">
          {/* Second Modal Window For İMAGE */}

          {/* <ModalImage
            small={thumbnail ? thumbnail : defaultImage}
            large={thumbnail ? thumbnail : defaultImage}
            alt={textSnippet ? textSnippet : title}
          /> */}

          <img
            src={thumbnail}
            alt={title}
            onClick={() =>
              SweetAlertsModal(thumbnail, title, amount, currencyCode)
            }
          />

          <p>
            {isAvailable && acsTokenLink ? (
              <a rel="noreferrer" target={"_blank"} href={acsTokenLink}>
                Download Epub
              </a>
            ) : (
              "💥 Unable to download epub"
            )}
          </p>
          <p>
            {pdfAvailable && pdfTokenLink ? (
              <a rel="noreferrer" target={"_blank"} href={pdfTokenLink}>
                Download Pdf
              </a>
            ) : (
              "💥 Unable to download pdf"
            )}
          </p>
          <p>
            {webReaderLink ? (
              <a rel="noreferrer" target={"_blank"} href={webReaderLink}>
                Read Online
              </a>
            ) : (
              "💥 Unable to Online Read data"
            )}
          </p>
          <p>
            {buyLink ? (
              <a rel="noreferrer" target={"_blank"} href={buyLink}>
                Google play Buy
              </a>
            ) : (
              "💥 Unable to Link"
            )}
          </p>
        </div>
        <div className="card-body">
          <h5 className="card-title">Description</h5>
          <p className="card-text">
            {description ? (
              <>
                {readMore
                  ? description
                  : `${description.substring(0, 150)}... `}

                <button
                  className={detailsStyles.btn}
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? " Hide" : " read more"}
                </button>
              </>
            ) : (
              "no description! "
            )}
          </p>
        </div>
        <div className="col-md-8 d-flex flex-column">
          <ul className="list-group ">
            <li className="list-group-item">
              {"PublishedDate : " + publishedDate}
            </li>
            <li className="list-group-item">{"Page : " + pageCount}</li>
            <li className="list-group-item">{"Language : " + language}</li>
            <li className="list-group-item">{"Authors : " + authors}</li>
            <li className="list-group-item">{"Categories : " + categories}</li>
            <li className="list-group-item">
              <p>
                For Google Books Link
                {onlineLink ? (
                  <a rel="noreferrer" target={"_blank"} href={onlineLink}>
                    Click Here
                  </a>
                ) : (
                  "💥 Unable link to GoogleBooks"
                )}
              </p>
            </li>
            <li className="list-group-item">
              <Link to={-1} className="card-link">
                Go Back
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BooksDetail;
