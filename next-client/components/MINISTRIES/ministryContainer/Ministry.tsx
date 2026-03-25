import Link from "next/link";
import Image from "next/image";

interface MinistryProps {
  ministries: any[];
}

export const Ministry = ({ ministries }: MinistryProps) => {
  return (
    <section className="py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl w-[90%] mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <p className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-4">Get Involved</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Our Ministries</h2>
          <p className="text-lg text-slate-600 max-w-2xl">
            Discover the various ways you can connect, serve, and grow in your faith. There is a place for everyone to belong and make a difference.
          </p>
        </div>

        {(!ministries || ministries.length === 0) ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-slate-500">Ministries coming soon...</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {ministries.map((item) => {
              return (
                <Link href={`/ministries/${item.slug}`} key={item._id} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full transform hover:-translate-y-2">
                  
                  {/* Image Header */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <Image 
                      src={item.hero?.image || "https://res.cloudinary.com/dw82gpxt3/image/upload/v1664386580/emmsadale-church/sabbath_podcast_p91qgs.jpg"} 
                      alt={item.name} 
                      fill 
                      className="object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" 
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className={`text-xl font-bold text-slate-900 mb-3 group-hover:text-${item.themeColor || 'teal'}-600 transition-colors`}>
                      {item.name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                      {item.hero?.description || item.hero?.motto || "Learn more about this ministry."}
                    </p>
                    
                    {/* Learn More Arrow */}
                    <div className={`flex items-center text-${item.themeColor || 'teal'}-600 font-bold text-sm uppercase tracking-wider mt-auto group-hover:translate-x-2 transition-transform`}>
                      Learn More <span className="ml-2">→</span>
                    </div>
                  </div>

                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
