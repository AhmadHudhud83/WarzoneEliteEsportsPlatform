import Styles from './ContactUs.module.css';

function ContactUs(){
    return(
        <div id={Styles.body}>
            <div className='container' id={Styles.container}>
                <h1>WE ARE EAGER TO HEAR FROM YOU!</h1>
            </div>
        </div>
    );
}

export default ContactUs;