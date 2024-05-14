import "./aboutUs.css"
export const AboutUs = () => {
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h5>ABOUT US</h5>
                    <h2> About Warzone Elite</h2>
                    <p> our success in creating buisness solutions is due in large part <br /> to our talented and highly committed team.</p>
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <h4>THE NEXT GENERATION OF<br /> GAMING IS HERE</h4>
                        <p>Online gaming is simply the playing of a video game over the <br /> internet
                            , usually with friends. Online games can be played on <br /> any number of
                            devices from dedicated video games <br /> consoles</p>
                        <p>For those reasons, its important that trusted adults educate <br />
                            themselves around what online gaming is and how they can <br />
                            ensure children play safely.</p>
                    </blockquote>
                </div>
            </div>
            <p className="fs-2">
                Who We Work With
                <img width={50} height={50} src="https://img.icons8.com/ios/50/FFFFFF/like--v1.png" alt="like--v1" /></p>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                    <div className="card">
                        <img width={50} height={50} src="https://img.icons8.com/ios/50/FFFFFF/wrench--v1.png" alt="wrench--v1" />
                        <div className="card-body">
                            <h5 className="card-title">Organizers</h5>
                            <p className="card-text">We provide the best solutions <br /> and support for tournament <br /> organizers. We are pretty damn <br /> proud of it.</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <img width={50} height={50} src="https://img.icons8.com/ios/50/FFFFFF/ps-controller.png" alt="ps-controller" />
                        <div className="card-body">
                            <h5 className="card-title">Players</h5>
                            <p className="card-text">We offer players of all levels the <br /> opportunity to compete in their favourite <br /> game, win prizes, and be part of the <br /> esports community.</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <img width={64} height={64} src="https://img.icons8.com/pastel-glyph/64/FFFFFF/suitcase--v3.png" alt="suitcase--v3" />
                        <div className="card-body">
                            <h5 className="card-title">Games and Brands</h5>
                            <p className="card-text">We help games and brands engage the esports <br /> community through turn-key solutions for <br /> testing, scaling, and operating esports <br /> competitions. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};
