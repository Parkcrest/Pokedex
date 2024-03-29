import { CardFrontImage } from "../UI/CardFrontImage";
import { PokeType } from "../UI/PokeType";
import { styled } from "../../stitches.config";

export const SinglePokemonComponent = ({ name, image, types }: Pokemon) => {
  const CardFrontContainer = styled("div", {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "$1",
    backgroundColor: "$white500",
  });

  const CardFrontImageContainer = styled("div", {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: "$1",
    backgroundColor: "$gray300",

    borderRadius: "10px",
    borderCollapse: "separate",
  });

  const CardFrontNameContainer = styled("div", {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "start",
    padding: "$1",
    textAlign: "left",
    fontSize: "20px",
    height: "2",
  });

  const CardFrontTypeContainer = styled("div", {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "start",
    padding: "$1",
    paddingBottom: "$1",
  });

  let pokeTypes: any = [];
  if (types) {
    pokeTypes = types.map((type) => {
      return (
        <PokeType key={name + type} typeColor={type}>
          {`${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </PokeType>
      );
    });
  }

  return (
    <>
      <CardFrontContainer>
        <CardFrontImageContainer>
          <CardFrontImage src={image} alt={name} />
        </CardFrontImageContainer>
        <CardFrontNameContainer>
          {`${name.charAt(0).toUpperCase() + name.slice(1)} `}
        </CardFrontNameContainer>
        <CardFrontTypeContainer>{pokeTypes}</CardFrontTypeContainer>
      </CardFrontContainer>
    </>
  );
};
