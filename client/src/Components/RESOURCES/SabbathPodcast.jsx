const SabbathPodcast = () => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <section className="section" style={{ margin: "20px auto 120px auto" }}>
      <div className="resource">
        <div className="resource_image">
          <img
            src="https://res.cloudinary.com/dw82gpxt3/image/upload/v1664386580/emmsadale-church/sabbath_podcast_p91qgs.jpg"
            alt=""
            className="img-topic"
          />
        </div>
        <div className="resource_text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A dolores
            expedita minima. Reprehenderit soluta doloribus voluptatum minus.
            Perspiciatis, ratione fuga.
          </p>
          <button
            className="btnn"
            onClick={() =>
              openInNewTab("https://soundcloud.com/sabbath-school-podcast/sets")
            }
          >
            Listen
          </button>
        </div>
      </div>
    </section>
  );
};

export default SabbathPodcast;
