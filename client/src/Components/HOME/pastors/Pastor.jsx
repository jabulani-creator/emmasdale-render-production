import Wrapper from "../../../assets/wrappers/Pastor";

export const Pastor = () => {
  return (
    <section className="section ">
      <h1 className="title primary">Pastors Message</h1>
      <Wrapper>
        <div className="LeftContainer">
          <div>
            <img
              src="https://res.cloudinary.com/dw82gpxt3/image/upload/v1664103138/emmsadale-church/photo-1664103120340_ulej6e.jpg"
              alt=""
              className="img pastors-image"
            />
          </div>
          <h4 className="Name">Pastor Manjimela</h4>
        </div>
        <div className="MessageContainer">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, a saepe
          fugiat laboriosam tenetur quibusdam harum doloremque totam in
          incidunt, fuga quod, aspernatur alias repellendus commodi quam
          deleniti ullam nisi sint sed earum autem itaque! Similique repellat
          tenetur cumque corrupti. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Dicta iure consectetur, quam atque velit obcaecati
          voluptatum nemo at harum quibusdam.
        </div>
      </Wrapper>
    </section>
  );
};
