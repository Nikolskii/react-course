function ResetButton({ count, onClick }) {
  const buttonStyle = { backgroundColor: 'lightgreen' };

  return (
    count > 0 && (
      <div>
        <button style={buttonStyle} onClick={onClick}>
          Reset
        </button>
      </div>
    )
  );
}

export default ResetButton;
