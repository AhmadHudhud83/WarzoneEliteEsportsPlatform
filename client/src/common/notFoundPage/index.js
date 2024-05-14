import "./style.css";
export const NotFoundPage = ()=>{
    return(
 
       <div>
        <div className="container">
  <div className="cardd">
    <div className="card-body">
      <h3>  OOPS! WHERE ARE WE?</h3>
    </div>
  </div>
  <div className="card1">
    <div className="card1-body">
      <h1> 404 Page Not Found!</h1>
    </div>
  </div>
  <div className="card2">
    <div className="card2-body">
      <p>Page not Found! The page you are looking for was moved,<br /> removed, renamed or might never existed.</p>
    </div>
  </div>
  <a className="default-btn" type="button">Back To Home<span style={{top: '-2.20001px', left: 166}} /></a>
  <span style={{top: '252.8px', left: 284}} />
</div>
</div>
    )
}