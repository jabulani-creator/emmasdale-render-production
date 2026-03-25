import Image from "next/image";

const Pastor = ({ name, phone, email, position, photo }) => {
  return (
    <div className="flex flex-col items-center w-[200px] text-center shrink-0">
      
      {/* Profile Image - Clean, no hover effects, subtle border */}
      <div className="relative w-[110px] h-[110px] mb-[12px]">
        <div className="relative w-full h-full rounded-full overflow-hidden bg-[#e5e7eb] border-[0.5px] border-slate-200">
          <Image 
            src={photo || "https://res.cloudinary.com/dw82gpxt3/image/upload/v1664386580/emmsadale-church/sabbath_podcast_p91qgs.jpg"} 
            alt={name || "Leader"} 
            fill 
            sizes="128px"
            className="object-cover" 
          />
        </div>
      </div>

      {/* Text Details - Forcing absolute sizes to override any global CSS */}
      <div className="w-full flex flex-col items-center">
        
        {/* Name: Normal weight, dark gray, strictly one line */}
        <h3 
          className="font-normal text-[#333333] whitespace-nowrap m-0 p-0" 
          style={{ fontSize: "14px", lineHeight: "14px", marginBottom: "0px" }}
        >
          {name}
        </h3>
        
        {/* Position: Bold, uppercase, significantly smaller */}
        <p 
          className="font-extrabold uppercase text-[#333333] tracking-widest px-2 m-0" 
          style={{ fontSize: "8px", lineHeight: "10px", marginTop: "2px", marginBottom: "4px" }}
        >
          {position || "CHURCH LEADER"}
        </p>
        
        {/* Contact Info Container */}
        <div className="flex flex-col items-center m-0 p-0">
          {email && (
            <a 
              href={`mailto:${email}`} 
              className="font-normal text-[#666666] hover:text-[#333333] transition-colors tracking-wide m-0 p-0" 
              style={{ fontSize: "10px", lineHeight: "14px" }}
            >
              {email}
            </a>
          )}
          
          {phone && (
            <a 
              href={`tel:${phone}`} 
              className="font-normal text-[#666666] hover:text-[#333333] transition-colors tracking-wide m-0 p-0" 
              style={{ fontSize: "10px", lineHeight: "14px" }}
            >
              {phone}
            </a>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Pastor;
