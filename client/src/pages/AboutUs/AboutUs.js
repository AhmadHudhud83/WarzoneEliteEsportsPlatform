import "./AboutUs.css"
export const AboutUs = () => {
    return (
        <div className="container text-center text-light my-5">
            <section className="about-us-section mb-5">
                <h3 className="text-primary">ABOUT US</h3>
                <h1>About Warzone Elite</h1>
                <p>Our success in creating business solutions is due in large part to our talented and highly committed team.</p>
            </section>
            <section className="next-gen-section mb-5">
                <h4 className="text-purple">THE NEXT GENERATION OF GAMING IS HERE</h4>
                <p>Online gaming is simply the playing of a video game over the internet, usually with friends. Online games can be played on any number of devices from dedicated video games consoles.</p>
                <p>For those reasons, it's important that trusted adults educate themselves around what online gaming is and how they can ensure children play safely.</p>
            </section>
            <section className="who-we-work-with-section">
                <h2>Who We Work With</h2>
                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="custom-card">
                            <div className="custom-card-body">
                                <img width="{50}" height="{50}" src="https://img.icons8.com/ios/50/FFFFFF/wrench--v1.png" alt="wrench--v1" />
                                <h5 className="custom-card-title">Organizers</h5>
                                <p className="custom-card-text">We provide the best solutions and support for tournament organizers. We are pretty damn proud of it.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="custom-card">
                            <div className="custom-card-body">
                                <img width="{50}" height="{50}" src="https://img.icons8.com/ios/50/FFFFFF/ps-controller.png" alt="ps-controller" />
                                <h5 className="custom-card-title">Players</h5>
                                <p className="custom-card-text">We offer players of all levels the opportunity to compete in their favourite game, win prizes, and be part of the esports community.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="custom-card">
                            <div className="custom-card-body">
                                <img width="{64}" height="{64}" src="https://img.icons8.com/pastel-glyph/64/FFFFFF/suitcase--v3.png" alt="suitcase--v3" />                            <h5 className="custom-card-title">Games and Brands</h5>
                                <p className="custom-card-text">We help games and brands engage the esports community through turn-key solutions for testing, scaling, and operating esports competitions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    )
}
