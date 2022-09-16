const App = () => {
  console.log('Called');

  let buttonText = 'Click me please';

  const onButtonClick = () => {
    buttonText = 'Hello from React';
    console.log(buttonText);
  };

  return (
    <div className="app">
      <button onClick={onButtonClick}>{buttonText}</button>
    </div>
  );
};

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App />);
