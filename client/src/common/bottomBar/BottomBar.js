import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BottomBar = ({ gamesData, selectedGame, setSelectedGame }) => {
  //bottom bar of games , with functionalites to select a game
  return (
    <React.Fragment>
      <div>
        <button
          className="btn btn-outline-warning bg-dark me-5"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasTop"
          aria-controls="offcanvasTop"
        >
          Select your game
        </button>
        <div
          className="offcanvas offcanvas-top  bg-dark h-50"
          tabIndex={-1}
          id="offcanvasTop"
          aria-labelledby="offcanvasTopLabel"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasTopLabel">Select your game</h5>
            <Link
              type="button"
              className="btn-close bg-light text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body d-flex justify-content-center h-100 ">
            <div className="row row-cols-lg-8  row-cols-md-4 row-cols-sm-2 h-100 ">
              {gamesData.map((game, index) => {
                return (
                  <div
                    onClick={() => {
                      setSelectedGame(game);
                    }}
                    key={index}
                    className={` rounded m-3 mb-5 mt-1 btn btn-sm p-1  ${
                      game.name === selectedGame
                        ? " border border-3 border-danger btn-outline-danger "
                        : "border-0 btn-outline-light"
                    } `}
                    style={{
                      backgroundColor: "",
                      width: "10rem",
                      height: "10rem",
                    }}
                    data-bs-dismiss="offcanvas"
                  >
                    <img
                      src={game.imgUrl}
                      className="card-img-top h-100 w-100 "
                      alt="..."
                    />
                    <div className="card-footer">
                      <p className="text-white text-start ">{game.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default BottomBar;
