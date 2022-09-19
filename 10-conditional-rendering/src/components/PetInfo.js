function PetInfo(props) {
  const { animal, age, hasPet } = props;

  return hasPet ? (
    <h1>
      My {animal} is {age} years old
    </h1>
  ) : (
    <h2>I don't have an animal</h2>
  );
}

export default PetInfo;
