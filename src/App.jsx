import "./App.css";
import Card from "./components/Card";
import CardHeading from "./components/CardHeading";
function App() {
  return (
    <>
      <div className="main_box">
        <div className="border">
          <div className="test">
            <div className="card-bg">
              <CardHeading />
              <Card />
              <Card />
              <Card />
            </div>
            <div className="card-bg">
              <CardHeading />
              <Card />
              <Card />
              <Card />
            </div>
            <div className="card-bg">
              <CardHeading />
              <Card />
              <Card />
              <Card />
            </div>
            <div className="card-bg">
              <CardHeading />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
