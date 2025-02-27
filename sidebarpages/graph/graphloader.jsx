import "./graphloader.css";

export default function GraphLoader() {
  return (
    <>
      <div className="barchart_loader">
        <div className="barchart_loader__slice"></div>
      </div>
      <div className="piechart_loader">
        <div className="piechart_loader__slice"></div>
      </div>
    </>
  );
}
