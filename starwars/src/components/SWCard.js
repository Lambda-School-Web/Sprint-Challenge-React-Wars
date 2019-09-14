import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  GiBodyHeight,
  GiFilmProjector,
  GiWeight,
  GiWorld
} from "react-icons/gi";
import { FaRestroom } from "react-icons/fa";
import {
  CardDiv,
  HMDiv,
  NameP,
  GeneralP,
  FilmsDiv,
  FilmIconP
} from "../styles/styles";

function SWCard(props) {
  const [home, setHome] = useState(null);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios
      .get(props.data.homeworld)
      .then(res => setHome(res.data.name))
      .catch(err => console.log(err));
  }, [props.data.homeworld]);

  useEffect(() => {
    setFilms([]);
    props.data.films.forEach(film => {
      axios
        .get(film)
        .then(res => {
          setFilms(oldFilms => [...oldFilms, res.data.title]);
        })
        .catch(err => console.log(err));
    });
  }, [props.data.films]);

  return (
    <CardDiv>
      <NameP>{props.data.name}</NameP>
      <HMDiv>
        <GeneralP>
          <GiBodyHeight />{" "}
          {props.data.height === "unknown"
            ? "Unknown"
            : Math.round((props.data.height / 2.54) % 12) === 12
            ? `${Math.floor(props.data.height / 2.54 / 12) + 1}' 0"`
            : `${Math.floor(props.data.height / 2.54 / 12)}' ${Math.round(
                (props.data.height / 2.54) % 12
              )}"`}
        </GeneralP>
        <GeneralP>
          <GiWeight />{" "}
          {props.data.mass === "unknown"
            ? "Unknown"
            : `${Math.round(
                parseInt(props.data.mass.replace(/,/g, "")) * 2.2
              )} lb`}
        </GeneralP>
      </HMDiv>
      <HMDiv>
        <GeneralP>
          <FaRestroom />{" "}
          {`${props.data.gender[0].toUpperCase()}${props.data.gender.substring(
            1
          )}`}
        </GeneralP>
        <GeneralP>
          <GiWorld /> {home}
        </GeneralP>
      </HMDiv>
      <hr />
      <HMDiv>
        <FilmIconP>
          <GiFilmProjector />
        </FilmIconP>
        <FilmsDiv>
          {films.map((film, index) => (
            <GeneralP key={index}>{film}</GeneralP>
          ))}
        </FilmsDiv>
      </HMDiv>
    </CardDiv>
  );
}

export default SWCard;
