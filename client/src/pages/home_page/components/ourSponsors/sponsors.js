import React from 'react';
import "./sponsors.css";

const sponsors = [
  { id: 'nvidia', link: 'https://www.nvidia.com/en-us/', image: 'https://blog.logomyway.com/wp-content/uploads/2022/01/NVIDIA-logo.png' },
  { id: 'intel', link: 'https://www.intel.com/content/www/us/en/homepage.html', image: 'https://www.dublinmaker.ie/wp-content/uploads/2014/06/intel_rgb_logo2009_high_res.png' },
  { id: 'razer', link: 'https://www.razer.com/', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Razer_snake_logo.svg/1200px-Razer_snake_logo.svg.png' },
  { id: 'hyperx', link: 'https://row.hyperx.com/', image: 'https://1000logos.net/wp-content/uploads/2021/04/HyperX-logo.png' },
  { id: 'alienware', link: 'https://www.dell.com/en-us/gaming/alienware', image: 'C:\Users\Acer\Desktop\OIP-removebg-preview.png' },
  { id: 'logitech', link: 'https://www.logitech.com/', image: 'https://cdn.cookielaw.org/logos/96be46f4-957f-4368-a759-068d7328c7e8/69f4502c-95ac-4557-a363-86871fcb3f92/99c8b0a9-f79a-4415-a323-974350562f78/logitechg-logo.png' },
  { id: 'gameforge', link: 'https://gameforge.com/en-US/', image: 'https://storage.googleapis.com/accesswire/logos/subaccounts/31628.png?v=1' },
  { id: 'ea', link: 'https://www.ea.com/', image: 'https://logos-world.net/wp-content/uploads/2020/08/Electronic-Arts-Logo.png' }
];

export const Sponsors = () => {
  return (
    <div>
      <div className="ps">
        <div className="stitle">
          <h5>OUR SPONSORS</h5>
          <div className="pft">
            <h2>Tournament Sponsors</h2>
            <p>Our success in creating business solutions is due in large part<br />
              to our talented and highly committed team.</p>
          </div>
        </div>
      </div>
      <div className="container">
        {sponsors.map((sponsor) => (
          <div className={`card card-${sponsor.id}`} key={sponsor.id} style={{ width: '18rem' }}>
            <a href={sponsor.link}>
              <img src={sponsor.image} className="card-img-top" alt={`${sponsor.id} logo`} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
