import '../stylesheets/home.css'

export const Home = () => {
  return (
      <div className="home">
      <h2 className="featured-content-heading">Browse the latest reviews</h2>
      <section className="latest-reviews-section">
        <div className="grid-wrapper">

          <div className="featured-content">
            <h2>Black Adam</h2> 
            <div className="image-container black-adam">
            </div>
            <p>
                It’s distinguished itself just enough to satiate action film fans, entertain future streaming audiences and warrant further merging into the DC universe. 
            </p>
            <a href="/">Read More</a>
          </div>

          <div className="featured-content">
            <h2>Black Widow</h2>
            <div className="image-container black-widow">
            </div>
            <p>             
              The mostly self-contained story packs a surprising amount of heart and finally gives this long-running MCU character a proper send off. 
            </p>
            <a href="/">Read More</a>
          </div>

          <div className="featured-content">
            <h2>Man of Steel</h2>
            <div className="image-container man-of-steel"></div>
            <p>
              Zack Snyder's Man of Steel is a gritty and realistic take on one of the most iconic superheroes ever. It's visually astonishing and action-packed.
            </p>
            <a href="/">Read More</a>
          </div>
          
          <div className="featured-content">
            <h2>Captain America</h2>
            <div className="image-container captain-america"></div>
            <p>
              A whizz-bang, retro-futuristic adventure offers an exhilarating thrill ride that perfectly captures the enduring optimism of the 1940s.  
            </p>
            <a href="/">Read More</a>
          </div>
        </div>
        </section>
    </div>
    
  );
}