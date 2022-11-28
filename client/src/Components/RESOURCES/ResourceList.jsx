export const ResourceList = ({ title, description, pdf }) => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="manual">
      <h4>{title}</h4>
      <p>{description}</p>
      <button className="btnn" onClick={() => openInNewTab(pdf)}>
        Downlaod Church Manual
      </button>
    </section>
  );
};
