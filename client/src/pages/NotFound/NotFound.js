import "./NotFound.css"
export const NotFound = () => {
    return (
        <div className="container text-center custom-container">
            <div className="row">
                <div className="col-md-12">
                    <div className="custom-error-template">
                        <h1 className="custom-heading">OOPS! WHERE ARE WE?</h1>
                        <h2 className="custom-subheading">404 Page Not Found!</h2>
                        <div className="custom-error-details">
                            Page not Found! The page you are looking for was moved, removed, renamed or might never existed.
                        </div>
                        <div className="custom-error-actions mt-4">
                            <a href="#" className="btn custom-btn-lg">
                                Join With Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
