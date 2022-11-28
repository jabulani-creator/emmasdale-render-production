export const LearnMore = ({ header, link, path }) => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <section className="manual">
      <p>{header}</p>
      <button className="btnn" onClick={() => openInNewTab(link)}>
        {path}
      </button>
    </section>
  );
};
